import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';

const RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One digit', test: (p) => /\d/.test(p) },
  { label: 'One special character', test: (p) => /[@$!%*?&#^()_+=\-]/.test(p) },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', status: 'student',
  });
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const passwordValid = RULES.every(r => r.test(form.password));
  const passwordsMatch = form.password && form.password === form.confirmPassword;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordValid) {
      setError('Password does not meet all requirements.');
      triggerShake();
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      triggerShake();
      return;
    }

    try {
      const data = await api.signup(form.firstName, form.lastName, form.email, form.password, form.status);
      localStorage.setItem('token', data.token);
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      triggerShake();
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className={`glass-panel rounded-3xl p-8 md:p-12 w-full max-w-md ${shake ? 'animate-shake' : ''}`}>
        <h2 className="font-headline text-3xl text-on-surface mb-2 text-center">Create Account</h2>
        <p className="text-on-surface-variant text-center mb-8">Let's get started.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div className="grid grid-cols-2 gap-3">
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="First Name" value={form.firstName} onChange={e => update('firstName', e.target.value)} required />
            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Last Name" value={form.lastName} onChange={e => update('lastName', e.target.value)} required />
          </div>

          <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" type="email" placeholder="Email" value={form.email} onChange={e => update('email', e.target.value)} required />

          <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" type="password" placeholder="Password" value={form.password} onChange={e => update('password', e.target.value)} required />

          {form.password.length > 0 && (
            <div className="flex flex-col gap-1 -mt-2">
              {RULES.map((r, i) => {
                const passed = r.test(form.password);
                return (
                  <p key={i} className={`text-xs flex items-center gap-2 ${passed ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{passed ? '✓' : '✕'}</span> {r.label}
                  </p>
                );
              })}
            </div>
          )}

          <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />

          {form.confirmPassword.length > 0 && (
            <p className={`text-xs -mt-2 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
              {passwordsMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
            </p>
          )}

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-on-surface-variant text-sm">
              <input type="radio" name="status" checked={form.status === 'student'} onChange={() => update('status', 'student')} />
              Student
            </label>
            <label className="flex items-center gap-2 text-on-surface-variant text-sm">
              <input type="radio" name="status" checked={form.status === 'working'} onChange={() => update('status', 'working')} />
              Working Professional
            </label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="liquid-glass-primary px-6 py-3 rounded-full font-label mt-2">
            Create Account
          </button>
        </form>

        <p className="text-on-surface-variant text-center mt-6 text-sm">
          Already have an account? <Link className="text-primary" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}