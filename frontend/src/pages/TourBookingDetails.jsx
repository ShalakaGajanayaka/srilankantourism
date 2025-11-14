import { Link } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';

function TourBookingDetails() {
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
                      <a href="javascript:void(0)" className="single active">Tour booking details</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Multi Steps */}
        <ProgressSteps currentStep={2} />
        {/* / */}
      </section>
      {/*/ End-of Breadcrumbs*/}

      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-two mb-20">
                <h3 className="title font-600">add Your Details</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <form action="#" method="POST">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">Name</label>
                      <input className="form-control contact-input" type="text" placeholder="Enter Your Name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">Email</label>
                      <input className="form-control contact-input" type="email" placeholder="info@gmail.com" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">Mobile</label>
                      <input className="form-control contact-input" type="number" placeholder="+96000000" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">Telephone</label>
                      <input className="form-control contact-input" type="number" placeholder="+010800000" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">Country</label>
                      <input className="form-control contact-input" type="text" placeholder="USA" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">City</label>
                      <input className="form-control contact-input" type="text" placeholder="Enter Your City" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">state</label>
                      <input className="form-control contact-input" type="text" placeholder="Enter Your State" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-form mb-24">
                      <label className="contact-label">post code</label>
                      <input className="form-control contact-input" type="text" placeholder="0210" />
                    </div>
                  </div>
                  <div className="contact-form mb-24">
                    <label className="contact-label">About</label>
                    <textarea className="contact-textarea" placeholder="" cols="3" rows="3"></textarea>
                  </div>
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
                    <ul className="listing border-bottom pb-6 mb-12">
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Check in</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">Jan 17, 2025</p>
                      </li>
                      <li className="single-list d-flex justify-content-between align-items-center flex-wrap gap-10 mb-10">
                        <p className="text-16 text-capitalize text-primary-paragraph">Check out</p>
                        <p className="text-16 font-600 text-capitalize text-primary-paragraph">Jan 20, 2025</p>
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
                <div className="mt-30">
                  <Link to="/tour-booking-payment" className="send-btn w-100 text-capitalize text-center d-block">
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

export default TourBookingDetails;

