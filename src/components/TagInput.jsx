import { useState } from 'react';

const SUGGESTIONS = [
  // Languages
  'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C', 'C#', 'Go', 'Rust',
  'Kotlin', 'Swift', 'PHP', 'Ruby', 'Scala', 'R', 'MATLAB', 'Dart',

  // Frontend
  'React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'Tailwind CSS',
  'Bootstrap', 'SASS', 'Redux', 'jQuery', 'Webpack', 'Vite', 'Three.js', 'D3.js',

  // Backend
  'Spring Boot', 'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Ruby on Rails',
  '.NET', 'ASP.NET', 'NestJS', 'GraphQL', 'REST API', 'gRPC', 'WebSockets',

  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Cassandra',
  'DynamoDB', 'Firebase', 'Supabase', 'Elasticsearch', 'Neo4j',

  // DevOps / Cloud
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Jenkins',
  'GitHub Actions', 'Terraform', 'Ansible', 'Nginx', 'Linux', 'Bash Scripting',
  'Prometheus', 'Grafana',

  // Mobile
  'React Native', 'Flutter', 'Android Development', 'iOS Development', 'SwiftUI',
  'Jetpack Compose', 'Xamarin',

  // Data / ML / AI
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
  'Pandas', 'NumPy', 'Data Analysis', 'Data Visualization', 'NLP', 'Computer Vision',
  'Neural Networks', 'LLMs', 'Prompt Engineering', 'Tableau', 'Power BI', 'Apache Spark',
  'Hadoop', 'ETL Pipelines',

  // Testing / QA
  'Unit Testing', 'JUnit', 'Selenium', 'Cypress', 'Jest', 'Postman', 'TestNG',
  'Test-Driven Development',

  // Tools & Platforms
  'Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'VS Code', 'IntelliJ IDEA',
  'Slack', 'Notion', 'Confluence',

  // Core CS / Concepts
  'Data Structures', 'Algorithms', 'System Design', 'Microservices',
  'Object-Oriented Programming', 'Design Patterns', 'Operating Systems',
  'Computer Networks', 'Database Design', 'Distributed Systems', 'Multithreading',
  'Cryptography', 'Software Architecture',

  // Security
  'Cybersecurity', 'Penetration Testing', 'OAuth', 'JWT', 'Network Security',

  // Blockchain / Emerging
  'Blockchain', 'Solidity', 'Web3', 'Smart Contracts',

  // Soft/Product-adjacent (still resume-relevant for tech roles)
  'Agile', 'Scrum', 'Product Management', 'Technical Writing', 'Team Leadership',
  'Cross-functional Collaboration', 'Code Review', 'Mentoring',
];

export default function TagInput({ tags, setTags }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = SUGGESTIONS.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  ).slice(0, 6);

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) addTag(input);
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 bg-black/40 border border-white/10 rounded-lg p-3 focus-within:border-primary transition-all">
        {tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 bg-primary/10 border border-primary/30 text-primary text-sm px-3 py-1 rounded-full">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-white">✕</button>
          </span>
        ))}
        <input
          className="bg-transparent flex-1 min-w-[120px] text-on-surface focus:outline-none"
          placeholder={tags.length === 0 ? 'Type a skill and press Enter...' : ''}
          value={input}
          onChange={e => { setInput(e.target.value); setShowSuggestions(true); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
      </div>

      {showSuggestions && input && filtered.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-surface-container-high border border-white/10 rounded-lg overflow-hidden">
          {filtered.map((s, i) => (
            <button
              key={i}
              type="button"
              className="block w-full text-left px-4 py-2 text-on-surface hover:bg-primary/10 hover:text-primary text-sm"
              onClick={() => addTag(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}