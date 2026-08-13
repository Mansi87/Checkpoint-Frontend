export default function ExecutiveTemplate({ data }) {
  return (
    <div className="bg-white text-black p-10 max-w-[800px] mx-auto font-sans text-sm leading-relaxed">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-gray-700 text-xs">
          {[data.email, data.phone, data.linkedin].filter(Boolean).join(' | ')}
        </p>
      </div>

      {data.summary && (
        <p className="mb-6 text-center italic text-gray-700">{data.summary}</p>
      )}

      {data.experienceTitles.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-sm tracking-wide mb-3">Professional Experience</h2>
          {data.experienceTitles.map((exp, i) => (
            <div key={i} className="mb-4 border-l-2 border-gray-800 pl-4">
              <div className="flex justify-between">
                <p className="font-semibold text-base">{exp.title}</p>
                <p className="text-gray-600 text-xs">{exp.dates}</p>
              </div>
              <p className="text-gray-700 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside">
                {(data.experienceBullets[i] || []).map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-sm tracking-wide mb-3 mt-6">Education</h2>
          {data.education.map((edu, i) => (
            <p key={i} className="mb-1">{edu.degree}, {edu.institution} — {edu.year}</p>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <h2 className="font-bold uppercase text-sm tracking-wide mb-3 mt-6">Core Competencies</h2>
          <p>{data.skills.join(' • ')}</p>
        </>
      )}
    </div>
  );
}