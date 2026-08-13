export function parseResumeData(resume) {
  let staticFields = {};
  let dynamicFields = {};

  try {
    staticFields = resume.staticFields ? JSON.parse(resume.staticFields) : {};
  } catch {}
  try {
    dynamicFields = resume.currentDynamicFields ? JSON.parse(resume.currentDynamicFields) : {};
  } catch {}

  const rawBullets = dynamicFields.experienceBullets || [];
  const experienceBullets = rawBullets.map(b =>
    Array.isArray(b) ? b : (typeof b === 'string' ? b.split('\n').filter(line => line.trim()) : [])
  );

  const rawSkills = dynamicFields.skills;
  const skills = Array.isArray(rawSkills)
    ? rawSkills
    : (typeof rawSkills === 'string' ? rawSkills.split(',').map(s => s.trim()).filter(Boolean) : []);

  return {
    fullName: staticFields.fullName || '',
    email: staticFields.email || '',
    phone: staticFields.phone || '',
    linkedin: staticFields.linkedin || '',
    education: staticFields.education || [],
    experienceTitles: staticFields.experienceTitles || [],
    projectTitles: staticFields.projectTitles || [],
    biodata: staticFields.biodata || { dob: '', gender: '', maritalStatus: '', nationality: '' },
    photoUrl: staticFields.photoUrl || '',
    summary: dynamicFields.summary || '',
    skills,
    experienceBullets,
    projectDescriptions: dynamicFields.projectDescriptions || [],
  };
}