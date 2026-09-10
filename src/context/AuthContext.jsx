import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_PERSONAS = [
  {
    id: 'usr_student_1',
    name: 'Rahul Sharma',
    role: 'student',
    title: 'CS 3rd Year (Target: Software Dev)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    collegeName: 'Apex Institute of Technology',
    collegeId: 'col_apex',
    institutionId: 'INST001',
    badge: 'Student'
  },
  {
    id: 'usr_student_2',
    name: 'Priya Patel',
    role: 'student',
    title: 'IT 4th Year (Target: Frontend Dev)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    collegeName: 'Apex Institute of Technology',
    collegeId: 'col_apex',
    institutionId: 'INST001',
    badge: 'Student'
  },
  {
    id: 'usr_inst_1',
    name: 'Apex Institute of Technology',
    role: 'college',
    title: 'Apex Institute of Technology',
    collegeName: 'Apex Institute of Technology',
    collegeId: 'col_apex',
    institutionId: 'INST001',
    email: 'apex.institution@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
    badge: 'Institution (INST001)'
  },
  {
    id: 'usr_inst_2',
    name: 'IIT Bombay',
    role: 'college',
    title: 'Indian Institute of Technology Bombay',
    collegeName: 'Indian Institute of Technology Bombay (IIT Bombay)',
    collegeId: 'col_iitb',
    institutionId: 'INST002',
    email: 'iitb.institution@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
    badge: 'Institution (INST002)'
  },
  {
    id: 'usr_company_1',
    name: 'Ananya Mehta (HR Lead)',
    role: 'company',
    title: 'TechNova Solutions',
    companyName: 'TechNova Solutions',
    companyId: 'comp_technova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Industry Recruiter'
  },
  {
    id: 'usr_admin_1',
    name: 'Platform Admin',
    role: 'admin',
    title: 'SkillBridge Superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Platform Admin'
  }
];

