import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import TagInput from '../components/TagInput';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Clean single-column, ATS-friendly' },
  { id: 'classic', name: 'Classic', desc: 'Traditional two-column layout' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', linkedin: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ title: '', company: '', dates: '', bullets: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
    summary: '',
    templateId: 'modern',
    title: '',
  });

  const totalSteps = 6;

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const updateArrayField = (field, index, key, value) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field, emptyItem) => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], emptyItem] }));
  };

  const handleSubmit = async () => {
  const staticFields = JSON.stringify({
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    linkedin: form.linkedin,
    education: form.education,
    experienceTitles: form.experience.map(e => ({ title: e.title, company: e.company, dates: e.dates })),
    projectTitles: form.projects.map(p => p.title),
  });

  const currentDynamicFields = JSON.stringify({
    summary: form.summary,
    skills: form.skills,
    experienceBullets: form.experience.map(e => e.bullets),
    projectDescriptions: form.projects.map(p => p.description),
  });

  try {
    await api.createResume({
      title: form.title || 'My Base Resume',
      templateId: form.templateId,
      staticFields,
      currentDynamicFields,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    alert('Failed to create resume: ' + err.message);
  }
};

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i < step ? 'bg-primary' : 'bg-white/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-stack-md">
            <h2 className="font-headline text-2xl text-on-surface mb-2">Personal Info</h2>
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Full Name" value={form.fullName} onChange={e => updateField('fullName', e.target.value)} />
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Email" value={form.email} onChange={e => updateField('email', e.target.value)} />
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Phone" value={form.phone} onChange={e => updateField('phone', e.target.value)} />
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="LinkedIn URL" value={form.linkedin} onChange={e => updateField('linkedin', e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-stack-md">
            <h2 className="font-headline text-2xl text-on-surface mb-2">Education</h2>
            {form.education.map((edu, i) => (
              <div key={i} className="flex flex-col gap-2 border border-white/10 rounded-lg p-4">
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Institution" value={edu.institution} onChange={e => updateArrayField('education', i, 'institution', e.target.value)} />
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Degree" value={edu.degree} onChange={e => updateArrayField('education', i, 'degree', e.target.value)} />
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Year (e.g. 2022-2026)" value={edu.year} onChange={e => updateArrayField('education', i, 'year', e.target.value)} />
              </div>
            ))}
            <button className="text-primary font-label text-sm text-left" onClick={() => addArrayItem('education', { institution: '', degree: '', year: '' })}>+ Add another</button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-stack-md">
            <h2 className="font-headline text-2xl text-on-surface mb-2">Experience</h2>
            {form.experience.map((exp, i) => (
              <div key={i} className="flex flex-col gap-2 border border-white/10 rounded-lg p-4">
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Job Title" value={exp.title} onChange={e => updateArrayField('experience', i, 'title', e.target.value)} />
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Company" value={exp.company} onChange={e => updateArrayField('experience', i, 'company', e.target.value)} />
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Dates (e.g. Jun 2024 - Aug 2024)" value={exp.dates} onChange={e => updateArrayField('experience', i, 'dates', e.target.value)} />
                <textarea className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Bullet points (one per line)" rows={3} value={exp.bullets} onChange={e => updateArrayField('experience', i, 'bullets', e.target.value)} />
              </div>
            ))}
            <button className="text-primary font-label text-sm text-left" onClick={() => addArrayItem('experience', { title: '', company: '', dates: '', bullets: '' })}>+ Add another</button>
          </div>
        )}

        {step === 4 && (
  <div className="flex flex-col gap-stack-md">
    <h2 className="font-headline text-2xl text-on-surface mb-2">Skills</h2>
    <TagInput tags={form.skills} setTags={(tags) => updateField('skills', tags)} />
  </div>
)}

        {step === 5 && (
          <div className="flex flex-col gap-stack-md">
            <h2 className="font-headline text-2xl text-on-surface mb-2">Projects</h2>
            {form.projects.map((proj, i) => (
              <div key={i} className="flex flex-col gap-2 border border-white/10 rounded-lg p-4">
                <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Project Title" value={proj.title} onChange={e => updateArrayField('projects', i, 'title', e.target.value)} />
                <textarea className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Description" rows={3} value={proj.description} onChange={e => updateArrayField('projects', i, 'description', e.target.value)} />
              </div>
            ))}
            <button className="text-primary font-label text-sm text-left" onClick={() => addArrayItem('projects', { title: '', description: '' })}>+ Add another</button>
            <textarea className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary mt-4" placeholder="Resume summary/objective (2-3 lines)" rows={3} value={form.summary} onChange={e => updateField('summary', e.target.value)} />
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col gap-stack-md">
            <h2 className="font-headline text-2xl text-on-surface mb-2">Choose a Template</h2>
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary mb-2" placeholder="Name this resume (e.g. 'Backend Dev Track')" value={form.title} onChange={e => updateField('title', e.target.value)} />
            <div className="grid grid-cols-2 gap-stack-md">
              {TEMPLATES.map(t => (
                <div key={t.id} onClick={() => updateField('templateId', t.id)}
                  className={`glass-panel rounded-xl p-6 cursor-pointer transition-all ${form.templateId === t.id ? 'border-primary' : ''}`}>
                  <h3 className="font-body font-semibold text-on-surface">{t.name}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button
            className="glass-button-secondary px-6 py-2 rounded-full font-label disabled:opacity-30"
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
          >
            Back
          </button>
          {step < totalSteps ? (
            <button className="liquid-glass-primary px-6 py-2 rounded-full font-label" onClick={() => setStep(s => s + 1)}>
              Next
            </button>
          ) : (
            <button className="liquid-glass-primary px-6 py-2 rounded-full font-label" onClick={handleSubmit}>
              Create Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
}