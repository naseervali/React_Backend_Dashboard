import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/ApiPath';
const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  // const[error,SetError]=useState("")
  // const[loading,setLoading]=useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json()
      if (response.ok) {
        console.log(data);
        setUsername("")
        setEmail("")
        setPassword("")
        alert("Vendor Registered Success")
        showLoginHandler()


      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed")
    }
  }
  return (
    <div className="registerSection">

      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label>
          Name
        </label>
        <input type='text' value={username} placeholder='Enter Your Name' name='username' onChange={(e) => {
          setUsername(e.target.value)
        }}></input><br />
        <label>
          Email
        </label>
        <input type='email' value={email} placeholder='Enter Your email' name='email' onChange={(e) => {
          setEmail(e.target.value)
        }}></input><br />
        <label>
          Password
        </label>
        <input type='password' value={password} placeholder='Enter Your Password' name='password' onChange={(e) => {
          setPassword(e.target.value)
        }}></input><br />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
         

        </div>
 <p
            onClick={() => {
              showLoginHandler();   // show login form     // try closing current tab
            }}
           style={{cursor:'pointer'}}>
          Have an account ! Click here to Login
          </p>
      </form>
    </div>
  )
}

export default Register
