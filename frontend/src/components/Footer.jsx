import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-wrapper footer-bg">
        <div className="container">
          <div className="footer-area">
            <div className="row g-4">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <h4 className="title">Company</h4>
                    <ul className="listing">
                      <li className="single-lsit">
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/news">News</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/faq">Faq</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <h4 className="title">Explore</h4>
                    <ul className="listing">
                      <li className="single-lsit">
                        <Link to="/faq">Faq</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/tour-list">Tour Listings</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/destination">Destination</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <h4 className="title">Quick Links</h4>
                    <ul className="listing">
                      <li className="single-lsit">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="single-lsit">
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <h4 className="title">Contact</h4>
                    <ul className="listing">
                      <li className="single-lsit">
                        <a href="#" className="mb-20 d-block">
                          Colombo, Sri Lanka
                        </a>
                      </li>
                      <li className="single-lsit">
                        <a href="tel:+94112345678">
                          <div className="d-flex gap-12">
                            <i className="ri-phone-line"></i> +94 11 234 5678
                          </div>
                        </a>
                      </li>
                      <li className="single-lsit">
                        <a href="mailto:info@srilankantourism.com">
                          <div className="d-flex gap-12">
                            <i className="ri-mail-line"></i> info@srilankantourism.com
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-middle-area">
            <div className="footer-body">
              <div className="footer-content">
                <div className="d-flex flex-column gap-20">
                  <div className="logo">
                    <img src="/assets/images/logo/logo.png" alt="travello" className="changeLogo" />
                  </div>
                  <p className="pera">
                    Travel is a transformative and enriching experience that
                    allows individuals to explore new destinations, cultures,
                    and landscapes.
                  </p>
                </div>
                <div className="footer-right">
                  <h4 className="title">Subscribe Our Newsletter</h4>
                  <div className="subscribe-wraper">
                    <input className="footer-search" type="search" name="footer"
                      placeholder="Enter Your Email" />
                    <button className="subscribe-btn">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <ul className="listing">
                <li className="single-list">
                  <Link to="/terms-condition" className="single">Terms of usa</Link>
                </li>
                <li className="single-list">
                  <Link to="/privacy-policy" className="single">Privacy and Cookies Statement</Link>
                </li>
                <li className="single-list">
                  <Link to="/contact" className="single">How the site works</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* footer-bottom area */}
        <div className="footer-bottom-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between gap-14 flex-wrap">
                  <p className="pera">
                    © <span className="current-year">{currentYear}</span> Sri Lankan Tourism. All rights
                    reserved
                  </p>
                  <p className="pera">Powered by @Travello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Up */}
      <div className="progressParent" id="back-top">
        <svg className="backCircle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      {/* Search overlay */}
      <div className="search-overlay"></div>
    </footer>
  );
}

export default Footer;

