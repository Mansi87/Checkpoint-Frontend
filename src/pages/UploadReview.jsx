import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function UploadReview() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [fields, setFields] = useState({ fullName: '', email: '', phone: '', linkedin: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const result = await api.parseUpload(file);
      setParsed(result);
      setFields(result.extractedFields);
    } catch (err) {
      setError('Could not parse this file. Try a different PDF/DOCX.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => setFields(prev => ({ ...prev, [key]: value }));

  const handleContinue = () => {
    // Fields get passed to onboarding, pre-filled — user completes the rest there
    navigate('/onboarding', { state: { prefill: fields, sections: parsed.sections } });
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-xl">
        <Link to="/onboarding" className="text-on-surface-variant text-sm hover:text-primary">← Fill manually instead</Link>
        <h2 className="font-headline text-3xl text-on-surface mt-4 mb-2">Upload Your Resume</h2>
        <p className="text-on-surface-variant mb-6">We'll extract what we can — you confirm the rest.</p>

        {!parsed && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <label className="liquid-glass-primary px-5 py-2.5 rounded-full font-label text-sm cursor-pointer whitespace-nowrap">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={e => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <span className="text-on-surface-variant text-sm truncate">
                {file ? file.name : 'No file chosen'}
              </span>
            </div>
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="liquid-glass-primary px-6 py-3 rounded-full font-label w-full disabled:opacity-50"
            >
              {loading ? 'Parsing...' : 'Upload & Scan'}
            </button>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </>
        )}

        {parsed && (
          <>
            {parsed.completenessFlags.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                <p className="text-amber-400 text-sm font-semibold mb-2">A few things to double-check:</p>
                <ul className="text-amber-300 text-sm list-disc list-inside">
                  {parsed.completenessFlags.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {['fullName', 'email', 'phone', 'linkedin'].map(key => (
                <div key={key}>
                  <label className="text-on-surface-variant text-xs uppercase">{key}</label>
                  <input
                    className="bg-black/40 border border-white/10 rounded-lg p-3 w-full text-on-surface focus:outline-none focus:border-primary mt-1"
                    value={fields[key] || ''}
                    onChange={e => updateField(key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              className="liquid-glass-primary px-6 py-3 rounded-full font-label w-full mt-6"
            >
              Looks Good — Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}