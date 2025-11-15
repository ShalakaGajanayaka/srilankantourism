import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tours', label: 'Tours', icon: '✈️' },
    { path: '/hotels', label: 'Hotels', icon: '🏨' },
    { path: '/transports', label: 'Transports', icon: '🚗' },
    { path: '/restaurants', label: 'Restaurants', icon: '🍽️' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/bookings', label: 'Bookings', icon: '📋' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">Sri Lanka Tourism</h2>
        <p className="sidebar-subtitle">Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-menu-item">
              <Link
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

