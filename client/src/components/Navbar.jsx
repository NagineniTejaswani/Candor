import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = ({ showBack, backLabel, backPath, showNewEntry, showLogout }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
      <h1
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="theme-accent text-2xl font-light tracking-widest italic cursor-pointer"
        onClick={() => navigate('/')}
      >
        Candor
      </h1>

      <div className="flex items-center gap-6">
        {/* Welcome message */}
        {user && showLogout && (
          <span className="text-xs theme-text-muted">
            welcome, <span className="theme-text-secondary">{user.name}</span>
          </span>
        )}

        {/* New entry button */}
        {showNewEntry && (
          <button
            onClick={() => navigate('/write')}
            className="px-5 py-2 rounded-full text-xs border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all"
          >
            + new entry
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="theme-text-muted hover:theme-text-secondarytransition-all text-sm"
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Back button */}
        {showBack && (
          <button
            onClick={() => navigate(backPath || '/dashboard')}
            className="text-xs theme-text-muted hover:theme-text-secondary transition-all"
          >
            ← {backLabel || 'back'}
          </button>
        )}

        {/* Logout */}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="text-xs theme-text-muted hover:theme-text-secondary transition-all"
          >
            log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;