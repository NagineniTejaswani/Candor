import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import API from '../api/axios.js';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/auth/signup', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#c9a96e] text-4xl font-light tracking-widest italic mb-2"
          >
            Candor
          </h1>
          <p className="text-[#555] text-xs">your private space to feel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] tracking-[0.15em] text-[#666] uppercase block mb-2">
              your name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="what should we call you?"
              className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#e8e4de] placeholder-[#444] focus:outline-none focus:border-[#c9a96e]/40 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.15em] text-[#666] uppercase block mb-2">
              email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#e8e4de] placeholder-[#444] focus:outline-none focus:border-[#c9a96e]/40 transition-all"
            />
          </div>

          <div>
  <label className="text-[10px] tracking-[0.15em] text-[#666] uppercase block mb-2">
    password
  </label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={form.password}
      onChange={handleChange}
      required
      placeholder="••••••••"
      className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#e8e4de] placeholder-[#444] focus:outline-none focus:border-[#c9a96e]/40 transition-all pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-all"
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  </div>
</div>

          {/* Error */}
          {error && (
            <p className="text-[#E24B4A] text-xs text-center py-2 px-3 bg-[#E24B4A]/8 rounded-lg border border-[#E24B4A]/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'creating your space...' : 'begin →'}
          </button>
        </form>

        {/* Privacy note */}
        <p className="text-center text-[10px] text-[#333] mt-6 leading-relaxed">
          your entries are private.<br />no one reads them but you and candor.
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-[#444] mt-6">
          already have an account?{' '}
          <Link to="/login" className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-all">
            Login
          </Link>
        </p>

        <p className="text-center mt-6">
          <Link to="/" className="text-[10px] text-[#333] hover:text-[#555] transition-all">
            ← back to candor
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;