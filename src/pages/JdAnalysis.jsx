import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function JdAnalysis() {
  const { resumeId } = useParams();
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tailored, setTailored] = useState(null);
  const [tailoring, setTailoring] = useState(false);
  const [tailorError, setTailorError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await api.analyzeJd(resumeId, jdText);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTailor = async () => {
  setTailoring(true);
  setTailorError('');
  try {
    const data = await api.tailorResume(resumeId, jdText, result.missingKeywords);
    setTailored(data);
    setSaved(false);
  } catch (err) {
    setTailorError(err.message || 'Tailoring failed');
  } finally {
    setTailoring(false);
  }
};

const handleSaveVersion = async () => {
  try {
    await api.saveVersion(resumeId, {
      summary: tailored.summary,
      skills: JSON.stringify(tailored.skills),
      experienceBullets: JSON.stringify(tailored.experienceBullets),
      jdText,
      atsScore: result.baseScore,
      label: `Tailored ${new Date().toLocaleDateString()}`,
    });
    setSaved(true);
  } catch (err) {
    setTailorError('Failed to save version');
  }
};

  return (
    <div className="bg-background min-h-screen px-margin-mobile py-stack-lg flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link to="/dashboard" className="text-on-surface-variant text-sm hover:text-primary">← Back to Dashboard</Link>

        <h2 className="font-headline text-3xl text-on-surface mt-4 mb-2">Analyze Job Description</h2>
        <p className="text-on-surface-variant mb-8">Paste a job description to see how your resume matches.</p>

        <div className="glass-panel rounded-2xl p-6">
          <textarea
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary"
            rows={8}
            placeholder="Paste the job description here..."
            value={jdText}
            onChange={e => setJdText(e.target.value)}
          />
          <button
            className="liquid-glass-primary px-6 py-3 rounded-full font-label mt-4 w-full disabled:opacity-50"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>

        {result && (
          <div className="glass-panel rounded-2xl p-8 mt-6 text-center">
            <p className="text-on-surface-variant text-sm uppercase tracking-widest mb-2">ATS Match Score</p>
            <p className="font-headline text-6xl text-primary">{result.baseScore}%</p>

            <div className="text-left mt-8">
              <p className="text-on-surface-variant text-sm uppercase tracking-widest mb-3">Missing Keywords</p>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.length === 0 ? (
                  <p className="text-green-400 text-sm">No major gaps found!</p>
                ) : (
                  result.missingKeywords.map((kw, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 text-on-surface-variant text-sm px-3 py-1 rounded-full">
                      {kw}
                    </span>
                  ))
                )}
              </div>
              <button
                className="liquid-glass-primary px-6 py-3 rounded-full font-label mt-8 w-full disabled:opacity-50"
                onClick={handleTailor}
                disabled={tailoring}
              >
                {tailoring ? 'Generating...' : 'Generate Tailored Version'}
              </button>
              {tailorError && <p className="text-red-400 text-sm mt-3">{tailorError}</p>}
            </div>
          </div>
        )}

        {tailored && (
          <div className="glass-panel rounded-2xl p-8 mt-6">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Tailored Version</p>

            <p className="text-on-surface-variant text-xs uppercase mb-1">Summary</p>
            <p className="text-on-surface mb-4">{tailored.summary}</p>

            <p className="text-on-surface-variant text-xs uppercase mb-1">Skills</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tailored.skills.map((s, i) => (
                <span key={i} className="bg-primary/10 border border-primary/30 text-primary text-sm px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>

            <p className="text-on-surface-variant text-xs uppercase mb-1">Experience</p>
            {tailored.experienceBullets.map((bullets, i) => (
              <ul key={i} className="list-disc list-inside text-on-surface mb-2">
                {bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            ))}

            <button
              className="liquid-glass-primary px-6 py-3 rounded-full font-label mt-4 w-full disabled:opacity-50"
              onClick={handleSaveVersion}
              disabled={saved}
            >
              {saved ? '✓ Saved' : 'Save This Version'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}