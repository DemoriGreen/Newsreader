import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserSavedArticles } = useArticles();
  const { user, logout, isAdmin } = useAuth();
  const savedCount = getUserSavedArticles().length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>Search</Link>
            {user && (
              <Link to="/saved" className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}>
                Saved Articles ({savedCount})
              </Link>
            )}
            {isAdmin() && (
              <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="nav-user">
          {user ? (
            <>
              <span>{user.username}</span>
              <button type="button" className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;