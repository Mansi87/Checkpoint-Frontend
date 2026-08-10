import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function VersionHistory() {
  const { resumeId } = useParams();
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    api.getVersions(resumeId).then(setVersions).catch(() => setVersions([]));
  }, [resumeId]);

  return (
    <div className="bg-background min-h-screen px-margin-mobile py-stack-lg flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link to="/dashboard" className="text-on-surface-variant text-sm hover:text-primary">← Back to Dashboard</Link>
        <h2 className="font-headline text-3xl text-on-surface mt-4 mb-8">Version History</h2>

        {versions.length === 0 ? (
          <p className="text-on-surface-variant">No versions saved yet.</p>
        ) : (
          <div className="space-y-4">
            {versions.map((v, i) => (
              <div key={v.id} className="glass-panel rounded-xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-on-surface font-semibold">{v.label || `Version ${versions.length - i}`}</p>
                  <p className="text-on-surface-variant text-sm">{new Date(v.createdAt).toLocaleString()}</p>
                </div>
                {v.atsScore != null && (
                  <span className="bg-primary/10 border border-primary/30 text-primary text-sm px-3 py-1 rounded-full">
                    {v.atsScore}%
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}