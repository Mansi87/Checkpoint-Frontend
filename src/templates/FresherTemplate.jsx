export default function FresherTemplate({ data }) {
  return (
    <div className="bg-white text-black p-10 max-w-[800px] mx-auto font-sans text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
      <p className="text-gray-700 mb-4">
        {[data.email, data.phone, data.linkedin].filter(Boolean).join(' | ')}
      </p>

      {data.summary && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">About Me</h2>
          <p className="mb-4">{data.summary}</p>
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
          <p>{data.skills.join(', ')}</p>
        </>
      )}

      {data.projectTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Projects</h2>
          {data.projectTitles.map((title, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{title}</p>
              <p>{data.projectDescriptions[i]}</p>
            </div>
          ))}
        </>
      )}

      {data.experienceTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-xs tracking-wide border-b border-gray-400 mb-2 mt-4">Internships / Experience</h2>
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
    </div>
  );
}