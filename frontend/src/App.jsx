import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TourList from './pages/TourList';
import HotelList from './pages/HotelList';
import Destination from './pages/Destination';
import TransportsList from './pages/TransportsList';
import RestaurantList from './pages/RestaurantList';
import News from './pages/News';
import Faq from './pages/Faq';
import Dashboard from './pages/Dashboard';
import TourCart from './pages/TourCart';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsCondition from './pages/TermsCondition';
import DetailsWithSlider from './pages/DetailsWithSlider';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tour-list" element={<TourList />} />
          <Route path="/hotel-list" element={<HotelList />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/transports-list" element={<TransportsList />} />
          <Route path="/restaurant-list" element={<RestaurantList />} />
          <Route path="/news" element={<News />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tour-cart" element={<TourCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/details-with-slider" element={<DetailsWithSlider />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
