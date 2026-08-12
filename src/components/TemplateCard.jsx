export default function TemplateCard({ template, selected, onSelect }) {
  const isAtsSafe = template.badge === 'ats-safe';

  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`group relative glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all ${
        selected ? 'border-primary ring-2 ring-primary/30' : ''
      }`}
    >
      {/* Preview area - swapped for real thumbnails in Part 2/3 */}
      <div className="h-48 bg-surface-container-high flex items-center justify-center relative">
        <span className="text-on-surface-variant text-sm">Preview</span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="liquid-glass-primary px-6 py-2 rounded-full font-label text-sm">
            {selected ? '✓ Selected' : 'Use this template'}
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-body font-semibold text-on-surface">{template.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isAtsSafe
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isAtsSafe ? 'ATS-Safe ✓' : 'Visual'}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm mb-1">{template.description}</p>
        <p className="text-primary text-xs">{template.tag}</p>
      </div>
    </div>
  );
}