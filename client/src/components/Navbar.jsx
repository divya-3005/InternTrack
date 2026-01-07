import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      borderBottom: '1px solid var(--border)', 
      padding: '1rem 0',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            padding: '8px', 
            borderRadius: '8px',
            display: 'flex'
          }}>
            <Briefcase size={24} color="white" />
          </div>
          InternTrack
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <>
              <span style={{ color: 'var(--text-muted)' }}>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '8px 16px' }}>
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
