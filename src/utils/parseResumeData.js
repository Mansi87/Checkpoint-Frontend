export function parseResumeData(resume) {
  let staticFields = {};
  let dynamicFields = {};

  try {
    staticFields = resume.staticFields ? JSON.parse(resume.staticFields) : {};
  } catch {}
  try {
    dynamicFields = resume.currentDynamicFields ? JSON.parse(resume.currentDynamicFields) : {};
  } catch {}

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
    skills: dynamicFields.skills || [],
    experienceBullets: dynamicFields.experienceBullets || [],
    projectDescriptions: dynamicFields.projectDescriptions || [],
  };
}