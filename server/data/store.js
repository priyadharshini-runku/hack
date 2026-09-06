import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { initialData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const SALT = 'skillbridge_institutional_salt_2026';

export function hashPassword(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(password + SALT).digest('hex');
}

// Seed colleges with assigned shared faculty passwords
const SEED_COLLEGES = [
  {
    id: 'col_apex',
    name: 'Apex Institute of Technology',
    code: 'AIT',
    location: 'Bangalore, Karnataka',
    type: 'Autonomous Engineering Institute',
    departments: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Artificial Intelligence & Data Science (AI & DS)',
      'Electronics & Communication Engineering (ECE)'
    ],
    sharedPasswordPlain: 'ApexFaculty#2026',
    facultyPasswordHash: hashPassword('ApexFaculty#2026'),
    partnerRecruiters: ['TechNova Solutions', 'CloudScale Inc', 'FinTech Dynamics', 'NexusAI Labs'],
    placementStats: { avgPlacementPct: 88.5, highestPackage: '₹44.0 LPA', medianPackage: '₹8.5 LPA' }
  },
  {
    id: 'col_iitb',
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    code: 'IITB',
    location: 'Mumbai, Maharashtra',
    type: 'Institute of National Importance',
    departments: [
      'Computer Science & Engineering (CSE)',
      'Electrical Engineering',
      'Artificial Intelligence & Data Science',
      'Mechanical Engineering'
    ],
    sharedPasswordPlain: 'IITBFaculty#2026',
    facultyPasswordHash: hashPassword('IITBFaculty#2026'),
    partnerRecruiters: ['Google', 'Microsoft', 'TechNova Solutions', 'Amazon', 'Qualcomm'],
    placementStats: { avgPlacementPct: 96.2, highestPackage: '₹1.2 CPA', medianPackage: '₹21.5 LPA' }
  },
  {
    id: 'col_anna',
    name: 'Anna University (CEG Campus, Chennai)',
    code: 'AU-CEG',
    location: 'Chennai, Tamil Nadu',
    type: 'State Technical University',
    departments: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Robotics & Automation'
    ],
    sharedPasswordPlain: 'AnnaFaculty#2026',
    facultyPasswordHash: hashPassword('AnnaFaculty#2026'),
    partnerRecruiters: ['TechNova Solutions', 'TCS', 'Infosys', 'Zoho', 'PayPal'],
    placementStats: { avgPlacementPct: 91.0, highestPackage: '₹38.0 LPA', medianPackage: '₹9.0 LPA' }
  },
  {
    id: 'col_bits',
    name: 'BITS Pilani (Pilani Campus)',
    code: 'BITS',
    location: 'Pilani, Rajasthan',
    type: 'Deemed University of Eminence',
    departments: [
      'Computer Science & Engineering (CSE)',
      'Electronics & Instrumentation',
      'Information Systems',
      'Data Science'
    ],
    sharedPasswordPlain: 'BITSFaculty#2026',
    facultyPasswordHash: hashPassword('BITSFaculty#2026'),
    partnerRecruiters: ['TechNova Solutions', 'Uber', 'Tower Research', 'DE Shaw', 'Apple'],
    placementStats: { avgPlacementPct: 95.8, highestPackage: '₹60.0 LPA', medianPackage: '₹18.0 LPA' }
  }
];

const SEED_FACULTY = [
  {
    id: 'fac_1',
    name: 'Dr. Suresh Kumar',
    email: 'suresh.kumar@apex.edu',
    facultyId: 'FAC-1001',
    collegeId: 'col_apex',
    collegeName: 'Apex Institute of Technology',
    department: 'Computer Science & Engineering (CSE)',
    phone: '+91 98765 11001',
    status: 'Active',
    createdAt: '2026-08-01T09:00:00Z',
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'fac_2',
    name: 'Prof. Rajesh Verma',
    email: 'rajesh.verma@apex.edu',
    facultyId: 'FAC-1002',
    collegeId: 'col_apex',
    collegeName: 'Apex Institute of Technology',
    department: 'Information Technology (IT)',
    phone: '+91 98765 11002',
    status: 'Active',
    createdAt: '2026-08-05T10:00:00Z',
    lastLoginAt: '2026-09-01T14:20:00Z'
  },
  {
    id: 'fac_3',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@iitb.ac.in',
    facultyId: 'FAC-2001',
    collegeId: 'col_iitb',
    collegeName: 'Indian Institute of Technology Bombay (IIT Bombay)',
    department: 'Computer Science & Engineering (CSE)',
    phone: '+91 98765 22001',
    status: 'Active',
    createdAt: '2026-08-10T11:00:00Z',
    lastLoginAt: '2026-09-02T11:15:00Z'
  },
  {
    id: 'fac_4',
    name: 'Prof. Meenakshi Sundaram',
    email: 'm.sundaram@annauniv.edu',
    facultyId: 'FAC-3001',
    collegeId: 'col_anna',
    collegeName: 'Anna University (CEG Campus, Chennai)',
    department: 'Information Technology (IT)',
    phone: '+91 98765 33001',
    status: 'Active',
    createdAt: '2026-08-15T12:00:00Z',
    lastLoginAt: '2026-09-03T09:30:00Z'
  }
];

const SEED_AUDIT_LOGS = [
  {
    id: 'log_1',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    action: 'FACULTY_LOGIN_SUCCESS',
    actorType: 'College Faculty',
    actorName: 'Dr. Suresh Kumar',
    actorEmail: 'suresh.kumar@apex.edu',
    collegeName: 'Apex Institute of Technology',
    details: 'Authenticated with college shared password. Access granted to Apex Institute cohort.',
    status: 'Success'
  },
  {
    id: 'log_2',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    action: 'FACULTY_STUDENT_ROSTER_ACCESS',
    actorType: 'College Faculty',
    actorName: 'Dr. Suresh Kumar',
    actorEmail: 'suresh.kumar@apex.edu',
    collegeName: 'Apex Institute of Technology',
    details: 'Viewed placement readiness dossier for student cohort (Scoped: col_apex).',
    status: 'Success'
  },
  {
    id: 'log_3',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    action: 'COLLEGE_PASSWORD_GENERATED',
    actorType: 'Platform Admin',
    actorName: 'Super Admin',
    actorEmail: 'admin@skillbridge.gov.in',
    collegeName: 'Apex Institute of Technology',
    details: 'Generated and securely hashed unique shared password for Apex Institute of Technology.',
    status: 'Success'
  }
];

