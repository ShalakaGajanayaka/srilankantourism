import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userName = user?.name || 'Admin';
  const userEmail = user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="page-title">Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="header-user">
          <span className="user-name">{userName}</span>
          {userEmail && <span className="user-email" style={{ fontSize: '12px', color: '#666' }}>{userEmail}</span>}
          <div className="user-avatar">{userInitial}</div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;

