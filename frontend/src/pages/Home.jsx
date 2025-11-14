import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Home() {
  // Helper function to truncate text to 16 characters
  const truncateText = (text, maxLength = 16) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // State for Explore section tabs
  const [activeExploreTab, setActiveExploreTab] = useState('explore-one');
  const brandSwiperRef = useRef(null);
  const favSwiperRef = useRef(null);
  const testimonialSwiperRef = useRef(null);

  // Initialize Select2 dropdowns
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.select2) {
      const initSelect2 = () => {
        const destination = [
          { id: "", text: "Destination", description: "" },
          { id: 1, text: "USA, Turkish ", description: "Istanbul Airport" },
          { id: 2, text: "Chittagong, Turkish ", description: "Shah Amanat International Airport (CGP)" },
          { id: 3, text: "Sydney, Australia", description: "Sydney Airport (SYD)" },
          { id: 4, text: "Melbourne, Australia", description: "Melbourne Airport (MEL)" },
          { id: 5, text: "New York, United States", description: "John F. Kennedy International Airport (JFK)" },
          { id: 6, text: "Los Angeles, United States", description: "Los Angeles International Airport (LAX)" },
          { id: 7, text: "London, United Kingdom", description: "Heathrow Airport (LHR)" },
          { id: 8, text: "Manchester, United Kingdom", description: "Manchester Airport (MAN)" },
        ];

        function destinationResult(item) {
          if (!item.id) {
            return item.text;
          }
          return window.$('<div class="select2-result"><h4 class="airport-desc">' + item.text + '</h4><p class="airport-name">' + item.description + '</p></div>');
        }

        function destinationSelectionTwo(item) {
          if (!item.id) {
            return "USA";
          }
          window.$(".destination-result").html(item.description);
          return item.text;
        }

        function destinationSelectionThree(item) {
          if (!item.id) {
            return "USA";
          }
          window.$(".destination-result-three").html(item.description);
          return item.text;
        }

        // Initialize destination-dropdown-two
        const $dropdownTwo = window.$('.destination-dropdown-two');
        if ($dropdownTwo.length > 0 && !$dropdownTwo.data('select2')) {
          $dropdownTwo.select2({
            data: destination,
            placeholder: "Destination",
            containerCssClass: "custom-select2-dropdown",
            dropdownCssClass: "custom-select2-dropdown-container",
            templateResult: destinationResult,
            templateSelection: destinationSelectionTwo,
          });
        }

        // Initialize destination-dropdown-three
        const $dropdownThree = window.$('.destination-dropdown-three');
        if ($dropdownThree.length > 0 && !$dropdownThree.data('select2')) {
          $dropdownThree.select2({
            data: destination,
            placeholder: "Destination",
            containerCssClass: "custom-select2-dropdown-three",
            dropdownCssClass: "custom-select2-dropdown-container",
            templateResult: destinationResult,
            templateSelection: destinationSelectionThree,
          });
        }
      };

      // Wait for DOM to be ready
      const timer = setTimeout(initSelect2, 200);
      
      // Also initialize when tabs are shown (Bootstrap tab event)
      const handleTabShown = () => {
        setTimeout(initSelect2, 100);
      };
      
      // Listen for Bootstrap tab shown events
      const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
      tabElements.forEach(tab => {
        tab.addEventListener('shown.bs.tab', handleTabShown);
      });
      
      return () => {
        clearTimeout(timer);
        // Remove event listeners
        tabElements.forEach(tab => {
          tab.removeEventListener('shown.bs.tab', handleTabShown);
        });
        // Cleanup Select2 instances
        try {
          if (window.$('.destination-dropdown-two').data('select2')) {
            window.$('.destination-dropdown-two').select2('destroy');
          }
          if (window.$('.destination-dropdown-three').data('select2')) {
            window.$('.destination-dropdown-three').select2('destroy');
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    }
  }, []);

  // Initialize Date Picker (daterangepicker)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.daterangepicker) {
      const initDatePicker = () => {
        // Initialize daterangepicker on all custom-date-three elements
        window.$('.custom-date-three').each(function() {
          const $datePicker = window.$(this);
          if (!$datePicker.data('daterangepicker')) {
            $datePicker.daterangepicker();
            
            // Handle date selection - update both start and end date displays
            $datePicker.on('apply.daterangepicker', function(ev, picker) {
              const StartMonth = picker.startDate.format('MMMM');
              const StartYear = picker.startDate.format('dddd, D, YYYY');
              const EndMonth = picker.endDate.format('MMMM');
              const EndYear = picker.endDate.format('dddd, D, YYYY');
              
              // Update the date display elements in the same tab
              const $tabPane = $datePicker.closest('.tab-pane');
              if ($tabPane.length > 0) {
                $tabPane.find('.month-result').text(StartMonth);
                $tabPane.find('.year-result').text(StartYear);
                $tabPane.find('.month-result-two').text(EndMonth);
                $tabPane.find('.year-result-two').text(EndYear);
              } else {
                // Fallback: update all matching elements
                window.$('.month-result').text(StartMonth);
                window.$('.year-result').text(StartYear);
                window.$('.month-result-two').text(EndMonth);
                window.$('.year-result-two').text(EndYear);
              }
            });
          }
        });
      };

      // Wait for DOM to be ready
      const timer = setTimeout(initDatePicker, 300);
      
      // Also initialize when tabs are shown (Bootstrap tab event)
      const handleTabShown = () => {
        setTimeout(initDatePicker, 100);
      };
      
      // Listen for Bootstrap tab shown events
      const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
      tabElements.forEach(tab => {
        tab.addEventListener('shown.bs.tab', handleTabShown);
      });
      
      return () => {
        clearTimeout(timer);
        // Remove event listeners
        tabElements.forEach(tab => {
          tab.removeEventListener('shown.bs.tab', handleTabShown);
        });
        // Cleanup daterangepicker instances
        try {
          window.$('.custom-date-three').each(function() {
            const $datePicker = window.$(this);
            if ($datePicker.data('daterangepicker')) {
              $datePicker.off('apply.daterangepicker');
              $datePicker.data('daterangepicker').remove();
            }
          });
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    }
  }, []);

  // Initialize Brand Swiper
  useEffect(() => {
    // Wait for DOM to be ready and Swiper to be available
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        const swiperElement = document.querySelector('.brandSwiper-active');
        if (swiperElement && !brandSwiperRef.current) {
          brandSwiperRef.current = new window.Swiper('.brandSwiper-active', {
            centeredSlides: true,
            loop: true,
            speed: 500,
            slidesPerView: 2,
            spaceBetween: 40,
            autoplay: {
              delay: 3000,
            },
            breakpoints: {
              992: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 3,
              },
            },
          });
        }
      }
    };

    // Try to initialize immediately
    initSwiper();

    // If Swiper is not available, wait a bit and try again
    if (typeof window !== 'undefined' && !window.Swiper) {
      const timer = setTimeout(() => {
        initSwiper();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (brandSwiperRef.current && brandSwiperRef.current.destroy) {
        brandSwiperRef.current.destroy();
        brandSwiperRef.current = null;
      }
    };
  }, []);

  // Initialize Feature Swiper
  useEffect(() => {
    const initFavSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        const swiperElement = document.querySelector('.favSwiper-active');
        if (swiperElement && !favSwiperRef.current) {
          favSwiperRef.current = new window.Swiper('.favSwiper-active', {
            loop: true,
            speed: 500,
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
              delay: 6000,
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: '.favSwiper-active .swiper-button-next',
              prevEl: '.favSwiper-active .swiper-button-prev',
            },
            breakpoints: {
              576: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            },
          });
        }
      }
    };

    // Try to initialize immediately
    initFavSwiper();

    // If Swiper is not available, wait a bit and try again
    if (typeof window !== 'undefined' && !window.Swiper) {
      const timer = setTimeout(() => {
        initFavSwiper();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (favSwiperRef.current && favSwiperRef.current.destroy) {
        favSwiperRef.current.destroy();
        favSwiperRef.current = null;
      }
    };
  }, []);

  // Initialize Testimonial Swiper
  useEffect(() => {
    const initTestimonialSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        const swiperElement = document.querySelector('.testimonialThree-active');
        if (swiperElement && !testimonialSwiperRef.current) {
          testimonialSwiperRef.current = new window.Swiper('.testimonialThree-active', {
            loop: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.testimonialThree-active .swiper-pagination',
              type: 'progressbar',
            },
          });
        }
      }
    };

    // Try to initialize immediately
    initTestimonialSwiper();

    // If Swiper is not available, wait a bit and try again
    if (typeof window !== 'undefined' && !window.Swiper) {
      const timer = setTimeout(() => {
        initTestimonialSwiper();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (testimonialSwiperRef.current && testimonialSwiperRef.current.destroy) {
        testimonialSwiperRef.current.destroy();
        testimonialSwiperRef.current = null;
      }
    };
  }, []);


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
                    <li className="nav-item" role="presentation">
                      <button className="plan-link" id="book-visa" data-bs-toggle="tab" data-bs-target="#visa-tap"
                        type="button" role="tab" aria-controls="visa-tap" aria-selected="false">
                        <i className="ri-cellphone-line"></i>visa
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
                                <select className="destination-dropdown-two" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Istanbul Airport...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-three" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Istanbul Airport...
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
                      <div className="d-flex gap-16 flex-wrap mb-26">
                        <label className="one-way-label">
                          <input className="one-way-input" type="radio" name="radio-hotel" />
                          <span className="circle"></span>
                          <span className="radio-text">One Way</span>
                        </label>
                        <label className="round-trip-label">
                          <input className="round-trip-input" type="radio" name="radio-hotel" defaultChecked />
                          <span className="circle"></span>
                          <span className="radio-text">Round Trip</span>
                        </label>
                      </div>
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-two" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Istanbul Airport...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-three" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Istanbul Airport...
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
                            <Link to="/hotel-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="transport-tap" role="tabpanel" aria-labelledby="book-transport">
                      <div className="d-flex gap-16 flex-wrap mb-26">
                        <label className="one-way-label">
                          <input className="one-way-input" type="radio" name="radio-transport" />
                          <span className="circle"></span>
                          <span className="radio-text">One Way</span>
                        </label>
                        <label className="round-trip-label">
                          <input className="round-trip-input" type="radio" name="radio-transport" defaultChecked />
                          <span className="circle"></span>
                          <span className="radio-text">Round Trip</span>
                        </label>
                      </div>
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-two" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Istanbul Airport...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-three" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Istanbul Airport...
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
                            <Link to="/transports-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="restaurant-tap" role="tabpanel" aria-labelledby="book-restaurant">
                      <div className="d-flex gap-16 flex-wrap mb-26">
                        <label className="one-way-label">
                          <input className="one-way-input" type="radio" name="radio-restaurant" />
                          <span className="circle"></span>
                          <span className="radio-text">One Way</span>
                        </label>
                        <label className="round-trip-label">
                          <input className="round-trip-input" type="radio" name="radio-restaurant" defaultChecked />
                          <span className="circle"></span>
                          <span className="radio-text">Round Trip</span>
                        </label>
                      </div>
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-two" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Istanbul Airport...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-three" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Istanbul Airport...
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
                            <Link to="/restaurant-list" className="btn-secondary-lg w-100 text-center">
                              <i className="ri-search-line mr-10 font-20"></i> Search Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="visa-tap" role="tabpanel" aria-labelledby="book-visa">
                      <div className="d-flex gap-16 flex-wrap mb-26">
                        <label className="one-way-label">
                          <input className="one-way-input" type="radio" name="radio-visa" />
                          <span className="circle"></span>
                          <span className="radio-text">One Way</span>
                        </label>
                        <label className="round-trip-label">
                          <input className="round-trip-input" type="radio" name="radio-visa" defaultChecked />
                          <span className="circle"></span>
                          <span className="radio-text">Round Trip</span>
                        </label>
                      </div>
                      <div className="row g-4 justify-content-end">
                        <div className="col-xl-5 col-lg-12">
                          <div className="destination-flex">
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-two" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result line-clamp-1">
                                Istanbul Airport...
                              </div>
                            </div>
                            <div className="select-dropdown-section">
                              <div className="d-flex gap-10 align-items-center">
                                <select className="destination-dropdown-three" style={{ display: 'none' }}></select>
                              </div>
                              <div className="destination-result-three line-clamp-1">
                                Istanbul Airport...
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
                  Most Favorite Tour Places in Sri Lanka
                </h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/* Tab Buttons */}
              <ul className="nav nav-pills package-pills" id="pills-tab" role="tablist">
                <li className="nav-item package-item" role="presentation">
                  <button className="nav-link package-nav active" id="pills-colombo-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-colombo" role="tab" aria-controls="pills-colombo" aria-selected="true">
                    Colombo
                  </button>
                </li>
                <li className="nav-item package-item" role="presentation">
                  <button className="nav-link package-nav" id="pills-kandy-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-kandy" role="tab" aria-controls="pills-kandy"
                    aria-selected="false">
                    Kandy
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link package-nav" id="pills-galle-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-galle" role="tab" aria-controls="pills-galle"
                    aria-selected="false">
                    Galle
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link package-nav" id="pills-sigiriya-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-sigiriya" role="tab" aria-controls="pills-sigiriya"
                    aria-selected="false">
                    Sigiriya
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link package-nav" id="pills-nuwaraeliya-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-nuwaraeliya" role="tab" aria-controls="pills-nuwaraeliya" aria-selected="false">
                    Nuwara Eliya
                  </button>
                </li>
              </ul>
              {/* Tab contents */}
              <div className="tab-content" id="pills-tabContent">
                {/* Colombo Tab */}
                <div className="tab-pane fade show active" id="pills-colombo" role="tabpanel"
                  aria-labelledby="pills-colombo-tab">
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
                            <Link to="/details-with-slider">Colombo City Tour</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Colombo, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">1 Day Tour</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$45</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.8 (35 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-3.png" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Colombo Fort Heritage Walk</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Colombo, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Half Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$30</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.7 (28 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-2.png" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Colombo Night Life Experience</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Colombo, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Evening Tour</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$55</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (42 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-10.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Colombo Beach & Shopping</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Colombo, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Full Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$65</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.6 (31 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Kandy Tab */}
                <div className="tab-pane fade" id="pills-kandy" role="tabpanel" aria-labelledby="pills-kandy-tab">
                  <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-5.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Temple of the Tooth Relic</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Kandy, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">1 Day Tour</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$50</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (58 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-6.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Kandy Cultural Show</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Kandy, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Evening Show</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$35</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.7 (45 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-7.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Kandy Lake & Peradeniya Gardens</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Kandy, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Full Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$60</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.8 (52 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-8.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Kandy Hill Country Tour</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Kandy, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">2 Days 1 Night</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$120</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (67 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Galle Tab */}
                <div className="tab-pane fade" id="pills-galle" role="tabpanel" aria-labelledby="pills-galle-tab">
                  <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-9.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Galle Fort Heritage Walk</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Galle, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Half Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$40</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.8 (49 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-10.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Galle Beach & Sunset</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Galle, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Evening Tour</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$35</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (41 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-11.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Galle & Unawatuna Beach</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Galle, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Full Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$55</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.7 (38 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-12.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Galle Fort Photography Tour</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Galle, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">3 Hours</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$45</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.8 (33 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sigiriya Tab */}
                <div className="tab-pane fade" id="pills-sigiriya" role="tabpanel" aria-labelledby="pills-sigiriya-tab">
                  <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-13.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Sigiriya Rock Fortress</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Sigiriya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Half Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$75</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (72 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-14.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Sigiriya & Dambulla Caves</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Sigiriya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Full Day</p>
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
                              <p className="pera">4.8 (61 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-15.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Sigiriya Sunrise Tour</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Sigiriya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Early Morning</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$85</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">5.0 (54 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-16.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Sigiriya Cultural Triangle</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Sigiriya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">2 Days 1 Night</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$180</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (48 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Nuwara Eliya Tab */}
                <div className="tab-pane fade" id="pills-nuwaraeliya" role="tabpanel" aria-labelledby="pills-nuwaraeliya-tab">
                  <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-17.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Nuwara Eliya Tea Country</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Nuwara Eliya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Full Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$70</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.8 (56 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-18.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Horton Plains & World's End</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Nuwara Eliya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Early Morning</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$90</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.9 (63 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-19.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Nuwara Eliya Hill Station</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Nuwara Eliya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">2 Days 1 Night</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$150</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.7 (44 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="package-card h-calc">
                        <div className="package-img imgEffect4">
                          <Link to="/details-with-slider">
                            <img src="/assets/images/package/package-20.jpg" alt="travello" />
                          </Link>
                          <div className="image-badge">
                            <p className="pera">Featured</p>
                          </div>
                        </div>
                        <div className="package-content">
                          <h4 className="area-name">
                            <Link to="/details-with-slider">Gregory Lake & Victoria Park</Link>
                          </h4>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <div className="name">Nuwara Eliya, Sri Lanka</div>
                          </div>
                          <div className="packages-person">
                            <div className="count">
                              <i className="ri-time-line"></i>
                              <p className="pera">Half Day</p>
                            </div>
                            <div className="count">
                              <i className="ri-user-line"></i>
                              <p className="pera">2 Person</p>
                            </div>
                          </div>
                          <div className="price-review">
                            <div className="d-flex gap-10">
                              <p className="light-pera">From</p>
                              <p className="pera">$50</p>
                            </div>
                            <div className="rating">
                              <i className="ri-star-s-fill"></i>
                              <p className="pera">4.6 (39 Reviews)</p>
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
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-button d-inline-block">
                <Link to="/tour-list">
                  <div className="btn-primary-icon-sm">
                    <p className="pera">View All Tour</p>
                    <i className="ri-arrow-right-up-line"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End-of Packages */}

      {/* Special Offers Section */}
      <section className="special-area bottom-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title mx-430 mx-auto text-center">
                <span className="highlights fancy-font font-400">special offers</span>
                <h4 className="title">
                  Amazing Offers to Explore Sri Lanka
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 col-md-6">
              <Link to="/tour-list" className="offer-banner imgEffect4 wow fadeInLeft" data-wow-delay="0.0s">
                <img src="/assets/images/gallery/offercard-1.jpg" alt="travello" />
                <div className="offer-content">
                  <p className="highlights-text">Save up to</p>
                  <h4 className="title">50%</h4>
                  <p className="pera">Let's Explore Beautiful Sri Lanka</p>
                  <div className="location">
                    <i className="ri-map-pin-line"></i>
                    <p className="name">Colombo, Sri Lanka</p>
                  </div>
                  <div className="btn-secondary-sm radius-30"> Booking Now </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-md-6">
              <Link to="/hotel-list" className="offer-banner imgEffect4 wow fadeInRight" data-wow-delay="0.0s">
                <img src="/assets/images/gallery/offercard-2.jpg" alt="travello" />
                <div className="offer-content-two">
                  <h4 className="title">Nearby Hotels</h4>
                  <p className="pera">
                    Up to <span className="highlights-text">50%</span> Off
                  </p>
                  <div className="location">
                    <i className="ri-map-pin-line"></i>
                    <p className="name">Kandy, Sri Lanka</p>
                  </div>
                  <div className="btn-secondary-sm radius-30"> Booking Now </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End-of Special Offers */}

      {/* Enjoy Trip Section */}
      <section className="special-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title mx-464 mx-auto text-center">
                <span className="highlights fancy-font font-400">Enjoy Trip</span>
                <h4 className="title">
                  Top Domestic & International Tours
                </h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/* Trip Buttons */}
              <ul className="nav nav-pills trip-pills" id="trip-tab" role="tablist">
                <li className="nav-item trip-item" role="presentation">
                  <button className="nav-link trip-nav active" id="pills-domestic-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-domestic" type="button" role="tab" aria-controls="pills-domestic"
                    aria-selected="true">
                    Domestic
                  </button>
                </li>
                <li className="nav-item trip-item" role="presentation">
                  <button className="nav-link trip-nav" id="pills-international-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-international" type="button" role="tab"
                    aria-controls="pills-international" aria-selected="false">
                    International
                  </button>
                </li>
              </ul>
              {/* / End-of Trip Buttons */}

              {/* Tab Contents */}
              <div className="tab-content" id="trip-tabContent">
                {/* Domestic Tab */}
                <div className="tab-pane fade show active" id="pills-domestic" role="tabpanel"
                  aria-labelledby="pills-domestic-tab">
                  <div className="row g-4">
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Kandy</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Kandy City Center")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Galle</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Galle Fort Area")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Sigiriya</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Sigiriya Rock Fortress")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Nuwara Eliya</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Nuwara Eliya Hill Station")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Ella</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Ella Town Center")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Jaffna</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Jaffna City Center")}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* International Tab */}
                <div className="tab-pane fade" id="pills-international" role="tabpanel"
                  aria-labelledby="pills-international-tab">
                  <div className="row g-4">
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Dubai</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Dubai International Airport")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Singapore</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Changi Airport")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Maldives</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Velana International Airport")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Thailand</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bangkok Suvarnabhumi Airport")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">India</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Delhi Indira Gandhi Airport")}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <Link to="/details-with-slider" className="trip-card">
                        <div className="from-flex">
                          <h4 className="from-title">Colombo</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Bandaranaike International Airport")}</p>
                        </div>
                        <div className="trip-icon-flex">
                          <div className="trip-icon"><i className="ri-flight-takeoff-fill"></i></div>
                        </div>
                        <div className="from-flex">
                          <h4 className="from-title">Malaysia</h4>
                          <p className="from-pera line-clamp-1">{truncateText("Kuala Lumpur International Airport")}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* / End-of Tab contents */}
            </div>
          </div>
        </div>
      </section>
      {/* End-of Enjoy Trip */}

      {/* About Us area */}
      <section className="about-area">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-5 col-lg-6">
              <div className="section-title mx-430 mb-30 w-md-100">
                <span className="highlights fancy-font font-400">About Us</span>
                <h4 className="title">
                  Get The Best Travel Experience With Travello
                </h4>
                <p className="pera">
                  Travel is a transformative and enriching experience that
                  allows individuals to explore new destinations, cultures, and
                  landscapes. It is a fundamental human activity that has been
                  practiced for centuries and continues to be a source of joy,
                  learning, and personal growth.
                </p>
                <p className="pera">
                  Travel is a transformative and enriching experience that
                  allows individuals to explore new destinations, cultures.
                </p>
                <div className="section-button mt-27 d-inline-block">
                  <Link to="/about" className="btn-primary-icon-sm radius-20">
                    <p className="pera mt-0">Learn More</p>
                    <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </div>
                <div className="about-imp-link mt-40">
                  <div className="icon">
                    <i className="ri-user-line"></i>
                  </div>
                  <div className="content">
                    <p className="pera font-16">
                      <span className="font-700">2,500</span> People Booked Tomorrow
                      Land Event in the Last 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="about-count-section about-count-before-bg">
                <div className="banner">
                  <img src="/assets/images/gallery/about-banner-three.png" alt="travello" />
                </div>
                <div className="all-count-list">
                  <div className="details">
                    <h4 className="count">150k</h4>
                    <p className="pera">Happy Traveler</p>
                  </div>
                  <div className="divider"></div>
                  <div className="details">
                    <h4 className="count">95.7%</h4>
                    <p className="pera">Satisfaction Rate</p>
                  </div>
                  <div className="divider"></div>
                  <div className="details">
                    <h4 className="count">5000+</h4>
                    <p className="pera">Tour Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End-of About US*/}

      {/* Feature area */}
      <section className="feature-area feature-area-bg section-padding2">
        <div className="container">
          <div className="row justify-content-center position-relative z-10">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title mx-464 mx-auto text-center">
                <span className="highlights fancy-font font-400">Features Tour</span>
                <h4 className="title">
                  Most Favorite Tour Place in The World
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4 position-relative z-10">
            <div className="swiper favSwiper-active">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-4.png" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-3.png" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-2.png" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-10.jpg" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-5.jpg" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
                <div className="swiper-slide">
                  <div className="package-card">
                    <div className="package-img imgEffect4">
                      <Link to="/details-with-slider">
                        <img src="/assets/images/package/package-6.jpg" alt="travello" />
                      </Link>
                      <div className="image-badge">
                        <p className="pera">Featured</p>
                      </div>
                      <div className="fav-badge">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                    <div className="package-content">
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <div className="name">Bangkok, Thailand</div>
                      </div>
                      <h4 className="area-name">
                        <Link to="/details-with-slider">Dusitd2 Samyan Bangkok</Link>
                      </h4>
                      <div className="packages-person mb-16">
                        <div className="count">
                          <i className="ri-time-line"></i>
                          <p className="pera">3 Days 2 Night</p>
                        </div>
                        <div className="count">
                          <i className="ri-user-line"></i>
                          <p className="pera">2 Person</p>
                        </div>
                      </div>
                      <div className="price-review mb-0">
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
              <div className="swiper-button-next">
                <i className="ri-arrow-right-s-line"></i>
              </div>
              <div className="swiper-button-prev">
                <i className="ri-arrow-left-s-line"></i>
              </div>
            </div>
          </div>
          <div className="row position-relative z-10">
            <div className="col-12 text-center">
              <div className="section-button d-inline-block">
                <Link to="/tour-list">
                  <div className="btn-primary-icon-sm border-radius-20">
                    <p className="pera">View All Tour</p>
                    <i className="ri-arrow-right-up-line"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End of Feature */}

      {/* Destination area */}
      <section className="destination-area destination-bg-before">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title text-center mx-464 mx-auto position-relative">
                <span className="highlights">Destination List</span>
                <h4 className="title">
                  Explore The Beautiful Places Around World
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-xl-4 col-lg-7 col-md-7">
              <Link to="/details-with-gallery" className="destination-banner">
                <img src="/assets/images/destination/destination-01.png" alt="travello" />
                <div className="destination-content">
                  <div className="ratting-badge">
                    <i className="ri-star-s-fill"></i>
                    <span>4.5</span>
                  </div>
                  <div className="destination-info">
                    <div className="destination-name">
                      <p className="pera">Spain</p>
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <p className="name">Malaga View</p>
                      </div>
                    </div>
                    <div className="button-section">
                      <div className="arrow-btn">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xl-4 col-lg-7 col-md-7">
              <Link to="/details-with-gallery" className="destination-banner">
                <img src="/assets/images/destination/destination-1.png" alt="travello" />
                <div className="destination-content">
                  <div className="ratting-badge">
                    <i className="ri-star-s-fill"></i>
                    <span>4.5</span>
                  </div>
                  <div className="destination-info">
                    <div className="destination-name">
                      <p className="pera">Spain</p>
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <p className="name">Malaga View</p>
                      </div>
                    </div>
                    <div className="button-section">
                      <div className="arrow-btn">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xl-4 col-lg-7 col-md-7">
              <Link to="/details-with-gallery" className="destination-banner">
                <img src="/assets/images/destination/destination-001.jpg" alt="travello" />
                <div className="destination-content">
                  <div className="ratting-badge">
                    <i className="ri-star-s-fill"></i>
                    <span>4.5</span>
                  </div>
                  <div className="destination-info">
                    <div className="destination-name">
                      <p className="pera">Spain</p>
                      <div className="location">
                        <i className="ri-map-pin-line"></i>
                        <p className="name">Malaga View</p>
                      </div>
                    </div>
                    <div className="button-section">
                      <div className="arrow-btn">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="destination-gallery">
              <div className="row g-4">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <Link to="/details-with-gallery" className="destination-banner">
                    <img src="/assets/images/destination/destination-3.png" alt="travello" />
                    <div className="destination-content">
                      <div className="ratting-badge">
                        <i className="ri-star-s-fill"></i>
                        <span>4.5</span>
                      </div>
                      <div className="destination-info">
                        <div className="destination-name">
                          <p className="pera">Switzerland</p>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <p className="name">Zürich View</p>
                          </div>
                        </div>
                        <div className="button-section">
                          <div className="arrow-btn">
                            <i className="ri-arrow-right-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <Link to="/details-with-gallery" className="destination-banner">
                    <img src="/assets/images/destination/destination-4.png" alt="travello" />
                    <div className="destination-content">
                      <div className="ratting-badge">
                        <i className="ri-star-s-fill"></i>
                        <span>4.5</span>
                      </div>
                      <div className="destination-info">
                        <div className="destination-name">
                          <p className="pera">Australia</p>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <p className="name">Melbourne View</p>
                          </div>
                        </div>
                        <div className="button-section">
                          <div className="arrow-btn">
                            <i className="ri-arrow-right-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <Link to="/details-with-gallery" className="destination-banner">
                    <img src="/assets/images/destination/destination-5.png" alt="travello" />
                    <div className="destination-content">
                      <div className="ratting-badge">
                        <i className="ri-star-s-fill"></i>
                        <span>4.5</span>
                      </div>
                      <div className="destination-info">
                        <div className="destination-name">
                          <p className="pera">Canada</p>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <p className="name">Toronto View</p>
                          </div>
                        </div>
                        <div className="button-section">
                          <div className="arrow-btn">
                            <i className="ri-arrow-right-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <Link to="/details-with-gallery" className="destination-banner">
                    <img src="/assets/images/destination/destination-02.png" alt="travello" />
                    <div className="destination-content">
                      <div className="ratting-badge">
                        <i className="ri-star-s-fill"></i>
                        <span>4.5</span>
                      </div>
                      <div className="destination-info">
                        <div className="destination-name">
                          <p className="pera">Canada</p>
                          <div className="location">
                            <i className="ri-map-pin-line"></i>
                            <p className="name">Toronto View</p>
                          </div>
                        </div>
                        <div className="button-section">
                          <div className="arrow-btn">
                            <i className="ri-arrow-right-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* shape */}
        <div className="shape">
          <img src="/assets/images/icon/shape.png" alt="travello" />
        </div>
      </section>
      {/*/ End-of Destination */}

      {/* Explore area */}
      <section className="explore-area section-padding2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title text-center mx-430 mx-auto position-relative mb-60">
                <span className="highlights">Explore The Word</span>
                <h4 className="title">
                  Our Best Offer Package For You
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-xl-5 col-lg-5 col-md-6">
              <div className="all-explore" role="tablist" aria-orientation="vertical">
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-one' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-one')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-one'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-1.svg" alt="travello" />
                    </div>
                    <h4 className="name">Fishing & Swimming</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-two' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-two')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-two'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-2.svg" alt="travello" />
                    </div>
                    <h4 className="name">Music & Relaxing</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-three' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-three')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-three'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-3.svg" alt="travello" />
                    </div>
                    <h4 className="name">Trailers & Sports</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-four' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-four')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-four'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-4.svg" alt="travello" />
                    </div>
                    <h4 className="name">Mountain & Hill Hiking</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-five' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-five')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-five'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-5.svg" alt="travello" />
                    </div>
                    <h4 className="name">Paragliding Tours</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-six' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-six')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-six'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-1.svg" alt="travello" />
                    </div>
                    <h4 className="name">Music & Relaxing</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-seven' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-seven')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-seven'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-2.svg" alt="travello" />
                    </div>
                    <h4 className="name">Mountain & Hill Hiking</h4>
                  </div>
                </div>
                <div 
                  className={`explore-btn ${activeExploreTab === 'explore-eight' ? 'active' : ''}`}
                  onClick={() => setActiveExploreTab('explore-eight')}
                  role="tab"
                  aria-selected={activeExploreTab === 'explore-eight'}
                >
                  <div className="d-flex gap-16 align-items-center">
                    <div className="explore-icon">
                      <img src="/assets/images/icon/explore-1.svg" alt="travello" />
                    </div>
                    <h4 className="name">Fishing & Swimming</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-6">
              <div className="tab-content">
                {activeExploreTab === 'explore-one' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/about.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-two' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/music.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-three' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/sports.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-four' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/hiking.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-five' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/paragliding.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-six' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/music.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-seven' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/hiking.png" alt="travello" />
                    </div>
                  </div>
                )}
                {activeExploreTab === 'explore-eight' && (
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="explore-conntent">
                      <h4 className="title">Trailers & Sports</h4>
                      <p className="pera">
                        Lorem ipsum dolor sit amet consectetur. Nullam amet at sed
                        dui tellus tempor pretium tincidunt. Id amet sit viverra
                        dolor consectetur elementum. Non at volutpat aliquam ac ac
                        at amet. Ut semper semper sit aliquam penatibus dolor
                        tortor nisl.
                      </p>
                      <ul className="expect-list">
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci. Non sit
                          lorem dolor placerat faucibus.
                        </li>
                        <li className="list">
                          Lorem ipsum dolor sit amet consectetur. Platea urna
                          hendrerit dui eget velit sollicitudin orci.
                        </li>
                      </ul>
                    </div>
                    <div className="explore-banner">
                      <img src="/assets/images/gallery/about.png" alt="travello" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End of Explore */}

      {/* Testimonial area */}
      <section className="testimonial-area-three position-relative section-bg-before-two top-padding">
        <div className="container">
          <div className="row justify-content-center position-relative">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title mx-430 mx-auto text-center">
                <span className="highlights fancy-font font-400">Testimonial</span>
                <h4 className="title">
                  What People Have Said About Our Service
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="swiper testimonialThree-active">
                <div className="swiper-wrapper">
                  <div className="swiper-slide testimonial-card">
                    <div className="testimonial-header">
                      <div className="user-img">
                        <img src="/assets/images/testimonial/testimonial-1.jpeg" alt="travello" />
                      </div>
                      <div className="user-info">
                        <p className="name">David Malan</p>
                        <p className="designation">Traveler</p>
                      </div>
                    </div>
                    <div className="rattings">
                      <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i>
                    </div>
                    <div className="testimonial-body">
                      <p className="pera line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur. Et amet nulla in
                        adipiscing. Donec tincidunt dui vel adipiscing sit
                        turpis neque at cursus. Dignissim scelerisque mattis
                        ultricies vitae.
                      </p>
                    </div>
                    <div className="testimonial-footer">
                      <div className="logo">
                        <img src="/assets/images/logo/logo.png" alt="travello" className="changeLogo" />
                      </div>
                      <p className="date">Jan 20, 2025</p>
                    </div>
                  </div>
                  <div className="swiper-slide testimonial-card">
                    <div className="testimonial-header">
                      <div className="user-img">
                        <img src="/assets/images/testimonial/testimonial-1.jpeg" alt="travello" />
                      </div>
                      <div className="user-info">
                        <p className="name">David Malan</p>
                        <p className="designation">Traveler</p>
                      </div>
                    </div>
                    <div className="rattings">
                      <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i>
                    </div>
                    <div className="testimonial-body">
                      <p className="pera line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur. Et amet nulla in
                        adipiscing. Donec tincidunt dui vel adipiscing sit
                        turpis neque at cursus. Dignissim scelerisque mattis
                        ultricies vitae.
                      </p>
                    </div>
                    <div className="testimonial-footer">
                      <div className="logo">
                        <img src="/assets/images/logo/logo.png" alt="travello" className="changeLogo" />
                      </div>
                      <p className="date">Jan 20, 2025</p>
                    </div>
                  </div>
                  <div className="swiper-slide testimonial-card">
                    <div className="testimonial-header">
                      <div className="user-img">
                        <img src="/assets/images/testimonial/testimonial-1.jpeg" alt="travello" />
                      </div>
                      <div className="user-info">
                        <p className="name">David Malan</p>
                        <p className="designation">Traveler</p>
                      </div>
                    </div>
                    <div className="rattings">
                      <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i><i className="ri-star-fill"></i><i
                        className="ri-star-fill"></i>
                    </div>
                    <div className="testimonial-body">
                      <p className="pera line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur. Et amet nulla in
                        adipiscing. Donec tincidunt dui vel adipiscing sit
                        turpis neque at cursus. Dignissim scelerisque mattis
                        ultricies vitae.
                      </p>
                    </div>
                    <div className="testimonial-footer">
                      <div className="logo">
                        <img src="/assets/images/logo/logo.png" alt="travello" className="changeLogo" />
                      </div>
                      <p className="date">Jan 20, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="hero-banner imgEffect2 o-hidden radius-20">
                <img src="/assets/images/hero/testimonial-three-banner.png" alt="travello" />
                {/* shape 01 */}
                <div className="shape">
                  <img src="/assets/images/icon/feature-shape.png" alt="travello" />
                </div>
                <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" data-fancybox="video-gallery" className="wow bounceIn" data-wow-delay=".2s">
                  <div className="video-player">
                    <i className="ri-play-fill"></i>
                  </div>
                </a>
              </div>
            </div>
            {/* / End Slider */}
          </div>
        </div>
        <div className="shape-testimonial">
          <img src="/assets/images/icon/graphic.png" alt="travello" />
        </div>
      </section>
      {/*/ End of Testimonial */}

      {/* Brand area */}
      <section className="brand-area">
        <div className="container">
          <div className="swiper brandSwiper-active">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-1.jpeg" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-2.jpg" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-3.jpg" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-4.png" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-5.png" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-1.jpeg" alt="travello" />
              </div>
              <div className="swiper-slide">
                <img src="/assets/images/brand/brand-2.jpg" alt="travello" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End of Brand */}

      {/* News & Article area */}
      <section className="news-area section-padding2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title text-center mx-605 mx-auto position-relative mb-60">
                <span className="highlights">News & Article</span>
                <h4 className="title">
                  Latest News & Articles From The Blog Posts
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <article className="news-card-two">
                <figure className="news-banner-two imgEffect">
                  <Link to="/news-details">
                    <img src="/assets/images/news/news-4.png" alt="travello" />
                  </Link>
                </figure>
                <div className="news-content">
                  <div className="heading">
                    <span className="heading-pera">Tour Guide</span>
                  </div>
                  <h4 className="title">
                    <Link to="/news-details">The World is a Book and Those Who do not Travel Read Only One Page.</Link>
                  </h4>
                  <div className="news-info">
                    <div className="d-flex gap-10 align-items-center">
                      <div className="all-user">
                        <div className="happy-user">
                          <img src="/assets/images/brand/brand-1.jpeg" alt="travello" />
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
                      </div>
                    </div>
                    <p className="time">10 min read</p>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <article className="news-card-two">
                <figure className="news-banner-two imgEffect">
                  <Link to="/news-details">
                    <img src="/assets/images/news/news-5.png" alt="travello" />
                  </Link>
                </figure>
                <div className="news-content">
                  <div className="heading">
                    <span className="heading-pera">Tour Guide</span>
                  </div>
                  <h4 className="title">
                    <Link to="/news-details">The World is a Book and Those Who do not Travel Read Only One Page.</Link>
                  </h4>
                  <div className="news-info">
                    <div className="d-flex gap-10 align-items-center">
                      <div className="all-user">
                        <div className="happy-user">
                          <img src="/assets/images/brand/brand-1.jpeg" alt="travello" />
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
                      </div>
                    </div>
                    <p className="time">10 min read</p>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <article className="news-card-two">
                <figure className="news-banner-two imgEffect">
                  <Link to="/news-details">
                    <img src="/assets/images/news/news-6.png" alt="travello" />
                  </Link>
                </figure>
                <div className="news-content">
                  <div className="heading">
                    <span className="heading-pera">Tour Guide</span>
                  </div>
                  <h4 className="title">
                    <Link to="/news-details">The World is a Book and Those Who do not Travel Read Only One Page.</Link>
                  </h4>
                  <div className="news-info">
                    <div className="d-flex gap-10 align-items-center">
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
                      </div>
                    </div>
                    <p className="time">10 min read</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-button d-inline-block">
                <Link to="/news">
                  <div className="btn-primary-icon-sm">
                    <p className="pera">View All News</p>
                    <i className="ri-arrow-right-up-line"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End of News & Article */}

      {/* Package Pricing Plan area */}
      {/* <section className="pricing-area bottom-padding section-bg-before-two">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="section-title text-center mx-605 mx-auto position-relative">
                <span className="highlights-primary">Package Pricing Plan</span>
                <h4 className="title">
                  Simply Choose The Pricing Plan That Fits You Best
                </h4>
              </div>
            </div>
          </div>
          <div className="position-relative">
            <div className="row g-4">
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="price-card h-calc wow fadeInUp" data-wow-delay="0.0s">
                  <div className="price-header">
                    <div className="d-flex gap-7 mb-2">
                      <h4 className="title">Basic</h4>
                      <div className="price-badge d-none">popular</div>
                    </div>
                    <p className="pera">Best for personal and basic needs</p>
                  </div>
                  <div className="price-tag-section">
                    <div className="price-tag">
                      <h4 className="title">$10</h4>
                      <p className="pera">One-time payment</p>
                    </div>
                  </div>
                  <ul className="feature-points">
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">20+ Partners</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Mass Messaging</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor sit amet</p>
                    </li>
                    <li className="feature-point disable">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor</p>
                    </li>
                    <li className="feature-point disable">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Online booking engine</p>
                    </li>
                    <li className="feature-point disable">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Business Card Scanner</p>
                    </li>
                  </ul>
                  <div className="button-section">
                    <Link to="/payment">
                      <div className="btn-primary-icon-outline">
                        <span className="pera">Try Now</span>
                        <i className="ri-arrow-right-up-line"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="imp-note">
                    <p className="pera">Per month +2% per online Booking</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="price-card h-calc wow fadeInUp" data-wow-delay="0.1s">
                  <div className="price-header">
                    <div className="d-flex gap-7 mb-2">
                      <h4 className="title">Pro</h4>
                      <div className="price-badge">popular</div>
                    </div>
                    <p className="pera">Best for personal and basic needs</p>
                  </div>
                  <div className="price-tag-section">
                    <div className="price-tag">
                      <h4 className="title">$77</h4>
                      <p className="pera">One-time payment</p>
                    </div>
                  </div>
                  <ul className="feature-points">
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">20+ Partners</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Mass Messaging</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor sit amet</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Online booking engine</p>
                    </li>
                    <li className="feature-point disable">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Business Card Scanner</p>
                    </li>
                  </ul>
                  <div className="button-section">
                    <Link to="/payment">
                      <div className="btn-primary-icon-outline">
                        <span className="pera">Try Now</span>
                        <i className="ri-arrow-right-up-line"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="imp-note">
                    <p className="pera">Per month +1.9% per online Booking</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="price-card h-calc wow fadeInUp" data-wow-delay="0.2s">
                  <div className="price-header">
                    <div className="d-flex gap-7 mb-2">
                      <h4 className="title">Custom</h4>
                      <div className="price-badge d-none">popular</div>
                    </div>
                    <p className="pera">Best for personal and basic needs</p>
                  </div>
                  <ul className="feature-points">
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Mass Messaging</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor sit amet</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Unlimited Everything</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Lorem ipsum dolor</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Online booking engine</p>
                    </li>
                    <li className="feature-point">
                      <div className="tick-icon">
                        <i className="ri-check-line"></i>
                      </div>
                      <p className="pera">Business Card Scanner</p>
                    </li>
                  </ul>
                  <div className="button-section">
                    <Link to="/payment">
                      <div className="btn-primary-icon-outline">
                        <span className="pera">Contact</span>
                        <i className="ri-arrow-right-up-line"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="imp-note">
                    <p className="pera">Please contact anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*/ End of Package Pricing Plan */}
    </>
  );
}

export default Home;