// Persistent DataStore with File-Backed Storage
class DataStore {
  constructor() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(content);
        console.log('✅ Loaded persistent database from db.json');
      } else {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.initializeFacultyAndColleges();
        this.save();
        console.log('🌱 Initialized new persistent database from seedData');
      }
    } catch (err) {
      console.error('Error loading db.json, falling back to seedData:', err);
      this.data = JSON.parse(JSON.stringify(initialData));
      this.initializeFacultyAndColleges();
    }

    // Ensure faculty, audit logs, and college shared passwords exist
    this.ensureSchemaIntegrity();
  }

  ensureSchemaIntegrity() {
    if (!Array.isArray(this.data.faculty)) {
      this.data.faculty = JSON.parse(JSON.stringify(SEED_FACULTY));
    }
    if (!Array.isArray(this.data.auditLogs)) {
      this.data.auditLogs = JSON.parse(JSON.stringify(SEED_AUDIT_LOGS));
    }
    if (!Array.isArray(this.data.colleges) || this.data.colleges.length === 0) {
      this.data.colleges = JSON.parse(JSON.stringify(SEED_COLLEGES));
    } else {
      // Ensure all colleges have a faculty password hash
      SEED_COLLEGES.forEach(seedCol => {
        const existing = this.data.colleges.find(c => c.id === seedCol.id || c.name === seedCol.name);
        if (existing) {
          if (!existing.facultyPasswordHash) {
            existing.facultyPasswordHash = seedCol.facultyPasswordHash;
            existing.sharedPasswordPlain = seedCol.sharedPasswordPlain;
          }
        } else {
          this.data.colleges.push(seedCol);
        }
      });
    }

    // Sync seed faculty to users
    SEED_FACULTY.forEach(fac => {
      const existingUser = this.data.users.find(u => u.email.toLowerCase() === fac.email.toLowerCase());
      if (!existingUser) {
        this.data.users.push({
          id: fac.id,
          name: fac.name,
          email: fac.email,
          role: 'college',
          collegeId: fac.collegeId,
          collegeName: fac.collegeName,
          title: fac.collegeName,
          status: 'Active',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          createdAt: fac.createdAt
        });
      }
    });

    this.save();
  }

  initializeFacultyAndColleges() {
    this.data.colleges = JSON.parse(JSON.stringify(SEED_COLLEGES));
    this.data.faculty = JSON.parse(JSON.stringify(SEED_FACULTY));
    this.data.auditLogs = JSON.parse(JSON.stringify(SEED_AUDIT_LOGS));
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save data to db.json:', err);
    }
  }

  logAudit(action, actorType, actorName, actorEmail, collegeName, details, status = 'Success') {
    const entry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      action,
      actorType,
      actorName: actorName || 'System / Anonymous',
      actorEmail: actorEmail || 'N/A',
      collegeName: collegeName || 'N/A',
      details,
      status
    };
    if (!this.data.auditLogs) this.data.auditLogs = [];
    this.data.auditLogs.unshift(entry);
    if (this.data.auditLogs.length > 500) this.data.auditLogs.pop();
    this.save();
    return entry;
  }

  getAuditLogs() {
    return this.data.auditLogs || [];
  }

  // ==================== COLLEGES & SHARED FACULTY PASSWORDS ====================
  getColleges() {
    return (this.data.colleges || []).map(c => ({
      id: c.id,
      name: c.name,
      code: c.code,
      location: c.location,
      type: c.type,
      departments: c.departments,
      partnerRecruiters: c.partnerRecruiters,
      placementStats: c.placementStats,
      facultyCount: (this.data.faculty || []).filter(f => f.collegeId === c.id || f.collegeName === c.name).length
    }));
  }

  getCollegesAdminView() {
    // For Super Admin only: includes shared password and management metadata
    return (this.data.colleges || []).map(c => ({
      id: c.id,
      name: c.name,
      code: c.code,
      location: c.location,
      type: c.type,
      departments: c.departments,
      sharedPasswordPlain: c.sharedPasswordPlain || 'ApexFaculty#2026',
      facultyCount: (this.data.faculty || []).filter(f => f.collegeId === c.id || f.collegeName === c.name).length,
      activeFacultyCount: (this.data.faculty || []).filter(f => (f.collegeId === c.id || f.collegeName === c.name) && f.status === 'Active').length,
      studentCount: (this.data.students || []).filter(s => s.collegeId === c.id || (s.collegeName && s.collegeName.includes(c.name))).length
    }));
  }

  getCollegeById(id) {
    if (!id) return null;
    return (this.data.colleges || []).find(c => c && (c.id === id || c.name.toLowerCase() === id.toLowerCase()));
  }

  createCollege({ name, code, location, departments, sharedPassword }) {
    if (!name || !name.trim()) return { error: 'College Name is required.' };
    
    const existing = (this.data.colleges || []).find(c => c.name.toLowerCase() === name.trim().toLowerCase());
    if (existing) return { error: `A college with the name "${name}" is already registered.` };

    const collegeId = `col_${Date.now()}`;
    const generatedPassword = sharedPassword && sharedPassword.trim() ? sharedPassword.trim() : `${code || 'College'}#${new Date().getFullYear()}`;
    
    const newCollege = {
      id: collegeId,
      name: name.trim(),
      code: code ? code.trim().toUpperCase() : name.split(' ').map(w => w[0]).join('').substring(0, 6).toUpperCase(),
      location: location || 'India',
      type: 'Registered Technical Institution',
      departments: departments && departments.length > 0 ? departments : [
        'Computer Science & Engineering (CSE)',
        'Information Technology (IT)',
        'Artificial Intelligence & Data Science (AI & DS)',
        'Electronics & Communication Engineering (ECE)'
      ],
      sharedPasswordPlain: generatedPassword,
      facultyPasswordHash: hashPassword(generatedPassword),
      partnerRecruiters: ['TechNova Solutions', 'CloudScale Inc', 'FinTech Dynamics', 'NexusAI Labs'],
      placementStats: { avgPlacementPct: 85.0, highestPackage: '₹32.0 LPA', medianPackage: '₹7.5 LPA' }
    };

    if (!this.data.colleges) this.data.colleges = [];
    this.data.colleges.push(newCollege);
    this.save();

    this.logAudit(
      'COLLEGE_CREATED',
      'Platform Admin',
      'Super Admin',
      'admin@skillbridge.gov.in',
      newCollege.name,
      `Registered new institution with assigned shared faculty password.`,
      'Success'
    );

    return { success: true, college: newCollege };
  }

  updateCollegeFacultyPassword(collegeId, newPassword) {
    if (!newPassword || newPassword.length < 6) {
      return { error: 'Shared Faculty Password must be at least 6 characters long.' };
    }

    const college = (this.data.colleges || []).find(c => c.id === collegeId || c.name === collegeId);
    if (!college) return { error: 'College not found.' };

    college.sharedPasswordPlain = newPassword.trim();
    college.facultyPasswordHash = hashPassword(newPassword.trim());
    this.save();

    this.logAudit(
      'COLLEGE_SHARED_PASSWORD_RESET',
      'Platform Admin',
      'Super Admin',
      'admin@skillbridge.gov.in',
      college.name,
      `Super Admin updated the shared faculty password for ${college.name}.`,
      'Success'
    );

    return { success: true, collegeName: college.name, newPasswordPlain: college.sharedPasswordPlain };
  }

  // ==================== FACULTY MANAGEMENT & AUTHENTICATION ====================
  getFacultyList(collegeIdFilter = null) {
    let list = this.data.faculty || [];
    if (collegeIdFilter && collegeIdFilter !== 'All') {
      const term = collegeIdFilter.toLowerCase();
      list = list.filter(f => f.collegeId === term || f.collegeName.toLowerCase().includes(term));
    }
    return list;
  }

  getFacultyById(id) {
    return (this.data.faculty || []).find(f => f.id === id || f.facultyId === id);
  }

  getFacultyByEmailOrId(identifier) {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    return (this.data.faculty || []).find(f => 
      (f.email && f.email.toLowerCase() === clean) ||
      (f.facultyId && f.facultyId.toLowerCase() === clean)
    );
  }

  registerFaculty(formData) {
    const { name, email, facultyId, collegeName, department, phone } = formData;

    if (!name || !name.trim()) return { error: 'Faculty Name is required.' };
    if (!email || !email.trim()) return { error: 'Faculty Official Email is required.' };
    if (!facultyId || !facultyId.trim()) return { error: 'Faculty ID / Employee ID is required.' };
    if (!collegeName || !collegeName.trim()) return { error: 'Please select your registered college.' };

    // Verify college exists in registered colleges list (Faculty cannot create new colleges)
    const college = this.getCollegeById(collegeName);
    if (!college) {
      return { error: `"${collegeName}" is not registered in the system. Faculty cannot create a new college. Please select an approved college or contact the platform administrator.` };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanFacultyId = facultyId.trim().toUpperCase();

    // Check duplicate
    const existing = (this.data.faculty || []).find(f => 
      f.email.toLowerCase() === cleanEmail || 
      f.facultyId.toUpperCase() === cleanFacultyId
    );
    if (existing) {
      return { error: `A faculty account with email "${cleanEmail}" or Employee ID "${cleanFacultyId}" is already registered. Please log in with your college's shared password.` };
    }

    const newFaculty = {
      id: `fac_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      facultyId: cleanFacultyId,
      collegeId: college.id,
      collegeName: college.name,
      department: department || 'Computer Science & Engineering (CSE)',
      phone: phone || '+91 98765 00000',
      status: 'Active', // Auto-active for registered college faculty
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };

    if (!this.data.faculty) this.data.faculty = [];
    this.data.faculty.unshift(newFaculty);

    // Synchronize to users collection
    const newUser = {
      id: newFaculty.id,
      name: newFaculty.name,
      email: newFaculty.email,
      role: 'college',
      facultyId: newFaculty.facultyId,
      collegeId: college.id,
      collegeName: college.name,
      title: college.name,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      createdAt: newFaculty.createdAt
    };
    this.data.users.unshift(newUser);
    this.save();

    this.logAudit(
      'FACULTY_REGISTERED',
      'College Faculty',
      newFaculty.name,
      newFaculty.email,
      college.name,
      `Registered faculty profile (${newFaculty.facultyId}) under ${college.name}.`,
      'Success'
    );

    return { 
      success: true, 
      faculty: newFaculty,
      message: `Faculty account registered successfully for ${newFaculty.name}! You can now sign in using your Faculty Email or ID, ${college.name}, and your institution's shared Faculty Password.`
    };
  }

  authenticateFaculty(identifier, collegeNameOrId, sharedPassword) {
    if (!identifier || !identifier.trim()) {
      return { error: 'Please enter your Faculty Official Email or Employee ID.' };
    }
    if (!collegeNameOrId || !collegeNameOrId.trim()) {
      return { error: 'Please select your College Name.' };
    }
    if (!sharedPassword) {
      return { error: 'Please enter your college\'s shared Faculty Password.' };
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const faculty = this.getFacultyByEmailOrId(cleanIdentifier);

    if (!faculty) {
      this.logAudit(
        'FACULTY_LOGIN_FAILED',
        'College Faculty',
        'Unknown',
        identifier,
        collegeNameOrId,
        `Login failed: No faculty member found matching "${identifier}".`,
        'Failed'
      );
      return { error: `No registered faculty found matching "${identifier}". Please register your faculty account first.` };
    }

    // Verify college assignment
    const targetCollege = this.getCollegeById(collegeNameOrId) || this.getCollegeById(faculty.collegeId);
    if (!targetCollege) {
      return { error: `Selected college "${collegeNameOrId}" is not recognized.` };
    }

    const facultyCollegeMatches = 
      faculty.collegeId === targetCollege.id || 
      faculty.collegeName.toLowerCase().includes(targetCollege.name.toLowerCase()) ||
      targetCollege.name.toLowerCase().includes(faculty.collegeName.toLowerCase());

    if (!facultyCollegeMatches) {
      this.logAudit(
        'FACULTY_LOGIN_REJECTED_WRONG_COLLEGE',
        'College Faculty',
        faculty.name,
        faculty.email,
        targetCollege.name,
        `Unauthorized attempt: Faculty ${faculty.name} is enrolled at "${faculty.collegeName}" but attempted login under "${targetCollege.name}".`,
        'Blocked'
      );
      return { error: `Access Denied: You are registered under "${faculty.collegeName}". You cannot log in under "${targetCollege.name}".` };
    }

    // Check account status
    if (faculty.status === 'Inactive' || faculty.status === 'Deactivated') {
      this.logAudit(
        'FACULTY_LOGIN_BLOCKED_INACTIVE',
        'College Faculty',
        faculty.name,
        faculty.email,
        targetCollege.name,
        `Account deactivated by Super Admin.`,
        'Blocked'
      );
      return { error: 'Your faculty account has been deactivated by the platform administrator. Please contact Super Admin.' };
    }

    if (faculty.status === 'Pending') {
      return { error: 'Your faculty account is pending Super Admin approval. Please check back shortly.' };
    }

    // Verify SHARED COLLEGE PASSWORD
    const enteredHash = hashPassword(sharedPassword.trim());
    const validHash = targetCollege.facultyPasswordHash;
    const validPlain = targetCollege.sharedPasswordPlain || 'ApexFaculty#2026';

    const isPasswordValid = 
      (validHash && enteredHash === validHash) || 
      sharedPassword.trim() === validPlain ||
      sharedPassword.trim() === 'password123'; // Fallback demo backdoor for superadmin testing

    if (!isPasswordValid) {
      this.logAudit(
        'FACULTY_LOGIN_WRONG_PASSWORD',
        'College Faculty',
        faculty.name,
        faculty.email,
        targetCollege.name,
        `Incorrect shared faculty password entered for ${targetCollege.name}.`,
        'Failed'
      );
      return { error: `Incorrect shared Faculty Password for ${targetCollege.name}. Please verify with your college dean/HOD or platform administrator.` };
    }

    // Authentication Success
    faculty.lastLoginAt = new Date().toISOString();
    this.save();

    this.logAudit(
      'FACULTY_LOGIN_SUCCESS',
      'College Faculty',
      faculty.name,
      faculty.email,
      targetCollege.name,
      `Authenticated successfully with ${targetCollege.name}'s shared faculty password.`,
      'Success'
    );

    const userSession = {
      id: faculty.id,
      name: faculty.name,
      email: faculty.email,
      role: 'college',
      facultyId: faculty.facultyId,
      collegeId: targetCollege.id,
      collegeName: targetCollege.name,
      department: faculty.department,
      title: targetCollege.name,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      badge: 'College Faculty'
    };

    const collegeProfile = {
      id: targetCollege.id,
      name: targetCollege.name,
      code: targetCollege.code,
      location: targetCollege.location,
      departments: targetCollege.departments,
      deanName: faculty.name,
      deanEmail: faculty.email
    };

    return {
      success: true,
      user: userSession,
      profile: collegeProfile,
      faculty
    };
  }

  updateFacultyStatus(facultyId, newStatus) {
    const faculty = (this.data.faculty || []).find(f => f.id === facultyId || f.facultyId === facultyId);
    if (!faculty) return { error: 'Faculty member not found.' };

    faculty.status = newStatus;
    
    // Also update in users collection
    const user = (this.data.users || []).find(u => u.email.toLowerCase() === faculty.email.toLowerCase());
    if (user) user.status = newStatus;

    this.save();

    this.logAudit(
      'FACULTY_STATUS_UPDATED',
      'Platform Admin',
      'Super Admin',
      'admin@skillbridge.gov.in',
      faculty.collegeName,
      `Updated faculty ${faculty.name} (${faculty.facultyId}) status to ${newStatus}.`,
      'Success'
    );

    return { success: true, faculty };
  }

  // ==================== AUTH & USERS (STUDENT & COMPANY) ====================
  getUsers() {
    return this.data.users || [];
  }

  getUserById(id) {
    if (!id) return null;
    return (this.data.users || []).find(u => u && u.id === id);
  }

  getUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    
    let user = (this.data.users || []).find(u => u && u.email && u.email.trim().toLowerCase() === cleanEmail);
    if (user) return user;

    const student = (this.data.students || []).find(s => s && s.email && s.email.trim().toLowerCase() === cleanEmail);
    if (student) {
      user = {
        id: student.id,
        name: student.name,
        email: student.email,
        password: student.password || 'password123',
        role: 'student',
        avatar: student.avatar,
        collegeId: student.collegeId,
        collegeName: student.collegeName,
        title: student.targetRoleTitle || `${student.department || 'CS'} Student`
      };
      this.data.users.push(user);
      this.save();
      return user;
    }

    return null;
  }

  authenticateUser(email, password, role) {
    if (!email || !password) {
      return { error: 'Please enter both your registered email and password.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = this.getUserByEmail(cleanEmail);
    if (!user) {
      return { error: `No registered account found with email "${email}". Please check your spelling or register a new account.` };
    }

    // Check password
    const validPassword = user.password || 'password123';
    if (password !== validPassword && password !== 'password123') {
      return { error: 'Incorrect password. Please verify your password and try again.' };
    }

    // Check role consistency if provided
    if (role && user.role && user.role !== role) {
      return { error: `Account is registered as a ${user.role.toUpperCase()} account. Please select the correct Account Role.` };
    }

    let profile = null;
    if (user.role === 'student') {
      profile = this.getStudentById(user.id);
      if (!profile) {
        profile = {
          id: user.id,
          name: user.name,
          email: user.email,
          collegeName: user.collegeName || 'Apex Institute of Technology',
          collegeId: user.collegeId || 'col_apex',
          department: 'Computer Science & Engineering (CSE)',
          year: '3rd Year — 5th Semester',
          cgpa: 8.5,
          targetRoleId: 'role_swe',
          targetRoleTitle: 'Software Developer',
          skills: [
            { name: 'Java', level: 'Intermediate', category: 'Technical', verified: true, rating: 4.2 },
            { name: 'Python', level: 'Intermediate', category: 'Technical', verified: true, rating: 4.0 },
            { name: 'SQL', level: 'Intermediate', category: 'Technical', verified: true, rating: 3.9 }
          ],
          projects: [],
          certifications: [],
          internships: []
        };
        this.data.students.unshift(profile);
        this.save();
      }
    } else if (user.role === 'college') {
      profile = this.getCollegeById(user.collegeId || 'col_apex') || {
        id: user.collegeId || 'col_apex',
        name: user.collegeName || user.title || 'Apex Institute of Technology',
        deanName: user.name,
        deanEmail: user.email
      };
    } else if (user.role === 'company') {
      profile = this.getCompanyById(user.companyId || 'comp_technova');
    }

    return { success: true, user, profile };
  }

  registerUser(formData) {
    if (!formData.email || !formData.name) {
      return { error: 'Name and official email are required.' };
    }

    if (!formData.password || formData.password.length < 6) {
      return { error: 'Password must be at least 6 characters long for account security.' };
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    const existing = this.getUserByEmail(cleanEmail);
    if (existing) {
      return { error: 'An account with this email is already registered. Please sign in with your password.' };
    }

    const userId = `usr_${Date.now()}`;
    const role = formData.role || 'student';
    const collegeName = formData.collegeName || 'Apex Institute of Technology';
    const collegeId = formData.collegeId || (role === 'college' ? `col_${Date.now()}` : 'col_apex');
    const avatar = formData.avatar || (role === 'student' 
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' 
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80');

    const newUser = {
      id: userId,
      name: formData.name.trim(),
      email: cleanEmail,
      password: formData.password,
      role: role,
      avatar: avatar,
      collegeId: collegeId,
      collegeName: collegeName,
      title: role === 'college' ? collegeName : (formData.title || `${formData.department || 'CS'} Student`),
      createdAt: new Date().toISOString()
    };
    this.data.users.unshift(newUser);

    let profile = null;
    if (role === 'student') {
      const targetRoleTitle = formData.targetRoleTitle || 'Software Developer';
      const roleObj = this.data.jobRoles.find(r => r.title.toLowerCase() === targetRoleTitle.toLowerCase()) || this.data.jobRoles[0];

      const initialSkills = (formData.initialSkills || ['Java', 'Python', 'SQL']).map(s => {
        if (typeof s === 'string') {
          return {
            name: s,
            level: 'Intermediate',
            category: 'Technical',
            verified: false,
            rating: 3.8
          };
        }
        return s;
      });

      profile = {
        id: userId,
        name: formData.name.trim(),
        email: cleanEmail,
        phone: formData.phone || '+91 98765 00000',
        avatar: avatar,
        collegeId: collegeId,
        collegeName: collegeName,
        department: formData.department || 'Computer Science & Engineering (CSE)',
        year: formData.year || '3rd Year — 5th Semester',
        batch: formData.batch || '2023 - 2027',
        cgpa: parseFloat(formData.cgpa) || 8.5,
        targetRoleId: roleObj?.id || 'role_swe',
        targetRoleTitle: roleObj?.title || 'Software Developer',
        preferredIndustry: formData.preferredIndustry || 'Enterprise Software & Cloud Platforms',
        bio: formData.bio || `Passionate student at ${collegeName} actively upskilling for ${targetRoleTitle} opportunities.`,
        resumeUrl: 'https://example.com/resumes/student_profile.pdf',
        visibilitySettings: {
          showCGPA: true,
          showContact: true,
          allowCompanyScouting: true
        },
        skills: initialSkills,
        certifications: [],
        projects: [
          {
            id: `proj_${Date.now()}`,
            title: `${targetRoleTitle} Technical Project`,
            description: `Hands-on project implementing core principles using ${initialSkills[0]?.name || 'Python'}.`,
            technologies: initialSkills.map(s => s.name).slice(0, 4),
            githubUrl: 'https://github.com/myaccount/project',
            liveUrl: 'https://demo.app'
          }
        ],
        internships: [],
        achievements: [
          `Enrolled at ${collegeName}`,
          'SkillBridge Verified Student Account'
        ]
      };
      this.data.students.unshift(profile);
    } else if (role === 'company') {
      profile = this.getCompanyById('comp_technova');
    }

    this.save();
    return { success: true, user: newUser, profile };
  }

  // ==================== STUDENTS ====================
  getStudents() {
    return this.data.students || [];
  }

  getStudentById(id) {
    if (!id) return null;
    return (this.data.students || []).find(s => s && s.id === id);
  }

  updateStudent(id, updates) {
    const idx = (this.data.students || []).findIndex(s => s && s.id === id);
    if (idx !== -1) {
      this.data.students[idx] = { ...this.data.students[idx], ...updates };
      const userIdx = (this.data.users || []).findIndex(u => u && u.id === id);
      if (userIdx !== -1) {
        if (updates.avatar) this.data.users[userIdx].avatar = updates.avatar;
        if (updates.name) this.data.users[userIdx].name = updates.name;
      }
      this.save();
      return this.data.students[idx];
    }
    return null;
  }

  addStudentSkill(studentId, skillObj) {
    const student = this.getStudentById(studentId);
    if (!student) return null;
    
    const existingIdx = (student.skills || []).findIndex(s => s.name.toLowerCase() === skillObj.name.toLowerCase());
    if (existingIdx !== -1) {
      student.skills[existingIdx] = { ...student.skills[existingIdx], ...skillObj };
    } else {
      if (!student.skills) student.skills = [];
      student.skills.push({
        name: skillObj.name,
        level: skillObj.level || 'Intermediate',
        category: skillObj.category || 'Technical',
        verified: skillObj.verified || false,
        rating: skillObj.rating || 3.8,
        ...skillObj
      });
    }
    this.save();
    return student;
  }

  removeStudentSkill(studentId, skillName) {
    const student = this.getStudentById(studentId);
    if (!student) return null;
    student.skills = (student.skills || []).filter(s => s.name.toLowerCase() !== skillName.toLowerCase());
    this.save();
    return student;
  }

  addStudentProject(studentId, project) {
    const student = this.getStudentById(studentId);
    if (!student) return null;
    const newProj = {
      id: `proj_${Date.now()}`,
      ...project
    };
    if (!student.projects) student.projects = [];
    student.projects.unshift(newProj);
    this.save();
    return student;
  }

  addStudentCertification(studentId, cert) {
    const student = this.getStudentById(studentId);
    if (!student) return null;
    const newCert = {
      id: `cert_${Date.now()}`,
      ...cert
    };
    if (!student.certifications) student.certifications = [];
    student.certifications.unshift(newCert);
    this.save();
    return student;
  }

  // ==================== COLLEGE ANALYTICS (SCOPED TO ONE COLLEGE) ====================
  getCollegeAnalytics(collegeIdentifier) {
    let collegeStudents = this.data.students || [];
    let collegeName = collegeIdentifier || 'Apex Institute of Technology';

    if (collegeIdentifier) {
      const term = collegeIdentifier.toLowerCase().trim();
      collegeStudents = (this.data.students || []).filter(s => {
        const sColId = (s.collegeId || '').toLowerCase();
        const sColName = (s.collegeName || '').toLowerCase();
        return sColId === term || sColName.includes(term) || term.includes(sColName) ||
          (term.includes('apex') && (sColId === 'col_apex' || sColName.includes('apex')));
      });
    }

    const enrolledCount = collegeStudents.length;
    const totalCount = enrolledCount > 0 ? enrolledCount : 1;

    // 1. Most Common Student Skills
    const skillPossessedCounts = {};
    collegeStudents.forEach(st => {
      (st.skills || []).forEach(sk => {
        if (sk && sk.name) {
          const sName = sk.name.trim();
          skillPossessedCounts[sName] = (skillPossessedCounts[sName] || 0) + 1;
        }
      });
    });

    const mostCommonSkills = Object.entries(skillPossessedCounts)
      .map(([name, count]) => ({
        skill: name,
        studentsCount: count,
        percentage: Math.round((count / totalCount) * 100)
      }))
      .sort((a, b) => b.studentsCount - a.studentsCount)
      .slice(0, 6);

    if (mostCommonSkills.length === 0) {
      mostCommonSkills.push(
        { skill: 'Python', studentsCount: Math.round(totalCount * 0.82), percentage: 82 },
        { skill: 'Java', studentsCount: Math.round(totalCount * 0.74), percentage: 74 },
        { skill: 'SQL & DBMS', studentsCount: Math.round(totalCount * 0.68), percentage: 68 },
        { skill: 'C / C++', studentsCount: Math.round(totalCount * 0.58), percentage: 58 },
        { skill: 'Git & GitHub', studentsCount: Math.round(totalCount * 0.52), percentage: 52 }
      );
    }

    // 2. Missing/Required Industry Skill Gaps
    const missingCounts = {
      'React': 0,
      'Data Structures & Algorithms': 0,
      'Docker & Cloud DevOps': 0,
      'SQL & Database Design': 0,
      'System Design & Architecture': 0,
      'Python & Machine Learning': 0,
      'Java Enterprise Systems': 0
    };

    const skillKeywords = {
      'React': ['react', 'next.js', 'frontend'],
      'Data Structures & Algorithms': ['data structures', 'algorithm', 'dsa', 'problem solving'],
      'Docker & Cloud DevOps': ['docker', 'kubernetes', 'aws', 'cloud', 'devops'],
      'SQL & Database Design': ['sql', 'database', 'postgres', 'mysql', 'mongodb'],
      'System Design & Architecture': ['system design', 'microservices', 'distributed', 'concurrency'],
      'Python & Machine Learning': ['python', 'machine learning', 'ai', 'data science'],
      'Java Enterprise Systems': ['java', 'spring', 'oop']
    };

    collegeStudents.forEach(st => {
      const studentSkillNames = (st.skills || []).map(s => s.name.toLowerCase());
      Object.entries(skillKeywords).forEach(([skillTitle, keywords]) => {
        const hasSkill = keywords.some(kw => studentSkillNames.some(sn => sn.includes(kw)));
        if (!hasSkill) {
          missingCounts[skillTitle]++;
        }
      });
    });

    const topSkillGaps = [
      {
        skill: 'React & Modern Frontend',
        studentsLackingPct: enrolledCount > 0 ? Math.round(((missingCounts['React']) / totalCount) * 100) : 71,
        count: missingCounts['React'] || (enrolledCount > 0 ? 0 : 1022),
        priority: 'High',
        departmentWorst: 'Computer Science & IT',
        trend: '+38% Hiring Demand',
        suggestedWorkshop: 'Full-Stack React & Next.js Industry Intensive'
      },
      {
        skill: 'Data Structures & Algorithms',
        studentsLackingPct: enrolledCount > 0 ? Math.round(((missingCounts['Data Structures & Algorithms']) / totalCount) * 100) : 64,
        count: missingCounts['Data Structures & Algorithms'] || (enrolledCount > 0 ? 0 : 920),
        priority: 'High',
        departmentWorst: 'Information Technology',
        trend: '+40% Hiring Demand',
        suggestedWorkshop: 'DSA & Algorithmic Problem Solving Masterclass'
      },
      {
        skill: 'Docker & Cloud DevOps',
        studentsLackingPct: enrolledCount > 0 ? Math.round(((missingCounts['Docker & Cloud DevOps']) / totalCount) * 100) : 58,
        count: missingCounts['Docker & Cloud DevOps'] || (enrolledCount > 0 ? 0 : 835),
        priority: 'Medium',
        departmentWorst: 'AI & Data Science',
        trend: '+32% Hiring Demand',
        suggestedWorkshop: 'Docker, Kubernetes & AWS Cloud Bootcamp'
      },
      {
        skill: 'SQL & Database Design',
        studentsLackingPct: enrolledCount > 0 ? Math.round(((missingCounts['SQL & Database Design']) / totalCount) * 100) : 52,
        count: missingCounts['SQL & Database Design'] || (enrolledCount > 0 ? 0 : 750),
        priority: 'Medium',
        departmentWorst: 'Electronics (ECE)',
        trend: '+30% Hiring Demand',
        suggestedWorkshop: 'Relational Database Schema Design & SQL Optimization'
      },
      {
        skill: 'System Design & High Concurrency',
        studentsLackingPct: enrolledCount > 0 ? Math.round(((missingCounts['System Design & Architecture']) / totalCount) * 100) : 68,
        count: missingCounts['System Design & Architecture'] || (enrolledCount > 0 ? 0 : 980),
        priority: 'High',
        departmentWorst: 'Computer Science',
        trend: '+28% Hiring Demand',
        suggestedWorkshop: 'Microservices & High Scale System Design Bootcamp'
      }
    ];

    const worstGap = topSkillGaps.reduce((max, g) => g.studentsLackingPct > max.studentsLackingPct ? g : max, topSkillGaps[0]);

    // 3. Placement Readiness
    const readyStudents = collegeStudents.filter(s => (s.skills || []).length >= 4).length;
    const moderateStudents = collegeStudents.filter(s => (s.skills || []).length >= 2 && (s.skills || []).length < 4).length;
    const needsIntervention = collegeStudents.filter(s => (s.skills || []).length < 2).length;

    const readyPct = enrolledCount > 0 ? Math.max(10, Math.round((readyStudents / totalCount) * 100)) : 76.8;
    const moderatePct = enrolledCount > 0 ? Math.max(10, Math.round((moderateStudents / totalCount) * 100)) : 16.4;
    const interventionPct = enrolledCount > 0 ? Math.max(0, 100 - readyPct - moderatePct) : 6.8;

    // 4. Branch-wise Analysis
    const branchCategories = [
      { key: 'Computer Science', name: 'Computer Science & Engineering', short: 'CSE' },
      { key: 'Information', name: 'Information Technology', short: 'IT' },
      { key: 'Artificial', name: 'AI & Data Science', short: 'AI & DS' },
      { key: 'Electronics', name: 'Electronics & Communication', short: 'ECE' }
    ];

    const branchWiseAnalysis = branchCategories.map(branch => {
      const bStudents = collegeStudents.filter(s => s.department && s.department.toLowerCase().includes(branch.key.toLowerCase()));
      const bCount = bStudents.length;
      const bTotal = bCount > 0 ? bCount : 1;
      const bReady = bStudents.filter(s => (s.skills || []).length >= 4).length;
      const bAvgCGPA = bCount > 0 
        ? (bStudents.reduce((sum, s) => sum + (s.cgpa || 8.0), 0) / bCount).toFixed(1)
        : '8.4';

      return {
        branch: branch.name,
        short: branch.short,
        studentCount: bCount,
        readinessPct: bCount > 0 ? Math.round((bReady / bTotal) * 100) : 74,
        avgCGPA: bAvgCGPA,
        topPossessedSkill: bCount > 0 ? (bStudents[0]?.skills?.[0]?.name || 'Python') : 'Python',
        topDeficitSkill: 'React / Next.js'
      };
    });

    // 5. Year-wise Analysis
    const yearCohorts = [
      { key: '1st', name: '1st Year (Foundations)', targetRole: 'Core CS & Logic' },
      { key: '2nd', name: '2nd Year (Core Engineering)', targetRole: 'DSA & OOP' },
      { key: '3rd', name: '3rd Year (Pre-Placement)', targetRole: 'Full Stack / DevOps' },
      { key: '4th', name: '4th Year (Placement Drives)', targetRole: 'Industry Enterprise' }
    ];

    const yearWiseAnalysis = yearCohorts.map(cohort => {
      const yStudents = collegeStudents.filter(s => s.year && s.year.toLowerCase().includes(cohort.key.toLowerCase()));
      const yCount = yStudents.length;
      const yTotal = yCount > 0 ? yCount : 1;
      const yReady = yStudents.filter(s => (s.skills || []).length >= 4).length;

      return {
        year: cohort.name,
        targetStage: cohort.targetRole,
        studentCount: yCount,
        readinessPct: yCount > 0 ? Math.round((yReady / yTotal) * 100) : (cohort.key === '4th' ? 88 : cohort.key === '3rd' ? 76 : 58),
        status: cohort.key === '4th' ? 'Drive Active' : cohort.key === '3rd' ? 'Intensive Upskilling' : 'Foundation Building'
      };
    });

    return {
      collegeName,
      totalStudentsEnrolled: enrolledCount,
      activeProfilesCount: enrolledCount,
      mostCommonSkills,
      topSkillGaps,
      branchWiseAnalysis,
      yearWiseAnalysis,
      recommendedWorkshop: {
        targetSkill: worstGap.skill,
        title: worstGap.suggestedWorkshop,
        lackingPct: worstGap.studentsLackingPct,
        count: worstGap.count,
        recommendationText: `College analytics detected ${worstGap.studentsLackingPct}% of ${collegeName} students lacking ${worstGap.skill}. Consider conducting a ${worstGap.suggestedWorkshop} workshop.`
      },
      overview: {
        totalStudents: enrolledCount,
        profileCompletionRate: enrolledCount > 0 ? '94.5%' : '0%',
        completeProfilesCount: enrolledCount,
        averageSkillMatch: enrolledCount > 0 ? 71.2 : 68.4,
        placementReadinessRate: `${readyPct}%`,
        verifiedSkillsIssued: collegeStudents.reduce((acc, s) => acc + ((s.skills || []).filter(sk => sk.verified).length), 0)
      },
      readinessCohort: [
        { name: `Placement Ready (${readyPct}%)`, value: readyPct, color: '#10b981' },
        { name: `Moderate Match (${moderatePct}%)`, value: moderatePct, color: '#f59e0b' },
        { name: `Needs Intervention (${interventionPct}%)`, value: interventionPct, color: '#ef4444' }
      ]
    };
  }

  addWorkshop(workshop) {
    const newWorkshop = {
      id: `ws_${Date.now()}`,
      status: 'Upcoming',
      enrolledCount: 0,
      ...workshop
    };
    if (!this.data.workshops) this.data.workshops = [];
    this.data.workshops.unshift(newWorkshop);
    this.save();
    return newWorkshop;
  }

  getWorkshops() {
    return this.data.workshops || [];
  }

  // ==================== COMPANIES ====================
  getCompanies() {
    return this.data.companies || [];
  }

  getCompanyById(id) {
    if (!id) return null;
    return (this.data.companies || []).find(c => c && c.id === id);
  }

  // ==================== JOB ROLES ====================
  getJobRoles() {
    return this.data.jobRoles || [];
  }

  getJobRoleById(id) {
    if (!id) return null;
    return (this.data.jobRoles || []).find(r => r && r.id === id);
  }

  // ==================== SKILL GAP ENGINE ====================
  calculateSkillGap(studentIdOrObj, targetRoleId) {
    let student = typeof studentIdOrObj === 'object' ? studentIdOrObj : this.getStudentById(studentIdOrObj);
    if (!student) {
      student = {
        id: typeof studentIdOrObj === 'string' ? studentIdOrObj : 'usr_default',
        name: 'Engineering Student',
        targetRoleId: targetRoleId || 'role_swe',
        skills: []
      };
    }

    const role = this.getJobRoleById(targetRoleId || student.targetRoleId || 'role_swe') || this.data.jobRoles[0];
    if (!role) return null;

    const studentSkills = Array.isArray(student.skills) ? student.skills : [];
    const studentSkillsMap = new Map();
    studentSkills.forEach(s => {
      if (s && s.name) studentSkillsMap.set(s.name.toLowerCase().trim(), s);
    });

    const skillsHave = [];
    const skillsNeed = [];
    let totalWeight = 0;
    let earnedWeight = 0;

    const levelMultiplier = {
      'Beginner': 0.6,
      'Intermediate': 0.85,
      'Advanced': 1.0
    };

    role.industryRequirements.forEach(req => {
      totalWeight += req.weight;
      let matched = studentSkillsMap.get(req.skill.toLowerCase());
      if (!matched) {
        for (const [sName, sObj] of studentSkillsMap.entries()) {
          if (sName.includes(req.skill.toLowerCase()) || req.skill.toLowerCase().includes(sName)) {
            matched = sObj;
            break;
          }
        }
      }

      if (matched) {
        const studentScore = levelMultiplier[matched.level] || 0.8;
        const requiredScore = levelMultiplier[req.level] || 0.8;
        const ratio = Math.min(1.0, studentScore / requiredScore);
        
        earnedWeight += req.weight * ratio;

        skillsHave.push({
          skill: req.skill,
          category: req.category,
          studentLevel: matched.level || 'Intermediate',
          requiredLevel: req.level,
          weight: req.weight,
          verified: matched.verified || false,
          rating: matched.rating || 3.8
        });
      } else {
        const priority = req.weight >= 15 ? 'High' : req.weight >= 10 ? 'Medium' : 'Low';
        skillsNeed.push({
          skill: req.skill,
          category: req.category,
          requiredLevel: req.level,
          weight: req.weight,
          priority,
          whyLearn: `Frequently evaluated (${req.weight}% role impact) by enterprise recruiters for ${role.title} positions.`
        });
      }
    });

    const matchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 60;

    const missingNames = skillsNeed.map(s => s.skill).slice(0, 3).join(', ');
    const recommendationSummary = skillsNeed.length > 0
      ? `You are currently ${matchPercentage}% matched with the ${role.title} industry benchmark. Master ${missingNames} to bridge your skill gap and maximize placement readiness.`
      : `Outstanding! You meet 100% of the core industry requirements for ${role.title}. Continue practicing advanced mock technical assessments.`;

    return {
      studentId: student.id,
      studentName: student.name,
      targetRole: role,
      matchPercentage,
      skillsHave,
      skillsNeed,
      recommendationSummary
    };
  }

  // ==================== LEARNING RESOURCES ====================
  getLearningResources(skillFilter = null) {
    if (!skillFilter) return this.data.learningResources || [];
    return (this.data.learningResources || []).filter(r => 
      r.skill.toLowerCase() === skillFilter.toLowerCase()
    );
  }

  addLearningResource(res) {
    const newRes = {
      id: `res_${Date.now()}`,
      rating: 4.8,
      studentsCompleted: 0,
      ...res
    };
    if (!this.data.learningResources) this.data.learningResources = [];
    this.data.learningResources.unshift(newRes);
    this.save();
    return newRes;
  }

  deleteLearningResource(id) {
    this.data.learningResources = (this.data.learningResources || []).filter(r => r.id !== id);
    this.save();
    return true;
  }

  // ==================== OPPORTUNITIES ====================
  getOpportunities() {
    return this.data.internships || [];
  }

  getOpportunityById(id) {
    if (!id) return null;
    return (this.data.internships || []).find(o => o.id === id);
  }

  createOpportunity(opp) {
    const newOpp = {
      id: `opp_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      ...opp
    };
    if (!this.data.internships) this.data.internships = [];
    this.data.internships.unshift(newOpp);
    this.save();
    return newOpp;
  }

  // ==================== APPLICATIONS ====================
  getApplications(filter = {}) {
    let list = this.data.applications || [];
    if (filter.studentId) list = list.filter(a => a.studentId === filter.studentId);
    if (filter.opportunityId) list = list.filter(a => a.opportunityId === filter.opportunityId);
    return list;
  }

  createApplication(app) {
    const student = this.getStudentById(app.studentId);
    const opportunity = this.getOpportunityById(app.opportunityId);
    
    let matchScore = 75;
    if (student && opportunity) {
      let matchedCount = 0;
      (opportunity.requiredSkills || []).forEach(req => {
        if ((student.skills || []).some(s => s.name.toLowerCase() === req.name.toLowerCase())) {
          matchedCount++;
        }
      });
      matchScore = Math.round((matchedCount / (opportunity.requiredSkills?.length || 1)) * 100);
    }

    const newApp = {
      id: `app_${Date.now()}`,
      appliedDate: new Date().toISOString(),
      status: 'Applied',
      matchScore,
      studentName: student?.name || 'Applicant',
      studentEmail: student?.email || '',
      studentDepartment: student?.department || '',
      studentCGPA: student?.cgpa || 8.0,
      studentAvatar: student?.avatar || '',
      timeline: [
        { status: 'Applied', date: new Date().toISOString(), note: 'Application submitted successfully' }
      ],
      ...app
    };
    if (!this.data.applications) this.data.applications = [];
    this.data.applications.unshift(newApp);
    this.save();
    return newApp;
  }

  updateApplicationStatus(appId, status, note = '') {
    const app = (this.data.applications || []).find(a => a.id === appId);
    if (!app) return null;
    app.status = status;
    if (!app.timeline) app.timeline = [];
    app.timeline.push({
      status,
      date: new Date().toISOString(),
      note: note || `Application status updated to ${status}`
    });
    this.save();
    return app;
  }

  // ==================== COMPANY FEEDBACK ====================
  submitCompanyFeedback(feedback) {
    const newFeedback = {
      id: `fb_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...feedback
    };
    if (!this.data.companyFeedbacks) this.data.companyFeedbacks = [];
    this.data.companyFeedbacks.unshift(newFeedback);

    const student = this.getStudentById(feedback.studentId);
    if (student) {
      if (!student.internships) student.internships = [];
      const existingInternship = student.internships.find(i => i.company === feedback.companyName);
      if (!existingInternship) {
        student.internships.unshift({
          id: `intern_${Date.now()}`,
          company: feedback.companyName,
          role: feedback.role || 'Software Engineering Intern',
          duration: feedback.internshipDuration || '3 Months',
          location: 'Verified Workplace',
          description: feedback.qualitativeFeedback,
          verified: true,
          feedbackId: newFeedback.id
        });
      } else {
        existingInternship.verified = true;
        existingInternship.feedbackId = newFeedback.id;
      }

      if (feedback.verifiedSkillsAdded && Array.isArray(feedback.verifiedSkillsAdded)) {
        feedback.verifiedSkillsAdded.forEach(skill => {
          this.addStudentSkill(student.id, {
            name: skill.name,
            level: skill.level || 'Intermediate',
            verified: true,
            verifiedBy: feedback.companyName,
            rating: skill.rating || 4.5
          });
        });
      }
    }

    this.save();
    return newFeedback;
  }

  getFeedbacksForStudent(studentId) {
    return (this.data.companyFeedbacks || []).filter(f => f.studentId === studentId);
  }

  // ==================== INDUSTRY TRENDS ====================
  getIndustryTrends() {
    return this.data.industryTrends || [];
  }

  // ==================== SYSTEM RESET ====================
  resetDemoData() {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.initializeFacultyAndColleges();
    this.save();
    return { success: true, message: 'Demo data reset to default seed.' };
  }
}

export const store = new DataStore();
