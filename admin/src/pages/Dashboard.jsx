function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome to the Admin Panel</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">✈️</div>
          <div className="stat-info">
            <h3>Tours</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-info">
            <h3>Hotels</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <h3>Transports</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <h3>Restaurants</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="content-card">
          <h3>Recent Activity</h3>
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

