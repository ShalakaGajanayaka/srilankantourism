import { Link } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';

function TourBookingComplete() {
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
                      <a href="javascript:void(0)" className="single active">Tour booking complete</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Multi Steps */}
        <ProgressSteps currentStep={4} />
        {/* / */}
      </section>
      {/*/ End-of Breadcrumbs*/}

      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title-two mb-20">
                    <h3 className="title font-600 mb-10">Complete Booking</h3>
                    <p className="pera">
                      Thank you for booking with Travello! Your booking is now complete, and we're
                      thrilled to be part of your travel journey. Check your email for confirmation and
                      detailed information about your trip. If you have any questions, our support team is
                      here to help. Get ready to explore, relax, and create unforgettable memories. We
                      wish you a smooth and wonderful travel experience with Travello!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title-two mb-20">
                    <h3 className="title font-600 mb-10">Booking summary</h3>
                  </div>
                </div>
                <div className="col-lg-12">
                  {/* Booking Summary Table */}
                  <div className="table-responsives mb-40">
                    <table className="table-color-col table-w-uset table-head-border">
                      <tbody>
                        <tr>
                          <td className="text-left font-600 p-10">Tour Place Name</td>
                          <td className="text-right">Grand Canyon</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Adults</td>
                          <td className="text-right">04</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Children</td>
                          <td className="text-right">01</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">In Time</td>
                          <td className="text-right">10:00 AM</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Out Time</td>
                          <td className="text-right">06:00 PM</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Payment Type</td>
                          <td className="text-right">Credit Card</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Sub Total</td>
                          <td className="text-right">$170.15</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">VAT Tax</td>
                          <td className="text-right">$05.00</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Tour Guide</td>
                          <td className="text-right">$170.15</td>
                        </tr>
                        <tr>
                          <td className="text-left font-600 p-10">Dinner</td>
                          <td className="text-right">$100.15</td>
                        </tr>
                        <tr className="bg-primary">
                          <td className="text-left text-white p-6 px-10 font-600 text-20" style={{ borderTop: 0 }}>
                            Total
                          </td>
                          <td className="text-right text-white p-6 px-10 font-600 text-20" style={{ borderTop: 0 }}>
                            $425.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* End Booking Summary Table */}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="show-pricing-details position-sticky top-0">
                <div className="show-info d-flex flex-column flex-wrap gap-10 mb-15">
                  <div className="location">
                    <i className="ri-map-pin-line"></i>
                    <div className="name">Bangkok, Thailand</div>
                  </div>
                </div>
                <div className="mt-30">
                  <Link to="/dashboard" className="send-btn w-100 text-capitalize text-center d-block">
                    Go to Dashboard
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

export default TourBookingComplete;

