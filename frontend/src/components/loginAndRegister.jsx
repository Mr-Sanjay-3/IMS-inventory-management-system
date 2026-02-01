import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../SCSS/login.scss';

//Axios Config Importing
import {loginUser, registerUser }from '../api/axios'

function App() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  // LOGIN STATE
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({});

  // REGISTER STATE
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [registerErrors, setRegisterErrors] = useState({});

  // LOGIN SUBMIT
  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!loginData.email) errors.email = true;
    if (!loginData.password) errors.password = true;

    setLoginErrors(errors);

    if (Object.keys(errors).length !== 0) return;


  try {
    const res = await loginUser(loginData);

    //Token Save On Local Storage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    console.log("Login Success", res.data);
     
    //affter login Fix as Admin or Staff

   if (res.data.user.role === "admin") {
    navigate("/admin")
    
   }else{
    navigate("/staff")
   }
    
  } catch (error) {
    console.log(error);
    alert(error.respose?.data?.msg || "Login Faild")
    
  }  
  
   

};

  // REGISTER SUBMIT
  const handleRegister = async(e) => {
    e.preventDefault();

    const errors = {};
    if (!registerData.name) errors.name = true;
    if (!registerData.email) errors.email = true;
    if (!registerData.password) errors.password = true;
    if (!registerData.role) errors.role = true;

    setRegisterErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      const res = await registerUser(registerData);
      console.log("Register Done", res.data);

      //Move Back Login
      setIsRegister(false)
      
    } catch (error) {
      console.log(error.response?.dtata?.msg || "Register fialid");
      
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
                </div>

                <button type="submit">Login</button>
                <button
                  type="button"
                  id="login"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </form>
            </div>

            {/* REGISTER */}
            <div className="flip-back">
              <h2>Register</h2>

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
                    <option value="" id='select'>Select role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <button type="submit">Register</button>
                <button
                  type="button"
                  id="login"
                  onClick={() => setIsRegister(false)}
                >
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
