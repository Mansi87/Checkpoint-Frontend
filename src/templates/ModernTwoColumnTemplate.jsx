export default function ModernTwoColumnTemplate({ data }) {
  return (
    <div className="bg-white text-black max-w-[800px] mx-auto font-sans text-sm flex min-h-[1000px]">
      <aside className="w-[280px] bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-gray-300 text-xs mb-6">
          {[data.email, data.phone, data.linkedin].filter(Boolean).join('\n')}
        </p>

        {data.skills.length > 0 && (
          <>
            <h2 className="font-bold uppercase text-xs tracking-wide mb-2 text-teal-400">Skills</h2>
            <div className="flex flex-col gap-1 mb-6">
              {data.skills.map((s, i) => <span key={i} className="text-gray-200 text-xs">{s}</span>)}
            </div>
          </>
        )}

        {data.education.length > 0 && (
          <>
            <h2 className="font-bold uppercase text-xs tracking-wide mb-2 text-teal-400">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-400">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </>
        )}
      </aside>

      <main className="flex-1 p-6">
        {data.summary && (
          <>
            <h2 className="font-bold uppercase text-xs tracking-wide border-b-2 border-gray-800 mb-2">Summary</h2>
            <p className="mb-4">{data.summary}</p>
          </>
        )}

        {data.experienceTitles.length > 0 && (
          <>
            <h2 className="font-bold uppercase text-xs tracking-wide border-b-2 border-gray-800 mb-2 mt-4">Experience</h2>
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

        {data.projectTitles.length > 0 && (
          <>
            <h2 className="font-bold uppercase text-xs tracking-wide border-b-2 border-gray-800 mb-2 mt-4">Projects</h2>
            {data.projectTitles.map((title, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{title}</p>
                <p className="text-xs">{data.projectDescriptions[i]}</p>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}