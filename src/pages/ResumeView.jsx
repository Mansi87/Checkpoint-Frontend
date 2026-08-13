import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { parseResumeData } from '../utils/parseResumeData';
import { TEMPLATE_COMPONENTS } from '../templates';

export default function ResumeView() {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadResume = () => {
    api.getResume(resumeId).then(setResume).catch(() => setResume(null)).finally(() => setLoading(false));
  };

  useEffect(() => { loadResume(); }, [resumeId]);

  if (loading) return <div className="bg-background min-h-screen flex items-center justify-center text-on-surface">Loading...</div>;
  if (!resume) return <div className="bg-background min-h-screen flex items-center justify-center text-on-surface">Resume not found</div>;

  const data = parseResumeData(resume);
  const TemplateComponent = TEMPLATE_COMPONENTS[resume.templateId] || TEMPLATE_COMPONENTS['ats-minimal'];

  return (
    <div className="bg-background min-h-screen py-stack-lg px-margin-mobile">
      <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center no-print">
        <Link to="/dashboard" className="text-on-surface-variant text-sm hover:text-primary">← Back to Dashboard</Link>
        <button onClick={() => window.print()} className="liquid-glass-primary px-6 py-2 rounded-full font-label text-sm">
          Download / Print
        </button>
      </div>

      <div className="shadow-2xl">
        <TemplateComponent data={{ ...data, title: resume.title }} resumeId={resumeId} onUpdate={loadResume} />
      </div>
    </div>
  );
}