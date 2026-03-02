import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SCSS/login.scss';
import { loginUser, registerUser } from '../api/axios';

function App() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  // LOGIN STATE
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // REGISTER STATE
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    adminPassword: '', // Admin password field
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  // LOGIN SUBMIT
  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!loginData.email) errors.email = 'Email is required';
    if (!loginData.password) errors.password = 'Password is required';

    setLoginErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      const res = await loginUser(loginData);
      // Token Save On Local Storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/staff");
      }
    } catch (error) {
      setLoginErrorMessage(error.response?.data?.msg || 'Login Failed');
    }
  };

  // REGISTER SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!registerData.name) errors.name = 'Name is required';
    if (!registerData.email) errors.email = 'Email is required';
    if (!registerData.password) errors.password = 'Password is required';
    if (!registerData.role) errors.role = 'Role is required';

    // Admin password validation if role is admin or staff
    if ((registerData.role === 'admin' || registerData.role === 'staff') && !registerData.adminPassword) {
      errors.adminPassword = 'Admin password is required';
    }

    setRegisterErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    // Step 1: Validate Admin Password with API call
    try {
      const response = await API.post('/api/check/verify-admin-password', {
        adminPassword: registerData.adminPassword, // Send the admin password
      });

      if (response.status === 200) {
        // Step 2: Proceed with registration if admin password is valid
        const res = await registerUser(registerData);
        console.log("Registration Successful", res.data);
        setIsRegister(false);  // Switch back to login view
      } else {
        setRegisterErrorMessage('Admin password verification failed');
      }
    } catch (error) {
      setRegisterErrorMessage(error.response?.data?.msg || 'Incorrect admin password');
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <div className="login-left flip-wrapper">
          <div className={`flip-inner ${isRegister ? 'flipped' : ''}`}>
            {/* LOGIN */}
            <div className="flip-front">
              <h2>Login</h2>
              <p>See your growth and get support</p>

              {loginErrorMessage && <div className="error-message">{loginErrorMessage}</div>}

              <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    className={loginErrors.email ? 'error' : ''}
                    onChange={(e) => {
                      setLoginData({ ...loginData, email: e.target.value });
                      setLoginErrors({ ...loginErrors, email: false });
                    }}
                  />
                  {loginErrors.email && <span className="error">{loginErrors.email}</span>}
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={loginData.password}
                    className={loginErrors.password ? 'error' : ''}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setLoginErrors({ ...loginErrors, password: false });
                    }}
                  />
                  {loginErrors.password && <span className="error">{loginErrors.password}</span>}
                </div>

                <button type="submit">Login</button>
                <button type="button" id="login" onClick={() => setIsRegister(true)}>
                  Register
                </button>
              </form>
            </div>

            {/* REGISTER */}
            <div className="flip-back">
              <h2>Register</h2>

              {registerErrorMessage && <div className="error-message">{registerErrorMessage}</div>}

              <form className="login-form" onSubmit={handleRegister}>
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={registerData.name}
                    className={registerErrors.name ? 'error' : ''}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, name: e.target.value });
                      setRegisterErrors({ ...registerErrors, name: false });
                    }}
                  />
                  {registerErrors.name && <span className="error">{registerErrors.name}</span>}
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={registerData.email}
                    className={registerErrors.email ? 'error' : ''}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, email: e.target.value });
                      setRegisterErrors({ ...registerErrors, email: false });
                    }}
                  />
                  {registerErrors.email && <span className="error">{registerErrors.email}</span>}
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={registerData.password}
                    className={registerErrors.password ? 'error' : ''}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, password: e.target.value });
                      setRegisterErrors({ ...registerErrors, password: false });
                    }}
                  />
                  {registerErrors.password && <span className="error">{registerErrors.password}</span>}
                </div>

                <div className="input-group">
                  <label>Role</label>
                  <select
                    value={registerData.role}
                    className={registerErrors.role ? 'error' : ''}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, role: e.target.value });
                      setRegisterErrors({ ...registerErrors, role: false });
                    }}
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                  {registerErrors.role && <span className="error">{registerErrors.role}</span>}
                </div>

                {(registerData.role === 'admin' || registerData.role === 'staff') && (
                  <div className="input-group">
                    <label>Admin Password</label>
                    <input
                      type="password"
                      value={registerData.adminPassword}
                      className={registerErrors.adminPassword ? 'error' : ''}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, adminPassword: e.target.value });
                        setRegisterErrors({ ...registerErrors, adminPassword: false });
                      }}
                    />
                    {registerErrors.adminPassword && (
                      <span className="error">{registerErrors.adminPassword}</span>
                    )}
                  </div>
                )}

                <button type="submit">Register</button>
                <button type="button" id="login" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="quiet-space"></div>
        </div>
      </div>
    </div>
  );
}

export default App;