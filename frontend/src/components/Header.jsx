import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    return localStorage.theme || 'light';
  });

  // Function to update theme icons
  const updateThemeIcons = (currentTheme) => {
    const themeButtons = document.querySelectorAll('.ToggleThemeButton i');
    themeButtons.forEach(icon => {
      if (currentTheme === 'dark') {
        icon.className = 'ri-moon-line';
      } else {
        icon.className = 'ri-sun-line';
      }
    });
  };

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.theme || 'light';
    document.documentElement.dataset.theme = savedTheme;
    setTheme(savedTheme);
    updateThemeIcons(savedTheme);

    // Theme toggle functionality
    const themeButtons = document.querySelectorAll('.ToggleThemeButton');
    const handleThemeToggle = () => {
      const currentTheme = localStorage.theme || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = newTheme;
      localStorage.theme = newTheme;
      setTheme(newTheme);
      updateThemeIcons(newTheme);
    };

    themeButtons.forEach(button => {
      button.addEventListener('click', handleThemeToggle);
    });

    return () => {
      themeButtons.forEach(button => {
        button.removeEventListener('click', handleThemeToggle);
      });
    };
  }, []);

  // Search functionality
  useEffect(() => {
    const handleCloseSearch = () => {
      setIsSearchOpen(false);
      document.body.classList.remove('no-scroll');
    };

    const handleKeyDown = (event) => {
      // ESC key to close search
      if (event.key === 'Escape' && isSearchOpen) {
        handleCloseSearch();
      }
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (!isSearchOpen) {
          setIsSearchOpen(true);
          document.body.classList.add('no-scroll');
        }
      }
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <header className="header-area-three">
      <div className="main-header">
        {/* Header Top */}
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="top-menu-wrapper d-flex align-items-center justify-content-between">
                  <div className="top-header-right">
                    <div className="contact-section">
                      <div className="circle-primary-sm">
                        <i className="ri-phone-line"></i>
                      </div>
                      <div className="info">
                        <p className="pera">Call Anytime</p>
                        <h4 className="title">
                          <a href="tel:+94112345678">+94 11 234 5678</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  {/* Logo */}
                  <div className="logo">
                    <Link to="/">
                      <img src="/assets/images/logo/logo.png" alt="logo" className="changeLogo" />
                    </Link>
                  </div>
                  <div className="header-right-three pl-15 d-none d-lg-flex">
                    <div className="lang">
                      <i className="ri-global-line"></i>
                      <p className="pera">English</p>
                    </div>
                    <div className="divider gradient-divider"></div>
                    <div className="d-flex gap-20 align-items-center">
                      <Link to="/tour-cart" className="cart signin">
                        <i className="ri-shopping-cart-line"></i>
                      </Link>
                      <div className="sign-btn">
                        <Link to="/register" className="btn-secondary-sm radius-30">Sign Up</Link>
                      </div>
                      {/* Theme Mode */}
                      <button className="ToggleThemeButton change-theme-mode m-0 p-0 border-0">
                        <i className={theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'}></i>
                      </button>
                    </div>
                  </div>
                  {/* Mobile Device Search & Theme Mode */}
                  <div className="search-header-position d-block d-lg-none">
                    <div className="d-flex gap-15">
                      <div className="search-bar" style={{ cursor: 'pointer' }} onClick={() => setIsSearchOpen(true)}>
                        <a href="javascript:void(0)" className="rounded-btn" onClick={(e) => { e.preventDefault(); setIsSearchOpen(true); }}>
                          <i className="ri-search-line"></i>
                        </a>
                      </div>
                      {/* Theme Mode */}
                      <button className="ToggleThemeButton change-theme-mode m-0 p-0 border-0">
                        <i className={theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Bottom */}
        <div className="header-bottom header-sticky">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="menu-wrapper">
                  {/* Main-menu for desktop */}
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <div className="d-flex justify-content-between align-items-center">
                        <ul className="listing" id="navigation">
                          <li className="single-list">
                            <Link to="/" className="single link-active">
                              Home 
                            </Link>
                            {/* <ul className="submenu">
                              <li className="single-list">
                                <Link to="/" className="single">Home 01</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/index-two" className="single">Home 02</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/index-three" className="single">Home 03</Link>
                              </li>
                            </ul> */}
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Tours 
                            </a>
                            {/* <ul className="submenu">
                              <li className="single-list">
                                <Link to="/tour-list" className="single">Tour Category Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/top-filter-tour-list" className="single">Tour Top Filter Category</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/destination" className="single">Tour destination</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/details-with-gallery" className="single">Details With Gallery</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/details-with-slider" className="single">Details With slider</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/tour-cart-page" className="single">Cart Tour Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/tour-booking-payment" className="single">Payment Tour Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/tour-booking-complite" className="single">Finish Tour Booking</Link>
                              </li>
                            </ul> */}
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Hotels 
                            </a>
                            {/* <ul className="submenu">
                              <li className="single-list">
                                <Link to="/hotel-list" className="single">hotel Category Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/top-filter-hotel-list" className="single">hotel Top Filter Category</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/hotel-details-with-slider" className="single">Details With slider</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/hotel-cart-page" className="single">Cart hotel Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/hotel-booking-payment" className="single">Payment hotel Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/hotel-booking-complite" className="single">Finish hotel Booking</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/invoice" className="single">View Invoice</Link>
                              </li>
                            </ul> */}
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Transports 
                            </a>
                            {/* <ul className="submenu">
                              <li className="single-list">
                                <Link to="/transports-list" className="single">transports Category Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/top-filter-transports-list" className="single">Top Filter Category</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/transports-details-with-slider" className="single">Details With slider</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/transports-cart-page" className="single">Cart transports Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/transports-booking-payment" className="single">Payment transports Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/transports-booking-complite" className="single">Finish transports Booking</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/invoice" className="single">View Invoice</Link>
                              </li>
                            </ul> */}
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Restaurants 
                            </a>
                            {/* <ul className="submenu">
                              <li className="single-list">
                                <Link to="/restaurant-list" className="single">restaurant Category Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/top-filter-restaurant-list" className="single">Top Filter Category</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/restaurant-details-with-slider" className="single">Details With slider</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/restaurant-cart-page" className="single">Cart restaurant Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/restaurant-booking-payment" className="single">Payment restaurant Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/restaurant-booking-complite" className="single">Finish restaurant Booking</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/invoice" className="single">View Invoice</Link>
                              </li>
                            </ul> */}
                          </li>
                          {/* <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Pages <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <a href="javascript:void(0)" className="single">
                                  Dashboard<i className="ri-arrow-right-s-line"></i>
                                </a>
                                <ul className="submenu">
                                  <li className="single-list">
                                    <Link to="/dashboard" className="single">Dashboard</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/all-tours-booking" className="single">Tour Booking</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/all-hotels-booking" className="single">Hotel Booking</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/payout-settings" className="single">Payout Setting</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/support" className="single">Support Ticket</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/setting" className="single">Profile Setting</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="single-list">
                                <a href="javascript:void(0)" className="single">
                                  Error Page<i className="ri-arrow-right-s-line"></i>
                                </a>
                                <ul className="submenu">
                                  <li className="single-list">
                                    <Link to="/error/400" className="single">400 page</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/error/404" className="single">404 page</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/error/408" className="single">408 page</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/error/500" className="single">500 page</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/error/503" className="single">503 page</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="single-list">
                                <a href="javascript:void(0)" className="single">
                                  Login<i className="ri-arrow-right-s-line"></i>
                                </a>
                                <ul className="submenu">
                                  <li className="single-list">
                                    <Link to="/login" className="single">Login</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/register" className="single">Registration</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/forgot-pass" className="single">Forgot Password</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/verification" className="single">Verification</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/new-password" className="single">New Password</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="single-list">
                                <Link to="/about" className="single">About</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/tourist-guid" className="single">Tourist Guid</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/tourist-guid-details" className="single">Tourist Guid Details</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/news" className="single">News</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/contact" className="single">Contact</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/news-details" className="single">News Details</Link>
                              </li>
                              <li className="single-list">
                                <a href="javascript:void(0)" className="single">
                                  Others<i className="ri-arrow-right-s-line"></i>
                                </a>
                                <ul className="submenu">
                                  <li className="single-list">
                                    <Link to="/faq" className="single">FAQs</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/privacy-policy" className="single">privacy policy</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/terms-condition" className="single">terms-condition</Link>
                                  </li>
                                  <li className="single-list">
                                    <Link to="/tour-cart-page" className="single">cart</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li> */}
                          <li className="d-block d-lg-none">
                            <div className="header-right-three pl-15 mt-10">
                              <div className="sign-btn">
                                <Link to="/login" className="btn-secondary-sm m-0">Sign In</Link>
                              </div>
                              <div className="d-flex align-items-center gap-12">
                                <div className="lang">
                                  <i className="ri-global-line"></i>
                                  <p className="pera">English</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        {/* search box */}
                        <div className="search-box search-bar d-none d-lg-block" style={{ cursor: 'pointer' }} onClick={() => setIsSearchOpen(true)}>
                          <div className="header-search">
                            <span className="pera">Destination, attraction</span>
                            <div className="search-icon">
                              <i className="ri-search-line"></i>
                            </div>
                            <kbd className="light-text">
                              <abbr title="Ctrl">Ctrl +</abbr> k
                            </kbd>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
                {/* Mobile Menu */}
                <div className="div">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search overlay */}
      <div className="search-overlay" style={{ display: isSearchOpen ? 'block' : 'none' }} onClick={() => setIsSearchOpen(false)}></div>
      {/* Search box */}
      <div className="search-container" style={{ display: isSearchOpen ? 'block' : 'none' }}>
        <div className="top-section">
          <div className="search-icon">
            <i className="ri-search-line"></i>
          </div>
          <div className="modal-search-box">
            <input type="text" id="searchField" className="search-field"
              placeholder="Destination, Agency, Country" />
            <button id="closeSearch" className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
              <kbd className="light-text"> ESC </kbd>
            </button>
          </div>
        </div>
        <div className="body-section">
          <div className="row">
            <div className="col-md-8">
              <ul className="listing">
                <li>
                  <h4 className="search-label">Recent</h4>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-1.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Dubai by Night City Tour with Fountain show
                        </h4>
                        <p className="pera line-clamp-2">
                          Wonderful evening escapade starting at Madinat
                          Jumeirah to the musical fountains to see another.
                          Wonderful evening escapade starting at Madinat
                          Jumeirah to the musical fountains to see another
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-2.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Dubai: Premium Red Dunes, Camels, Stargazing & 5*
                          BBQ at Al Khayma Camp™️
                        </h4>
                        <p className="pera line-clamp-2">
                          Give a great end to your day in Dubai with our
                          premium evening Red Dune Desert Safari. Give a great
                          end to your day in Dubai with our premium evening
                          Red Dune Desert Safari.
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-3.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Admission to Global Village in Dubai
                        </h4>
                        <p className="pera line-clamp-2">
                          Admission to Dubai's biggest, multicultural festival
                          park with replicas of iconic landmarks. Admission to
                          Dubai's biggest, multicultural festival park with
                          replicas of iconic landmarks
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <h4 className="search-label">Recent</h4>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-1.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Dubai by Night City Tour with Fountain show
                        </h4>
                        <p className="pera line-clamp-2">
                          Wonderful evening escapade starting at Madinat
                          Jumeirah to the musical fountains to see another.
                          Wonderful evening escapade starting at Madinat
                          Jumeirah to the musical fountains to see another
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-2.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Dubai: Premium Red Dunes, Camels, Stargazing & 5*
                          BBQ at Al Khayma Camp™️
                        </h4>
                        <p className="pera line-clamp-2">
                          Give a great end to your day in Dubai with our
                          premium evening Red Dune Desert Safari. Give a great
                          end to your day in Dubai with our premium evening
                          Red Dune Desert Safari.
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="single-list">
                  <Link to="/details-with-slider">
                    <div className="search-flex">
                      <div className="content-img">
                        <img src="/assets/images/gallery/search-img-3.jpeg" alt="travello" />
                      </div>
                      <div className="content">
                        <h4 className="title line-clamp-1">
                          Admission to Global Village in Dubai
                        </h4>
                        <p className="pera line-clamp-2">
                          Admission to Dubai's biggest, multicultural festival
                          park with replicas of iconic landmarks. Admission to
                          Dubai's biggest, multicultural festival park with
                          replicas of iconic landmarks
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="right-section" id="filterMenu">
                <h4 className="title">Filter Options</h4>
                {/* List of Filter */}
                <ul className="listing">
                  <li>
                    <h4 className="search-label">Post Type</h4>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Posts (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Posts (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Links (44)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Blogs (23)</p>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* List of Filter */}
                <ul className="listing">
                  <li>
                    <h4 className="search-label">Categories</h4>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Articles (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Poll (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Article (44)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Blogs (23)</p>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* List of Filter */}
                <ul className="listing">
                  <li>
                    <h4 className="search-label">Travel</h4>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Articles (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Poll (3)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Article (44)</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list">
                    <div className="d-flex align-items-center gap-8">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember"
                          name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        <p className="pera">Blogs (23)</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="div">
              <div className="filter_menu"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