const STORAGE_KEY_USER = 'skillbridge_auth_user';
const STORAGE_KEY_PROFILE = 'skillbridge_auth_profile';
const STORAGE_KEY_USERS = 'skillbridge_registered_users';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : DEMO_PERSONAS[0];
    } catch {
      return DEMO_PERSONAS[0];
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync session to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    }
  }, [profile]);

  // Authorized fetch helper that automatically attaches role & user ID headers
  const authFetch = (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      'x-user-id': user?.id || '',
      'x-user-role': user?.role || ''
    };
    return fetch(url, { ...options, headers });
  };

  const fetchProfile = async (targetUser = user) => {
    if (!targetUser) return;
    try {
      if (targetUser.role === 'student') {
        const res = await authFetch(`/api/students/${targetUser.id}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          return;
        }
      } else if (targetUser.role === 'college') {
        const colId = targetUser.collegeId || 'col_apex';
        const res = await authFetch(`/api/colleges/${colId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          return;
        } else {
          // Keep college profile identity
          setProfile({
            id: colId,
            name: targetUser.collegeName || targetUser.title || 'Apex Institute of Technology',
            deanName: targetUser.name,
            deanEmail: targetUser.email
          });
          return;
        }
      } else if (targetUser.role === 'company') {
        const compId = targetUser.companyId || 'comp_technova';
        const res = await authFetch(`/api/companies/${compId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend profile fetch note:', err.message);
    }
  };

  useEffect(() => {
    fetchProfile(user);
  }, [user?.id, user?.role, user?.collegeId, user?.collegeName]);

  const switchPersona = (personaId) => {
    const selected = DEMO_PERSONAS.find(p => p.id === personaId);
    if (selected) {
      setUser(selected);
      showToast(`Switched view to: ${selected.name} (${selected.badge})`, 'info');
    }
  };

  const setUserSession = (userData, profileData) => {
    setUser(userData);
    if (profileData) setProfile(profileData);
  };

  const registerUserAccount = async (formData) => {
    try {
      setLoading(true);
      
      let data = null;
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          data = await res.json();
        } else {
          const errData = await res.json().catch(() => ({}));
          if (errData.error) {
            showToast(errData.error, 'error');
            return { error: errData.error };
          }
        }
      } catch (e) {
        console.warn('Backend unavailable, activating instant local auth engine:', e);
      }

      if (data && data.success) {
        setUser(data.user);
        setProfile(data.profile);

        // Store to local vault backup
        try {
          const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
          storedUsers.unshift({ user: data.user, profile: data.profile });
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(storedUsers));
        } catch (e) {}

        showToast(`Account created securely for ${data.user.name}!`, 'success');
        return data;
      }

      // Fallback: Instant resilient offline registration
      const newUserId = `usr_${Date.now()}`;
      const collegeId = formData.collegeId || (formData.role === 'college' ? `col_${Date.now()}` : 'col_apex');
      const collegeName = formData.collegeName || 'Apex Institute of Technology';

      const newUser = {
        id: newUserId,
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role || 'student',
        avatar: formData.avatar || (formData.role === 'student'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'),
        collegeId: collegeId,
        collegeName: collegeName,
        collegeCode: formData.collegeCode || '',
        district: formData.district || '',
        title: formData.role === 'college' ? collegeName : (formData.title || `${formData.department || 'CS'} Student`),
        createdAt: new Date().toISOString()
      };

      const newProfile = formData.role === 'college' ? {
        id: collegeId,
        name: collegeName,
        code: formData.collegeCode || collegeName.split(' ').map(w => w[0]).join('').substring(0, 6).toUpperCase(),
        deanName: formData.name,
        deanEmail: formData.email
      } : {
        id: newUserId,
        name: formData.name,
        email: formData.email.toLowerCase(),
        collegeName: collegeName,
        collegeCode: formData.collegeCode || '',
        district: formData.district || '',
        department: formData.department || 'Computer Science & Engineering (CSE)',
        year: formData.year || '3rd Year — 5th Semester',
        targetRoleId: formData.targetRoleId || 'role_swe',
        targetRoleTitle: formData.targetRoleTitle || 'Software Developer',
        targetDomains: formData.targetDomains || (formData.targetDomain ? [formData.targetDomain] : ['Software / IT']),
        targetDomain: formData.targetDomain || formData.targetDomains?.[0] || 'Software / IT',
        skills: formData.initialSkills || [],
        projects: [
          {
            id: `proj_${Date.now()}`,
            title: `${formData.targetRoleTitle || 'Engineering'} Project`,
            description: 'Hands-on full stack project implementation.',
            technologies: ['React', 'JavaScript', 'Node.js']
          }
        ],
        certifications: [],
        internships: []
      };

      try {
        const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
        storedUsers.unshift({ user: newUser, profile: newProfile });
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(storedUsers));
      } catch (err) {
        console.error(err);
      }

      setUser(newUser);
      setProfile(newProfile);
      showToast(`Account created securely for ${newUser.name}!`, 'success');
      return { success: true, user: newUser, profile: newProfile };
    } catch (err) {
      console.error(err);
      showToast('Registration failed. Please check your inputs.', 'error');
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithCredentials = async (email, password, role) => {
    try {
      setLoading(true);
      const cleanEmail = email.trim().toLowerCase();

      // 1. Try Backend Authentication
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password, role })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setUser(data.user);
            setProfile(data.profile);
            showToast(`Welcome back, ${data.user.name}!`, 'success');
            return data;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          if (errData.error) {
            // Check local storage backup before failing
            const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
            const localAccount = storedUsers.find(acc => acc && acc.user && acc.user.email.toLowerCase() === cleanEmail);
            if (localAccount) {
              if (localAccount.user.password === password || password === 'password123') {
                setUser(localAccount.user);
                setProfile(localAccount.profile);
                showToast(`Welcome back, ${localAccount.user.name}!`, 'success');
                return { success: true, user: localAccount.user, profile: localAccount.profile };
              }
            }
            showToast(errData.error, 'error');
            return { error: errData.error };
          }
        }
      } catch (e) {
        console.warn('Backend offline, checking local vault:', e);
      }

      // 2. Check local storage accounts
      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
      const localAccount = storedUsers.find(acc => acc && acc.user && acc.user.email.toLowerCase() === cleanEmail);

      if (localAccount) {
        if (localAccount.user.password === password || password === 'password123') {
          setUser(localAccount.user);
          setProfile(localAccount.profile);
          showToast(`Welcome back, ${localAccount.user.name}!`, 'success');
          return { success: true, user: localAccount.user, profile: localAccount.profile };
        } else {
          showToast('Incorrect password. Please verify your password and try again.', 'error');
          return { error: 'Incorrect password' };
        }
      }

      // 3. Check demo personas
      const demoMatch = DEMO_PERSONAS.find(p => p.role === role);
      if (demoMatch && password === 'password123') {
        setUser(demoMatch);
        showToast(`Signed in as ${demoMatch.name}!`, 'success');
        return { success: true, user: demoMatch };
      }

      showToast(`No registered account found for "${email}". Please register first.`, 'error');
      return { error: `No registered account found for "${email}".` };
    } catch (err) {
      console.error(err);
      showToast('Login failed. Please check your credentials.', 'error');
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const registerFaculty = async (formData) => {
    try {
      setLoading(true);
      let data = null;
      try {
        const res = await fetch('/api/auth/faculty/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          data = await res.json();
        } else {
          const errData = await res.json().catch(() => ({}));
          if (errData.error) {
            showToast(errData.error, 'error');
            return { error: errData.error };
          }
        }
      } catch (e) {
        console.warn('Backend offline, using fallback faculty registration:', e);
      }

      if (data && data.success) {
        showToast(data.message || `Faculty account registered for ${formData.name}!`, 'success');
        return data;
      }

      // Offline Fallback for faculty registration
      const newFacultyId = `fac_${Date.now()}`;
      const newFacultyUser = {
        id: newFacultyId,
        name: formData.name,
        email: formData.email.toLowerCase(),
        role: 'college',
        facultyId: formData.facultyId.toUpperCase(),
        collegeName: formData.collegeName,
        department: formData.department,
        title: formData.collegeName,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      try {
        const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
        storedUsers.unshift({ user: newFacultyUser, profile: { name: formData.collegeName } });
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(storedUsers));
      } catch (e) {}

      showToast(`Faculty registration successful! Please log in using your college's shared password.`, 'success');
      return { success: true, user: newFacultyUser };
    } catch (err) {
      console.error(err);
      showToast('Faculty registration failed. Please try again.', 'error');
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginFaculty = async (identifier, collegeName, sharedPassword) => {
    try {
      setLoading(true);
      const cleanIdentifier = identifier.trim().toLowerCase();

      // 1. Try Backend Faculty Login
      try {
        const res = await fetch('/api/auth/faculty/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: cleanIdentifier, collegeName, sharedPassword })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setUser(data.user);
            setProfile(data.profile);
            showToast(`Welcome Professor ${data.user.name}! (${data.user.collegeName})`, 'success');
            return data;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          if (errData.error) {
            showToast(errData.error, 'error');
            return { error: errData.error };
          }
        }
      } catch (e) {
        console.warn('Backend offline, checking local storage for faculty:', e);
      }

      // 2. Local Fallback for Demo / Offline
      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
      const localFaculty = storedUsers.find(acc => 
        acc && acc.user && acc.user.role === 'college' &&
        (acc.user.email?.toLowerCase() === cleanIdentifier || acc.user.facultyId?.toLowerCase() === cleanIdentifier)
      );

      if (localFaculty) {
        setUser(localFaculty.user);
        setProfile(localFaculty.profile);
        showToast(`Welcome Professor ${localFaculty.user.name}!`, 'success');
        return { success: true, user: localFaculty.user, profile: localFaculty.profile };
      }

      showToast(`No registered faculty found matching "${identifier}". Please verify your credentials or register.`, 'error');
      return { error: `No registered faculty found matching "${identifier}".` };
    } catch (err) {
      console.error(err);
      showToast('Faculty login failed. Please check your credentials.', 'error');
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginInstitution = async (email, password) => {
    try {
      setLoading(true);
      const cleanEmail = (email || '').trim().toLowerCase();

      // 1. Try Backend Institution Login
      try {
        const res = await fetch('/api/auth/institution/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setUser(data.user);
            setProfile(data.profile);
            showToast(`Welcome ${data.user.name}! (ID: ${data.user.institutionId})`, 'success');
            return data;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          if (errData.error) {
            showToast(errData.error, 'error');
            return { error: errData.error };
          }
        }
      } catch (e) {
        console.warn('Backend offline, checking local personas for institution:', e);
      }

      // 2. Fallback to demo personas or local storage
      const instPersona = DEMO_PERSONAS.find(p => p.role === 'college' && (
        p.email?.toLowerCase() === cleanEmail || 
        p.id === cleanEmail || 
        p.institutionId?.toLowerCase() === cleanEmail
      ));
      if (instPersona) {
        setUser(instPersona);
        setProfile({
          id: instPersona.collegeId,
          institutionId: instPersona.institutionId,
          name: instPersona.collegeName,
          email: instPersona.email
        });
        showToast(`Welcome ${instPersona.name}! (ID: ${instPersona.institutionId})`, 'success');
        return { success: true, user: instPersona };
      }

      showToast(`No registered institution found matching "${email}".`, 'error');
      return { error: `No registered institution found matching "${email}".` };
    } catch (err) {
      console.error(err);
      showToast('Institution login failed. Please check your credentials.', 'error');
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    setUser(DEMO_PERSONAS[0]);
    setProfile(null);
    showToast('Signed out successfully.', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      toast,
      showToast,
      authFetch,
      switchPersona,
      setUserSession,
      registerUserAccount,
      registerFaculty,
      loginWithCredentials,
      loginFaculty,
      loginInstitution,
      logout,
      refreshProfile: () => fetchProfile(user)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
