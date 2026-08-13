export default function CompactTemplate({ data }) {
  return (
    <div className="bg-white text-black p-6 max-w-[800px] mx-auto font-sans text-xs leading-snug">
      <h1 className="text-lg font-bold mb-0.5">{data.fullName || 'Your Name'}</h1>
      <p className="text-gray-700 mb-2">
        {[data.email, data.phone, data.linkedin].filter(Boolean).join(' | ')}
      </p>

      {data.summary && <p className="mb-2">{data.summary}</p>}

      {data.experienceTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-[10px] tracking-wide border-b border-gray-400 mb-1 mt-2">Experience</h2>
          {data.experienceTitles.map((exp, i) => (
            <div key={i} className="mb-1.5">
              <p className="font-semibold">{exp.title} — {exp.company} <span className="text-gray-600 font-normal">({exp.dates})</span></p>
              <ul className="list-disc list-inside">
                {(data.experienceBullets[i] || []).map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-[10px] tracking-wide border-b border-gray-400 mb-1 mt-2">Education</h2>
          {data.education.map((edu, i) => (
            <p key={i}>{edu.degree}, {edu.institution} — {edu.year}</p>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-[10px] tracking-wide border-b border-gray-400 mb-1 mt-2">Skills</h2>
          <p>{data.skills.join(', ')}</p>
        </>
      )}

      {data.projectTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-[10px] tracking-wide border-b border-gray-400 mb-1 mt-2">Projects</h2>
          {data.projectTitles.map((title, i) => (
            <p key={i}><span className="font-semibold">{title}:</span> {data.projectDescriptions[i]}</p>
          ))}
        </>
      )}
    </div>
  );
}