import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProgressSteps from '../components/ProgressSteps';

function TourCart() {
  const [quantities, setQuantities] = useState([1, 1, 1]);
  const [services, setServices] = useState({
    welcomeDrink: false,
    tourGuide: true,
    pickUpService: false,
    coffeeBreak: false,
    dinner: true,
    bikeRent: false,
  });

  // Cart items data
  const cartItems = [
    {
      id: 1,
      image: '/assets/images/destination/destination-01.png',
      name: 'Bangkok, Thailand',
      persons: '5 parson',
      price: 10.00,
    },
    {
      id: 2,
      image: '/assets/images/destination/destination-6.png',
      name: 'Bangkok, Thailand',
      persons: '5 parson',
      price: 10.00,
    },
    {
      id: 3,
      image: '/assets/images/destination/destination-3.png',
      name: 'Bangkok, Thailand',
      persons: '5 parson',
      price: 10.00,
    },
  ];

  // Handle quantity change
  const handleQuantityChange = (index, change) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(0, newQuantities[index] + change);
    setQuantities(newQuantities);
  };

  // Handle service toggle
  const handleServiceToggle = (serviceName) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName],
    }));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item, index) => {
      return sum + (item.price * quantities[index]);
    }, 0);
  };

  const calculateServiceTotal = () => {
    const servicePrices = {
      welcomeDrink: 125,
      tourGuide: 125,
      pickUpService: 125,
      coffeeBreak: 125,
      dinner: 125,
      bikeRent: 125,
    };
    
    return Object.keys(services).reduce((sum, key) => {
      return sum + (services[key] ? servicePrices[key] : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const vatTax = 5.00;
  const serviceTotal = calculateServiceTotal();
  const total = subtotal + vatTax + serviceTotal;

  // Initialize quantity counter functionality
  useEffect(() => {
    // This will be handled by React state, but we can add any additional initialization here
  }, []);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="breadcrumbs-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="title wow fadeInUp text-center" data-wow-delay="0.0s">place your order</h1>
              <div className="breadcrumb-text mb-40">
                <nav aria-label="breadcrumb" className="breadcrumb-nav wow fadeInUp" data-wow-delay="0.1s">
                  <ul className="breadcrumb listing justify-content-center">
                    <li className="breadcrumb-item single-list">
                      <Link to="/" className="single">Home</Link>
                    </li>
                    <li className="breadcrumb-item single-list" aria-current="page">
                      <a href="javascript:void(0)" className="single active">Tour cart page</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Multi Steps */}
        <ProgressSteps currentStep={1} />
        {/* / */}
      </section>
      {/*/ End-of Breadcrumbs*/}

      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-two mb-20">
                <h3 className="title font-600">Your cart Details</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              {/* Table */}
              <div className="table-responsives mb-40">
                <table className="table-color-col table-w-uset table-head-border">
                  <thead>
                    <tr>
                      <th className="text-title font-600">Product</th>
                      <th className="text-title font-600">Price</th>
                      <th className="text-title font-600">Qty</th>
                      <th className="text-title font-600">Sub Total</th>
                      <th className="text-title font-600">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="d-flex align-items-center gap-10">
                          <div>
                            <img src={item.image} className="table-photo" alt="profile" />
                          </div>
                          <div>
                            <span className="line-clamp-1">{item.name}</span>
                            <span className="d-block">{item.persons}</span>
                          </div>
                        </td>
                        <td className="font-600">${item.price.toFixed(2)}</td>
                        <td>
                          <div className="productCount">
                            <input 
                              type="text" 
                              name="qty" 
                              value={quantities[index]} 
                              className="input-text qty"
                              readOnly
                            />
                            <div className="button-container">
                              <button 
                                className="count-plus" 
                                type="button" 
                                onClick={() => handleQuantityChange(index, 1)}
                              >
                                <i className="ri-add-line"></i>
                              </button>
                              <button 
                                className="count-minus" 
                                type="button" 
                                onClick={() => handleQuantityChange(index, -1)}
                              >
                                <i className="ri-subtract-line"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="font-600">${(item.price * quantities[index]).toFixed(2)}</td>
                        <td className="text-start">
                          <button className="border-0 bg-transparent badge-basic-danger-text text-18">
                            <i className="ri-delete-bin-6-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End Table */}

              {/* option/Services */}
              <div className="row justify-content-end">
                <div className="col-md-9">
                  <ul className="listing mb-12 d-flex flex-column gap-0">
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-15"></i>
                        </span>
                        <span>Welcome Drink</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="welcomeDrink" 
                          type="checkbox"
                          checked={services.welcomeDrink}
                          onChange={() => handleServiceToggle('welcomeDrink')}
                        />
                        <label className="toggle-item" htmlFor="welcomeDrink"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-16"></i>
                        </span>
                        <span>Tour guide</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="tourGuide" 
                          type="checkbox"
                          checked={services.tourGuide}
                          onChange={() => handleServiceToggle('tourGuide')}
                        />
                        <label className="toggle-item" htmlFor="tourGuide"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-27"></i>
                        </span>
                        <span>Pick up service</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="pickUpService" 
                          type="checkbox"
                          checked={services.pickUpService}
                          onChange={() => handleServiceToggle('pickUpService')}
                        />
                        <label className="toggle-item" htmlFor="pickUpService"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-59"></i>
                        </span>
                        <span>Coffe break</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="coffeeBreak" 
                          type="checkbox"
                          checked={services.coffeeBreak}
                          onChange={() => handleServiceToggle('coffeeBreak')}
                        />
                        <label className="toggle-item" htmlFor="coffeeBreak"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-58"></i>
                        </span>
                        <span>Dinner</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="dinner" 
                          type="checkbox"
                          checked={services.dinner}
                          onChange={() => handleServiceToggle('dinner')}
                        />
                        <label className="toggle-item" htmlFor="dinner"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                    <li className="single-list bb-dotted d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                      <div className="text-16 font-500 text-capitalize text-primary-paragraph d-flex align-items-center flex-wrap gap-25">
                        <span className="icon text-40">
                          <i className="icon_set_1_icon-40"></i>
                        </span>
                        <span>Bike rent</span>
                      </div>
                      <p className="text-16 font-700 text-capitalize text-primary-paragraph">+$125</p>
                      <div className="switch-box-style d-flex align-items-center gap-6 min-w-80">
                        <input 
                          id="bikeRent" 
                          type="checkbox"
                          checked={services.bikeRent}
                          onChange={() => handleServiceToggle('bikeRent')}
                        />
                        <label className="toggle-item" htmlFor="bikeRent"></label>
                        <p className="info-text hide-text">No</p>
                        <p className="info-text show-text">Yes</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* / options/Services */}
            </div>

            <div className="col-lg-4">
              <div className="show-pricing-details position-sticky top-0">
                <div className="price-review">
                  <div className="d-flex gap-10 align-items-end">
                    <p className="light-pera">Total</p>
                    <p className="pera">${total.toFixed(2)}</p>
                  </div>
                  <div className="rating">
                    <p className="pera text-capitalize">my in time is</p>
                  </div>
                </div>
                <div className="in-date-time mb-20">
                  <i className="ri-time-line"></i>
                  <p className="date-time-result">Wednesday, Jan 17, 2025</p>
                </div>

                <div className="show-info d-flex flex-column flex-wrap gap-10">
                  <div className="location">
                    <i className="ri-map-pin-line"></i>
                    <div className="name">Bangkok, Thailand</div>
                  </div>

                  <div className="card mb-10 border-0">
                    {/* Total Pricing */}
                    <ul className="listing border-bottom pb-6 mb-12">
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Sub Total</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">${subtotal.toFixed(2)}</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Vat Tax</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">${vatTax.toFixed(2)}</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Adults</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">04</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Children</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">01</p>
                      </li>
                      {services.tourGuide && (
                        <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                          <p className="text-16 text-capitalize text-primary-paragraph">Tour guide</p>
                          <p className="text-16 font-600 text-capitalize text-primary-paragraph">$125.00</p>
                        </li>
                      )}
                      {services.dinner && (
                        <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                          <p className="text-16 text-capitalize text-primary-paragraph">Dinner</p>
                          <p className="text-16 font-600 text-capitalize text-primary-paragraph">$125.00</p>
                        </li>
                      )}
                    </ul>
                    {/* / Total Pricing */}

                    {/* Total */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <p className="text-18 text-capitalize text-primary font-700">Total</p>
                      <p className="text-18 text-capitalize text-primary font-700">${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-30">
                  <Link to="/tour-booking-details" className="send-btn w-100 text-capitalize text-center d-block">
                    continue & Next
                  </Link>
                </div>
                <div className="footer bg-transparent">
                  <h4 className="title">
                    <i className="icon_set_1_icon-59"></i>
                    Free Cancellation
                  </h4>
                  <p className="pera">Up to 24 hours in advance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourCart;
