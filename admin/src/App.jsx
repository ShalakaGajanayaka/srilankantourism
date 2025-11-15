import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* TODO: Add more admin routes */}
        {/* <Route path="tours" element={<Tours />} /> */}
        {/* <Route path="hotels" element={<Hotels />} /> */}
        {/* <Route path="transports" element={<Transports />} /> */}
        {/* <Route path="restaurants" element={<Restaurants />} /> */}
        {/* <Route path="users" element={<Users />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

