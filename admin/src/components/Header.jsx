import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="page-title">Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="header-user">
          <span className="user-name">Admin User</span>
          <div className="user-avatar">A</div>
        </div>
        <Link to="/login" className="logout-btn">
          Logout
        </Link>
      </div>
    </header>
  );
}

export default Header;

