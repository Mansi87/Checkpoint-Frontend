import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectAfterAuth = async () => {
    try {
      const resumes = await api.getResumes();
      navigate(resumes.length === 0 ? '/onboarding' : '/dashboard');
    } catch {
      navigate('/onboarding');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.login(email, password);
      localStorage.setItem('token', data.token);
      await redirectAfterAuth();
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await api.googleLogin(credentialResponse.credential);
      localStorage.setItem('token', data.token);
      await redirectAfterAuth();
    } catch (err) {
      setError('Google sign-in failed');
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-margin-mobile">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-md">
        <h2 className="font-headline text-3xl text-on-surface mb-2 text-center">Welcome Back</h2>
        <p className="text-on-surface-variant text-center mb-8">Sign in to Checkpoint.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="liquid-glass-primary px-6 py-3 rounded-full font-label mt-2">
            Log In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-on-surface-variant text-xs">OR</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in failed')} theme="filled_black" />
        </div>

        <p className="text-on-surface-variant text-center mt-6 text-sm">
          Don't have an account? <Link className="text-primary" to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}