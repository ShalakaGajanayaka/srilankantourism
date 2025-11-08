import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    // Initialize theme toggle functionality
    const themeButtons = document.querySelectorAll('.ToggleThemeButton');
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentTheme = localStorage.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = newTheme;
        localStorage.theme = newTheme;
      });
    });

    return () => {
      themeButtons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

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
                        <i className="ri-sun-line"></i>
                      </button>
                    </div>
                  </div>
                  {/* Mobile Device Search & Theme Mode */}
                  <div className="search-header-position d-block d-lg-none">
                    <div className="d-flex gap-15">
                      <div className="search-bar">
                        <a href="javascript:void(0)" className="rounded-btn">
                          <i className="ri-search-line"></i>
                        </a>
                      </div>
                      {/* Theme Mode */}
                      <button className="ToggleThemeButton change-theme-mode m-0 p-0 border-0">
                        <i className="ri-sun-line"></i>
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
                            <Link to="/" className="single">
                              Home <i className="ri-arrow-down-s-line"></i>
                            </Link>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/" className="single">Home 01</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Tours <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/tour-list" className="single">Tour Category Page</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/destination" className="single">Tour destination</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Hotels <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/hotel-list" className="single">hotel Category Page</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Transports <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/transports-list" className="single">transports Category Page</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Restaurants <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/restaurant-list" className="single">restaurant Category Page</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="single-list">
                            <a href="javascript:void(0)" className="single">
                              Pages <i className="ri-arrow-down-s-line"></i>
                            </a>
                            <ul className="submenu">
                              <li className="single-list">
                                <Link to="/dashboard" className="single">Dashboard</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/about" className="single">About</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/news" className="single">News</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/contact" className="single">Contact</Link>
                              </li>
                              <li className="single-list">
                                <Link to="/faq" className="single">FAQs</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        {/* search box */}
                        <div className="search-box search-bar d-none d-lg-block">
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
      {/* Search box */}
      <div className="search-container">
        <div className="top-section">
          <div className="search-icon">
            <i className="ri-search-line"></i>
          </div>
          <div className="modal-search-box">
            <input type="text" id="searchField" className="search-field"
              placeholder="Destination, Agency, Country" />
            <button id="closeSearch" className="close-search-btn">
              <kbd className="light-text"> ESC </kbd>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

