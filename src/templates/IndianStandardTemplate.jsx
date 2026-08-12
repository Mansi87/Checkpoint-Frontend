import { useState } from 'react';
import { api } from '../api/client';

export default function IndianStandardTemplate({ data, resumeId, onUpdate }) {
  const [biodata, setBiodata] = useState(data.biodata);
  const [photoUrl, setPhotoUrl] = useState(data.photoUrl);
  const [saving, setSaving] = useState(false);

  const updateBiodataField = (field, value) => {
    setBiodata(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const saveBiodataAndPhoto = async () => {
    setSaving(true);
    try {
      const currentStatic = {
        fullName: data.fullName, email: data.email, phone: data.phone, linkedin: data.linkedin,
        education: data.education, experienceTitles: data.experienceTitles, projectTitles: data.projectTitles,
        biodata, photoUrl,
      };
      await api.updateResume(resumeId, {
        title: data.title, staticFields: JSON.stringify(currentStatic),
        currentDynamicFields: JSON.stringify({
          summary: data.summary, skills: data.skills,
          experienceBullets: data.experienceBullets, projectDescriptions: data.projectDescriptions,
        }),
      });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white text-black p-10 max-w-[800px] mx-auto font-sans text-sm leading-relaxed">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
          <p className="text-gray-700">
            {[data.email, data.phone, data.linkedin].filter(Boolean).join(' | ')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="w-24 h-28 object-cover border border-gray-300" />
          ) : (
            <div className="w-24 h-28 border border-dashed border-gray-400 flex items-center justify-center text-gray-400 text-xs text-center">
              Add Photo
            </div>
          )}
          <label className="text-xs text-blue-600 cursor-pointer no-print">
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
      </div>

      {data.summary && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Objective</h2>
          <p className="mb-4">{data.summary}</p>
        </>
      )}

      {data.experienceTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Experience</h2>
          {data.experienceTitles.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{exp.title} — {exp.company}</p>
              <p className="text-gray-600 text-xs mb-1">{exp.dates}</p>
              <ul className="list-disc list-inside">
                {(data.experienceBullets[i] || []).map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Education</h2>
          {data.education.map((edu, i) => (
            <p key={i} className="mb-1">{edu.degree}, {edu.institution} — {edu.year}</p>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Skills</h2>
          <p className="mb-4">{data.skills.join(', ')}</p>
        </>
      )}

      <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Personal Information (Biodata)</h2>
      <div className="grid grid-cols-2 gap-2 mb-2 no-print">
        <input className="border border-gray-300 p-2 text-xs" placeholder="Date of Birth" value={biodata.dob} onChange={e => updateBiodataField('dob', e.target.value)} />
        <input className="border border-gray-300 p-2 text-xs" placeholder="Gender" value={biodata.gender} onChange={e => updateBiodataField('gender', e.target.value)} />
        <input className="border border-gray-300 p-2 text-xs" placeholder="Marital Status" value={biodata.maritalStatus} onChange={e => updateBiodataField('maritalStatus', e.target.value)} />
        <input className="border border-gray-300 p-2 text-xs" placeholder="Nationality" value={biodata.nationality} onChange={e => updateBiodataField('nationality', e.target.value)} />
      </div>
      <button onClick={saveBiodataAndPhoto} disabled={saving} className="no-print bg-blue-600 text-white text-xs px-4 py-2 rounded mt-2">
        {saving ? 'Saving...' : 'Save Biodata & Photo'}
      </button>

      <p className="mt-6 text-xs text-gray-600">Declaration: The information stated above is true to the best of my knowledge and belief.</p>
    </div>
  );
}