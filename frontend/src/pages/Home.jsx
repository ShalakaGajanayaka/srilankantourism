import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero area */}
      <section className="hero-padding-for-three video-overlay position-relative">
        {/* Video */}
        <div className="hero-bg-video">
          <video className="hero-slider-video video-cover" 
            poster="/assets/images/hero/hero-three-banner.png" loop autoPlay muted>
            <source src="/assets/images/videos/travel1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container">
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-xl-12">
              <div className="hero-caption-three position-relative z-3">
                <h4 className="title wow fadeInUp" data-wow-delay="0.0s">
                  Plan tours to dream locations in just a click!
                </h4>
                <p className="pera wow fadeInUp" data-wow-delay="0.1s">
                  Travel is a transformative and enriching experience that
                  allows individuals to explore new destinations, cultures, and
                  landscapes
                </p>
              </div>
              <div className="hero-footer position-relative z-3 wow fadeInUp" data-wow-delay="0.3s">
                <div className="all-user">
                  <div className="happy-user">
                    <img src="/assets/images/hero/user-1.jpeg" alt="travello" />
                  </div>
                  <div className="happy-user">
                    <img src="/assets/images/hero/user-2.png" alt="travello" />
                  </div>
                  <div className="happy-user">
                    <img src="/assets/images/hero/user-3.png" alt="travello" />
                  </div>
                  <div className="happy-user">
                    <img src="/assets/images/hero/user-4.jpeg" alt="travello" />
                  </div>
                  <div className="happy-user-count">
                    <p className="user-count">5k+</p>
                  </div>
                  <p className="pera">Happy Customer</p>
                  <span className="wave-emoji">
                    <img src="/assets/images/icon/hand.png" alt="travello" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End-of Hero */}

      {/* Plan area */}
      <section className="plan-area-three">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="plan-section-three plan-shadow">
                <div className="choose-plan-nav">
                  {/* Buttons Type Select */}
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="plan-link active" id="tour-tab" data-bs-toggle="tab"
                        data-bs-target="#tour" type="button" role="tab" aria-controls="tour"
                        aria-selected="true">
                        <i className="ri-flight-takeoff-fill"></i> Tour
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="plan-link" id="book-hotel" data-bs-toggle="tab" data-bs-target="#hotel-tap"
                        type="button" role="tab" aria-controls="hotel-tap" aria-selected="false">
                        <i className="ri-hotel-bed-line"></i>Hotel
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="plan-link" id="book-transport" data-bs-toggle="tab" data-bs-target="#transport-tap"
                        type="button" role="tab" aria-controls="transport-tap" aria-selected="false">
                        <i className="ri-car-line"></i>Transport
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="plan-link" id="book-restaurant" data-bs-toggle="tab" data-bs-target="#restaurant-tap"
                        type="button" role="tab" aria-controls="restaurant-tap" aria-selected="false">
                        <i className="ri-restaurant-line"></i>Restaurant
                      </button>
                    </li>
                  </ul>
                  {/* Tab Search Contents */}
                  <div className="tab-content" id="tourTab">
                    <div className="tab-pane fade show active" id="tour" role="tabpanel" aria-labelledby="tour-tab">
                      <div className="d-flex gap-16 flex-wrap mb-26">
                        <label className="one-way-label">
                          <input className="one-way-input" type="radio" name="radio" />
                          <span className="circle"></span>
                          <span className="radio-text">One Way</span>
                        </label>
                        <label className="round-trip-label">
                          <input className="round-trip-input" type="radio" name="radio" defaultChecked />
                          <span className="circle"></span>
                          <span className="radio-text">Round Trip</span>
                        </label>
                      </div>
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="destination-dropdown-two"></div>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Select Destination...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="destination-dropdown-three"></div>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Select Destination...
                              </div>
                            </div>
                            <div className="swap-icon">
                              <i className="ri-arrow-left-right-line"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="custom-date-three">
                                  <h4 className="month-title month-result">Select Date</h4>
                                  <div className="year-title year-result">
                                    Select Date
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="custom-date-three">
                                  <h4 className="month-title text-right month-result-two">
                                    Select Date
                                  </h4>
                                  <div className="year-title text-right year-result-two">
                                    Select Date
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swap-icon">
                              <i className="ri-calendar-2-line"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                          <div className="sign-btn text-right">
                            <Link to="/tour-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Other tabs with similar structure */}
                    <div className="tab-pane fade" id="hotel-tap" role="tabpanel" aria-labelledby="book-hotel">
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-10 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="destination-dropdown-two"></div>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Select Location...
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                          <div className="sign-btn">
                            <Link to="/hotel-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="transport-tap" role="tabpanel" aria-labelledby="book-transport">
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-10 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="destination-dropdown-two"></div>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Select Transport Type...
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                          <div className="sign-btn">
                            <Link to="/transports-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="restaurant-tap" role="tabpanel" aria-labelledby="book-restaurant">
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-10 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <div className="destination-dropdown-two"></div>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Select Restaurant Location...
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                          <div className="sign-btn">
                            <Link to="/restaurant-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End-of Plan */}

      {/* Packages Section */}
      <section className="package-area section-padding2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title mx-464 mx-auto text-center">
                <span className="highlights">Popular Packages</span>
                <h4 className="title">
                  Most Favorite Tour Place in Sri Lanka
                </h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/* Package cards will be added here */}
              <div className="row g-4">
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="package-card h-calc">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-4.png" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                    </div>
                    <div className="package-content">
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Sri Lanka Adventure Tour</Link>
                      </h4>
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Colombo, Sri Lanka</div>
                      </div>
                      <div className="packages-person">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review">
                        <div className="d-flex gap-10">
                          <p className="light-pera">From</p>
                          <p className="pera">$95</p>
                        </div>
                        <div className="rating">
                          <i className="ri-star-s-fill"></i>
                          <p className="pera">4.7 (20 Reviews)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End-of Packages */}
    </>
  );
}

export default Home;

