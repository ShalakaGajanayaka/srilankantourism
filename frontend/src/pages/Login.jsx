import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="breadcrumbs-area breadcrumb-bg">
        <div className="container">
          <h1 className="title wow fadeInUp" data-wow-delay="0.0s">Login</h1>
          <div className="breadcrumb-text">
            <nav aria-label="breadcrumb" className="breadcrumb-nav wow fadeInUp" data-wow-delay="0.1s">
              <ul className="breadcrumb listing">
                <li className="breadcrumb-item single-list">
                  <Link to="/" className="single">Home</Link>
                </li>
                <li className="breadcrumb-item single-list" aria-current="page">
                  <a href="javascript:void(0)" className="single active">Login</a>
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
                  <div className="position-relative contact-form mb-24">
                    <label className="contact-label">Email</label>
                    <input 
                      className="form-control contact-input" 
                      type="text"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  <div className="contact-form mb-24">
                    <div className="position-relative">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="contact-label">Password</label>
                        <Link to="/forgot-pass">
                          <span className="text-primary text-15">Forgot password?</span>
                        </Link>
                      </div>
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
                  </div>

                  <Link to="/dashboard" className="btn-primary-fill justify-content-center w-100">
                    <span className="d-flex justify-content-center gap-6">
                      <span>Login</span>
                    </span>
                  </Link>
                </form>

                <div className="login-footer">
                  <div className="create-account">
                    <p>
                      Don't have an account?{' '}
                      <Link to="/register">
                        <span className="text-primary">Register</span>
                      </Link>
                    </p>
                  </div>
                  <a href="javascript:void(0)" className="login-btn d-flex align-items-center justify-content-center gap-10">
                    <img src="/assets/images/icon/google-icon.png" alt="img" className="m-0" />
                    <span>login with Google</span>
                  </a>
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

export default Login;
