import React from 'react'
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
  const firmName=localStorage.getItem('firmName');
  return (
    <div className='navSection'>
        <div className="company">
            Vendor Dashboard
        </div>
        <div className="firmName">
          <h4 style={{color:"#F2BB59"}}>FirmName :<span style={{color:"#29335C", backgroundColor:"white"}}>{firmName}</span></h4>
        </div>
        <div className="userAuth">
          {!showLogOut ? 
          <>
            <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </> :  <span onClick={logOutHandler}><LogoutIcon  style={{ cursor: "pointer", color: "red" }} />Logout</span>
          }
          
          
           
        </div>
      
    </div>
  )
}

export default Navbar;
