import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProgressSteps from '../components/ProgressSteps';

function TourBookingPayment() {
  const [selectedGateway, setSelectedGateway] = useState(0);
  const paymentGateways = [
    'payment-method1.png',
    'payment-method2.png',
    'payment-method3.png',
    'payment-method4.png',
    'payment-method6.png',
    'payment-method7.png',
    'payment-method8.png',
    'payment-method10.png',
    'payment-method12.png',
    'payment-method13.png',
    'payment-method15.png',
    'payment-method16.png',
  ];

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
                      <a href="javascript:void(0)" className="single active">Tour booking payment</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Multi Steps */}
        <ProgressSteps currentStep={3} />
        {/* / */}
      </section>
      {/*/ End-of Breadcrumbs*/}

      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <form action="#" method="POST">
                {/* Cart payments */}
                <div className="row g-4 mb-50">
                  <div className="col-lg-12">
                    <div className="section-title-two">
                      <h3 className="title font-600">cart Payment</h3>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-form">
                      <label className="contact-label">Name on card</label>
                      <input className="form-control contact-input" type="text" placeholder="Mr.Alexa" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form">
                      <label className="contact-label">Card number</label>
                      <input className="form-control contact-input" type="number" placeholder="125411475211" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form">
                      <label className="contact-label d-block">card</label>
                      <img src="/assets/images/icon/card.png" alt="card" />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="contact-form">
                      <label className="contact-label">Expiration date</label>
                      <input className="form-control contact-input" type="number" placeholder="MM/YY" />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="contact-form">
                      <label className="contact-label">CCV</label>
                      <input className="form-control contact-input" type="number" placeholder="123" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center gap-12 mb-12">
                      <label className="checkbox-label">
                        <input className="checkbox-style" type="checkbox" value="remember" name="remember" />
                        <span className="checkmark-style"></span>
                      </label>
                      <div className="content">
                        I agree to all the
                        <Link to="/terms-condition">
                          <span className="text-primary">Terms</span>
                        </Link> and{' '}
                        <Link to="/privacy-policy">
                          <span className="text-primary">Privacy policy</span>
                        </Link>
                      </div>
                    </div>
                    <Link to="/tour-booking-complete" className="btn-primary-submit">
                      Payment Now
                    </Link>
                  </div>
                </div>

                {/* Online Payments */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title-two mb-20">
                      <h3 className="title font-600">Online Payment</h3>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 payment-gateway-wrapper mt-10">
                  <ul className="payment-gateway-list mb-10">
                    {paymentGateways.map((gateway, index) => (
                      <li
                        key={index}
                        className={`single-gateway-item ${selectedGateway === index ? 'selected' : ''}`}
                        onClick={() => setSelectedGateway(index)}
                      >
                        <img src={`/assets/images/icon/${gateway}`} alt="payment method" />
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center gap-12 mb-12">
                    <label className="checkbox-label">
                      <input className="checkbox-style" type="checkbox" value="remember" name="remember" />
                      <span className="checkmark-style"></span>
                    </label>
                    <div className="content">
                      I agree to all the
                      <Link to="/terms-condition">
                        <span className="text-primary">Terms</span>
                      </Link> and{' '}
                      <Link to="/privacy-policy">
                        <span className="text-primary">Privacy policy</span>
                      </Link>
                    </div>
                  </div>
                  <Link to="/tour-booking-complete" className="btn-primary-submit">
                    Payment Now
                  </Link>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="show-pricing-details position-sticky top-0">
                <div className="price-review">
                  <div className="d-flex gap-10 align-items-end">
                    <p className="light-pera">Total</p>
                    <p className="pera">$425</p>
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
                    <ul className="listing border-bottom pb-6 mb-12">
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Sub Total</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">$170.15</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Vat Tax</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">$05.00</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Adults</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">04</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Children</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">01</p>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-10">
                      <p className="text-18 text-capitalize text-primary font-700">Total</p>
                      <p className="text-18 text-capitalize text-primary font-700">$425</p>
                    </div>
                  </div>
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

export default TourBookingPayment;

