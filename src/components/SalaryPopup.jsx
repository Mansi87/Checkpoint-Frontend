import { useState } from 'react';
import { api } from '../api/client';

export default function SalaryPopup({ onClose }) {
  const [working, setWorking] = useState(null);
  const [level, setLevel] = useState('fresher');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [ctc, setCtc] = useState('');

  const handleSkip = async () => {
    await api.salarySkip().catch(() => {});
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await api.salarySubmit({ role, experienceLevel: level, city, ctcLpa: parseFloat(ctc) });
      onClose();
    } catch {
      onClose();
    }
  };

  if (working === false) {
    handleSkip();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-margin-mobile">
      <div className="glass-panel rounded-2xl p-6 max-w-sm w-full">
        <p className="text-on-surface font-semibold mb-1">Help others with salary data?</p>
        <p className="text-on-surface-variant text-sm mb-4">Anonymous, takes 15 seconds.</p>

        {working === null && (
          <>
            <p className="text-on-surface-variant text-sm mb-2">Have you started working yet?</p>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setWorking(true)} className="flex-1 liquid-glass-primary py-2 rounded-lg font-label text-sm">Yes, working</button>
              <button onClick={handleSkip} className="flex-1 border border-white/10 text-on-surface-variant py-2 rounded-lg font-label text-sm">Still hunting</button>
            </div>
          </>
        )}

        {working === true && (
          <>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setLevel('fresher')} className={`flex-1 py-2 rounded-lg font-label text-sm ${level === 'fresher' ? 'liquid-glass-primary' : 'border border-white/10 text-on-surface-variant'}`}>Fresher</button>
              <button onClick={() => setLevel('experienced')} className={`flex-1 py-2 rounded-lg font-label text-sm ${level === 'experienced' ? 'liquid-glass-primary' : 'border border-white/10 text-on-surface-variant'}`}>Experienced</button>
            </div>
            <input className="bg-black/40 border border-white/10 rounded-lg p-2 w-full text-on-surface text-sm mb-2" placeholder="Role e.g. Backend Developer" value={role} onChange={e => setRole(e.target.value)} />
            <div className="flex gap-2 mb-4">
              <input className="bg-black/40 border border-white/10 rounded-lg p-2 flex-1 text-on-surface text-sm" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              <input className="bg-black/40 border border-white/10 rounded-lg p-2 flex-1 text-on-surface text-sm" placeholder="CTC (LPA)" type="number" value={ctc} onChange={e => setCtc(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSkip} className="flex-1 border border-white/10 text-on-surface-variant py-2 rounded-lg font-label text-sm">Skip</button>
              <button onClick={handleSubmit} className="flex-1 liquid-glass-primary py-2 rounded-lg font-label text-sm">Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}