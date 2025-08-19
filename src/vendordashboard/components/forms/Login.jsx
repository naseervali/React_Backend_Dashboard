import React from 'react'
import { API_URL } from '../../data/ApiPath'
import { useState } from 'react'
const Login = ({ showWelcomeHandler , showRegisterHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert("login success");
        setEmail("")
        setPassword("")
        localStorage.setItem('loginToken', data.token);
      

      }
      const vendorId = data.vendorId
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorfirmName=vendorData.vendor.firm[0].firmName;
        // console.log(vendorfirmName);
        // console.log(vendorFirmId)
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName',vendorfirmName);
        window.location.reload()
      }

    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div className="loginSection">

      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>
          Email
        </label>
        <input type='email' name='email' value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder='Enter Your email'></input><br />
        <label>
          Password
        </label>
        <input type='password' name="password" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder='Enter Your Password'></input><br />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
        <p
            onClick={() => {
              showRegisterHandler();   // show login form     // try closing current tab
            }}
           style={{cursor:'pointer'}}>
          Don't have  an account ! Click here to Register
          </p>
      </form>
    </div>
  )
}

export default Login
