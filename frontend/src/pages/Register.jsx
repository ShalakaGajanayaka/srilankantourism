import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="breadcrumbs-area breadcrumb-bg">
        <div className="container">
          <h1 className="title wow fadeInUp" data-wow-delay="0.0s">Register</h1>
          <div className="breadcrumb-text">
            <nav aria-label="breadcrumb" className="breadcrumb-nav wow fadeInUp" data-wow-delay="0.1s">
              <ul className="breadcrumb listing">
                <li className="breadcrumb-item single-list">
                  <Link to="/" className="single">Home</Link>
                </li>
                <li className="breadcrumb-item single-list" aria-current="page">
                  <a href="javascript:void(0)" className="single active">Register</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/*/ End-of Breadcrumbs*/}

      {/* Login area */}
      <div className="login-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
              <div className="login-card">
                {/* Logo */}
                <div className="logo mb-40">
                  <Link to="/" className="mb-30 d-block">
                    <img src="/assets/images/logo/logo.png" alt="logo" className="changeLogo" />
                  </Link>
                </div>
                {/* Form */}
                <form action="#" method="POST">
                  <div className="contact-form mb-24">
                    <label className="contact-label">Name</label>
                    <input className="form-control contact-input" type="text" placeholder="Enter Your Name" />
                  </div>
                  <div className="contact-form mb-24">
                    <label className="contact-label">Email</label>
                    <input className="form-control contact-input" type="email" placeholder="Email" />
                  </div>

                  {/* Password */}
                  <div className="position-relative contact-form mb-24">
                    <label className="contact-label">Enter Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control contact-input password-input"
                      id="txtPasswordLogin" 
                      placeholder="Enter Password"
                    />
                    <i 
                      className={`toggle-password ${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}`}
                      onClick={togglePassword}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>
                  {/* Confirm Password */}
                  <div className="position-relative contact-form mb-24">
                    <label className="contact-label">Confirm Password</label>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="form-control contact-input password-input"
                      id="txtPasswordLogin2" 
                      placeholder="Confirm Password"
                    />
                    <i 
                      className={`toggle-password ${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}`}
                      onClick={toggleConfirmPassword}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>

                  <Link to="/login" className="btn-primary-fill justify-content-center w-100">
                    <span className="d-flex justify-content-center gap-6">
                      <span>Register</span>
                    </span>
                  </Link>
                </form>

                <div className="login-footer mb-20">
                  <div className="create-account">
                    <p>
                      Already have an account?{' '}
                      <Link to="/login">
                        <span className="text-primary">Login</span>
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="sign-with">
                  <p className="text-paragraph">Or Sign in with</p>
                  <ul className="icon-login-section">
                    <li className="icon-login">
                      <a href="#"><i className="ri-mail-line"></i></a>
                    </li>
                    <li className="icon-login">
                      <a href="#"><i className="ri-facebook-fill"></i></a>
                    </li>
                    <li className="icon-login">
                      <a href="#"><i className="ri-twitter-fill"></i></a>
                    </li>
                    <li className="icon-login">
                      <a href="#"><i className="ri-linkedin-fill"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ End-of Login */}
    </>
  );
}

export default Register;
