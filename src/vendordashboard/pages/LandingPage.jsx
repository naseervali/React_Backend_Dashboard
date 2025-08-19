import React from 'react'
import Navbar from '../components/Navbar'
import Siderbar from '../components/Siderbar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import { useState, useEffect } from 'react';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, SetShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      setShowLogOut(true)

    }

  }, [])

  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    if (firmName) {
      setShowFirmTitle(false);
    }
  }, [])
  const logOutHandler = () => {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowLogOut(false)
    setShowFirmTitle(true)
  }
  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    SetShowWelcome(false);
    setShowAllProducts(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    SetShowWelcome(false);
    setShowAllProducts(false);
  }
  const showFirmHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
    SetShowWelcome(false);
    setShowAllProducts(false);
  }
  else{
    alert("please login")
    setShowLogin(true);
  }
  }
  const showProductHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(true);
    SetShowWelcome(false);
    setShowAllProducts(false);
    }
    else{
     alert("please login")
    setShowLogin(true);
    }
  }
  const showWelcomeHandler = () => {
    setShowRegister(false)
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    SetShowWelcome(true);
    setShowAllProducts(false);
  }
  const showAllProductsHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    SetShowWelcome(false);
    setShowAllProducts(true);
    }
    else{
      alert("please log in");
      setShowLogin(true)
    }
  }
  return (
    <div>
      <>
        <section className='landingSection'>
          <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler} />
          <div className="collectionSection">
            <Siderbar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle} />
            {showLogin && <Login showWelcomeHandler={showWelcomeHandler} showRegisterHandler={showRegisterHandler} />}
            {showRegister && <Register showLoginHandler={showLoginHandler} />}
            {showFirm &&  showLogOut && <AddFirm />}
            {showProduct && showLogOut && <AddProduct />}
            {showWelcome && <Welcome />}
            {showAllProducts && showLogOut && <AllProducts />}

          </div>

        </section>

      </>
    </div>
  )
}

export default LandingPage;
