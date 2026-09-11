import express from 'express';
import cors from 'cors';
import { store } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging & Role-based authentication extractor middleware
app.use((req, res, next) => {
  const userId = req.headers['x-user-id'] || req.query.currentUserId;
  const userRole = req.headers['x-user-role'] || req.query.currentUserRole;

  if (userId) {
    const user = store.getUserById(userId);
    if (user) {
      req.user = user;
      req.userRole = user.role;
    }
  }
  if (!req.user && userRole) {
    req.userRole = userRole;
  }
  if (req.userRole === 'industry' || req.userRole === 'recruiter') {
    req.userRole = 'company';
  }

  console.log(`[API] ${req.method} ${req.url} (Role: ${req.userRole || 'anonymous'}, User: ${req.user?.name || req.user?.id || 'none'})`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ==================== AUTH & USERS ====================
app.get('/api/auth/users', (req, res) => {
  res.json(store.getUsers());
});

app.post('/api/auth/register', (req, res) => {
  const result = store.registerUser(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, role, id } = req.body;
  if (id) {
    const user = store.getUserById(id);
    if (user) {
      const profile = user.role === 'student'
        ? store.getStudentById(user.id)
        : user.role === 'college' ? store.getCollegeById(user.collegeId || 'col_apex') : store.getCompanyById(user.companyId || 'comp_technova');
      return res.json({ success: true, user, profile });
    }
  }

  const result = store.authenticateUser(email, password, role);
  if (result.error) {
    return res.status(401).json({ success: false, error: result.error });
  }
  res.json(result);
});

// ==================== INSTITUTION AUTHENTICATION ====================
app.post('/api/auth/institution/login', (req, res) => {
  const { email, password } = req.body;
  const result = store.authenticateInstitution(email, password);
  if (result.error) {
    return res.status(401).json({ success: false, error: result.error });
  }
  res.json(result);
});

// Self-registration for institutions is disabled per requirements
app.post('/api/auth/institution/register', (req, res) => {
  return res.status(403).json({
    success: false,
    error: 'Institutions cannot self-register. Institution accounts can only be created by the Platform Administrator.'
  });
});

app.post('/api/auth/faculty/register', (req, res) => {
  return res.status(403).json({
    success: false,
    error: 'Self-registration for institutions is disabled. Institution accounts must be created by the Platform Administrator.'
  });
});

app.post('/api/auth/faculty/login', (req, res) => {
  const { identifier, email, facultyId, collegeName, collegeId, sharedPassword, password } = req.body;
  const targetId = identifier || email || facultyId;
  const targetCollege = collegeName || collegeId;
  const targetPassword = sharedPassword || password;

  const result = store.authenticateFaculty(targetId, targetCollege, targetPassword);
  if (result.error) {
    return res.status(401).json({ success: false, error: result.error });
  }
  res.json(result);
});

// ==================== ADMIN GOVERNANCE & AUDIT ====================
app.get('/api/admin/colleges', (req, res) => {
  res.json(store.getCollegesAdminView());
});

app.get('/api/admin/institutions', (req, res) => {
  res.json(store.getCollegesAdminView());
});

app.post('/api/admin/institutions', (req, res) => {
  const result = store.createInstitutionAccount(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.post('/api/admin/colleges', (req, res) => {
  const result = store.createCollege(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.put('/api/admin/colleges/:id/password', (req, res) => {
  const { password } = req.body;
  const result = store.updateCollegeFacultyPassword(req.params.id, password);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.json(result);
});

app.get('/api/admin/faculty', (req, res) => {
  const { collegeId } = req.query;
  res.json(store.getFacultyList(collegeId));
});

app.patch('/api/admin/faculty/:id/status', (req, res) => {
  const { status } = req.body;
  const result = store.updateFacultyStatus(req.params.id, status);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.json(result);
});

app.get('/api/admin/audit-logs', (req, res) => {
  res.json(store.getAuditLogs());
});

// ==================== STUDENTS (ROLE-BASED AUTHORIZATION) ====================
app.get('/api/students', (req, res) => {
  const { department, skill, minMatch, collegeName, collegeId, branch, year } = req.query;
  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  let students = store.getStudents();

  // 1. If requester is an INSTITUTION administrator, enforce strict scoping to their assigned institution ONLY:
  if (requesterRole === 'college') {
    const assignedInstId = (requester?.institutionId || '').toLowerCase().trim();
    const assignedCollege = (requester?.collegeName || requester?.title || '').toLowerCase().trim();
    const assignedCollegeId = (requester?.collegeId || '').toLowerCase().trim();

    students = students.filter(s => {
      const sInstId = (s.institutionId || '').toLowerCase().trim();
      const sColId = (s.collegeId || '').toLowerCase().trim();
      const sColName = (s.collegeName || '').toLowerCase().trim();

      if (assignedInstId && sInstId) {
        return sInstId === assignedInstId;
      }
      return (assignedCollegeId && sColId === assignedCollegeId) ||
        (assignedCollege && (sColName.includes(assignedCollege) || assignedCollege.includes(sColName)));
    });
  } else if (collegeName || collegeId || req.query.institutionId) {
    // For Industry or Admins filtering by institution/college
    const term = (req.query.institutionId || collegeName || collegeId).toLowerCase().trim();
    students = students.filter(s => {
      const sInstId = (s.institutionId || '').toLowerCase().trim();
      const cId = (s.collegeId || '').toLowerCase().trim();
      const cName = (s.collegeName || '').toLowerCase().trim();
      return sInstId === term || cId === term || cName.includes(term) || term.includes(cName);
    });
  }

  // Department / Branch filter
  const deptFilter = department || branch;
  if (deptFilter && deptFilter !== 'All') {
    students = students.filter(s => s.department && s.department.toLowerCase().includes(deptFilter.toLowerCase()));
  }

  // Year filter
  if (year && year !== 'All') {
    students = students.filter(s => s.year && s.year.toLowerCase().includes(year.toLowerCase()));
  }

  // Skill filter
  if (skill) {
    students = students.filter(s => (s.skills || []).some(sk => sk.name.toLowerCase().includes(skill.toLowerCase())));
  }

  res.json(students);
});

app.get('/api/students/:id', (req, res) => {
  const student = store.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  // Authorization Check:
  // 1. Students can only view their own profile
  if (requesterRole === 'student' && requester && requester.id !== student.id) {
    return res.status(403).json({ error: 'Access denied: Students can only view their own profile.' });
  }

  // 2. Institution administrators can only view students of their assigned institution
  if (requesterRole === 'college') {
    const assignedInstId = (requester?.institutionId || '').toLowerCase().trim();
    const assignedCollege = (requester?.collegeName || requester?.title || '').toLowerCase().trim();
    const assignedCollegeId = (requester?.collegeId || '').toLowerCase().trim();
    const sInstId = (student.institutionId || '').toLowerCase().trim();
    const sColId = (student.collegeId || '').toLowerCase().trim();
    const sColName = (student.collegeName || '').toLowerCase().trim();

    let matches = false;
    if (assignedInstId && sInstId) {
      matches = (assignedInstId === sInstId);
    } else {
      matches = (assignedCollegeId && sColId === assignedCollegeId) ||
        (assignedCollege && (sColName.includes(assignedCollege) || assignedCollege.includes(sColName)));
    }

    if (!matches) {
      return res.status(403).json({ error: 'Access denied: Institution administrators cannot view students from other institutions.' });
    }
  }

  // 3. Industry administrators have full read access across all colleges
  res.json(student);
});

app.put('/api/students/:id', (req, res) => {
  const student = store.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  // Authorization Check:
  // Only the student themselves can update their profile details
  if (requesterRole === 'student' && requester && requester.id !== student.id) {
    return res.status(403).json({ error: 'Access denied: You can only edit your own student profile.' });
  }

  if (requesterRole === 'college' || requesterRole === 'company') {
    return res.status(403).json({ error: 'Access denied: College and Industry administrators have read-only access to student profiles.' });
  }

  const updated = store.updateStudent(req.params.id, req.body);
  res.json(updated);
});

app.post('/api/students/:id/skills', (req, res) => {
  const updated = store.addStudentSkill(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Student not found' });
  res.json(updated);
});

app.delete('/api/students/:id/skills/:skillName', (req, res) => {
  const updated = store.removeStudentSkill(req.params.id, req.params.skillName);
  if (!updated) return res.status(404).json({ error: 'Student not found' });
  res.json(updated);
});

app.post('/api/students/:id/projects', (req, res) => {
  const updated = store.addStudentProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Student not found' });
  res.json(updated);
});

app.post('/api/students/:id/certifications', (req, res) => {
  const updated = store.addStudentCertification(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Student not found' });
  res.json(updated);
});

// ==================== SKILL GAP ANALYSIS ENGINE ====================
app.get('/api/gap-analysis/:studentId', (req, res) => {
  const { targetRoleId } = req.query;
  const student = store.getStudentById(req.params.studentId);
  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  // Student can only access their own gap analysis
  if (requesterRole === 'student' && requester && requester.id !== req.params.studentId) {
    return res.status(403).json({ error: 'Access denied: Students can only view their own skill gap analysis.' });
  }

  // Institution admin can only access gap analysis for students of their assigned institution
  if (requesterRole === 'college' && requester && student) {
    const assignedInstId = (requester?.institutionId || '').toLowerCase().trim();
    const assignedCollege = (requester?.collegeName || requester?.title || '').toLowerCase().trim();
    const assignedCollegeId = (requester?.collegeId || '').toLowerCase().trim();
    const sInstId = (student.institutionId || '').toLowerCase().trim();
    const sColId = (student.collegeId || '').toLowerCase().trim();
    const sColName = (student.collegeName || '').toLowerCase().trim();

    let matches = false;
    if (assignedInstId && sInstId) {
      matches = (assignedInstId === sInstId);
    } else {
      matches = (assignedCollegeId && sColId === assignedCollegeId) ||
        (assignedCollege && (sColName.includes(assignedCollege) || assignedCollege.includes(sColName)));
    }

    if (!matches) {
      return res.status(403).json({ error: 'Access denied: Cannot access skill gap analysis for students outside your institution.' });
    }
  }

  const analysis = store.calculateSkillGap(req.params.studentId, targetRoleId);
  if (!analysis) return res.status(404).json({ error: 'Analysis failed: student or role not found' });
  res.json(analysis);
});

app.get('/api/job-roles', (req, res) => {
  res.json(store.getJobRoles());
});

app.get('/api/job-roles/:id', (req, res) => {
  const role = store.getJobRoleById(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });
  res.json(role);
});

// ==================== LEARNING RECOMMENDATIONS ====================
app.get('/api/resources', (req, res) => {
  const { skill } = req.query;
  res.json(store.getLearningResources(skill));
});

app.post('/api/resources', (req, res) => {
  const newRes = store.addLearningResource(req.body);
  res.status(201).json(newRes);
});

app.delete('/api/resources/:id', (req, res) => {
  store.deleteLearningResource(req.params.id);
  res.json({ success: true });
});

// ==================== INTERNSHIPS & PLACEMENTS ====================
app.get('/api/opportunities', (req, res) => {
  const { skill, role, type, workMode } = req.query;
  let opps = store.getOpportunities();

  if (skill) {
    opps = opps.filter(o => (o.requiredSkills || []).some(s => s.name.toLowerCase() === skill.toLowerCase()));
  }
  if (role) {
    opps = opps.filter(o => o.category.toLowerCase().includes(role.toLowerCase()) || o.title.toLowerCase().includes(role.toLowerCase()));
  }
  if (type && type !== 'All') {
    opps = opps.filter(o => o.type.toLowerCase().includes(type.toLowerCase()));
  }
  if (workMode && workMode !== 'All') {
    opps = opps.filter(o => o.workMode.toLowerCase() === workMode.toLowerCase());
  }

  res.json(opps);
});

app.get('/api/opportunities/:id', (req, res) => {
  const opp = store.getOpportunityById(req.params.id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
  res.json(opp);
});

app.post('/api/opportunities', (req, res) => {
  const newOpp = store.createOpportunity(req.body);
  res.status(201).json(newOpp);
});

// ==================== APPLICATIONS ====================
app.get('/api/applications', (req, res) => {
  const { studentId, opportunityId } = req.query;
  res.json(store.getApplications({ studentId, opportunityId }));
});

app.post('/api/applications', (req, res) => {
  const newApp = store.createApplication(req.body);
  res.status(201).json(newApp);
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { status, note } = req.body;
  const updated = store.updateApplicationStatus(req.params.id, status, note);
  if (!updated) return res.status(404).json({ error: 'Application not found' });
  res.json(updated);
});

// ==================== COMPANY FEEDBACK & VERIFIED LOOP ====================
app.post('/api/feedback', (req, res) => {
  const feedback = store.submitCompanyFeedback(req.body);
  res.status(201).json({ success: true, feedback });
});

app.get('/api/feedback/student/:studentId', (req, res) => {
  res.json(store.getFeedbacksForStudent(req.params.studentId));
});

// ==================== COLLEGE & WORKSHOPS ====================
app.get('/api/colleges', (req, res) => {
  res.json(store.getColleges());
});

app.get('/api/colleges/:id', (req, res) => {
  const college = store.getCollegeById(req.params.id);
  if (!college) return res.status(404).json({ error: 'College not found' });
  res.json(college);
});

app.get('/api/college/analytics', (req, res) => {
  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  // If institution administrator, strictly use their assigned institution
  let targetCollege = req.query.institutionId || req.query.collegeName || req.query.collegeId;
  if (requesterRole === 'college' && requester) {
    targetCollege = requester.institutionId || requester.collegeId || requester.collegeName;
  }

  res.json(store.getCollegeAnalytics(targetCollege));
});

app.get('/api/workshops', (req, res) => {
  res.json(store.getWorkshops());
});

app.post('/api/workshops', (req, res) => {
  const ws = store.addWorkshop(req.body);
  res.status(201).json(ws);
});

// ==================== INDUSTRY TRENDS ====================
app.get('/api/trends', (req, res) => {
  res.json(store.getIndustrySkillTrends());
});

// ==================== INDUSTRY RECRUITMENT & INTELLIGENCE API ====================
app.get('/api/industry/roles', (req, res) => {
  const { category } = req.query;
  res.json(store.getIndustryRoles(category));
});

app.post('/api/industry/roles', (req, res) => {
  const result = store.addOrUpdateIndustryRole(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.get('/api/industry/requirements', (req, res) => {
  const { category, roleTitle } = req.query;
  res.json(store.getIndustryRequirements({ category, roleTitle }));
});

app.post('/api/industry/requirements', (req, res) => {
  const result = store.submitIndustryRequirement(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.post('/api/industry/candidates/match', (req, res) => {
  const candidates = store.matchCandidates(req.body);
  res.json(candidates);
});

app.get('/api/industry/candidates', (req, res) => {
  const { category, roleTitle, requiredSkills, minMatch, branch, collegeId, minAssessment, readinessLevel, skill } = req.query;
  const skillsArray = requiredSkills ? requiredSkills.split(',').map(s => s.trim()) : [];
  const candidates = store.matchCandidates({
    category,
    roleTitle,
    requiredSkills: skillsArray,
    minMatch: minMatch ? Number(minMatch) : 0,
    branch,
    collegeId,
    minAssessment: minAssessment ? Number(minAssessment) : 0,
    readinessLevel,
    skillFilter: skill
  });
  res.json(candidates);
});

app.get('/api/industry/trends', (req, res) => {
  res.json(store.getIndustrySkillTrends());
});

app.post('/api/industry/feedback', (req, res) => {
  const result = store.submitRecruitmentFeedback(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json(result);
});

app.get('/api/industry/feedback/student/:studentId', (req, res) => {
  res.json(store.getRecruitmentFeedbacksForStudent(req.params.studentId));
});

// ==================== INSTITUTION AGGREGATED INDUSTRY INSIGHTS ====================
app.get('/api/college/industry-insights', (req, res) => {
  const requester = req.user;
  const requesterRole = req.userRole || requester?.role;

  let targetCollege = req.query.institutionId || req.query.collegeName || req.query.collegeId;
  if (requesterRole === 'college' && requester) {
    targetCollege = requester.institutionId || requester.collegeId || requester.collegeName;
  }

  res.json(store.getInstitutionIndustryInsights(targetCollege));
});

// ==================== SYSTEM RESET ====================
app.post('/api/system/reset', (req, res) => {
  res.json(store.resetDemoData());
});

app.listen(PORT, () => {
  console.log(`🚀 SkillBridge Backend API running on http://localhost:${PORT}`);
});
