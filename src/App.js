import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeScreen } from './Screens/HomeScreen';
import { NewsUpdatesScreen } from './Screens/NewsUpdatesScreen';
import { DocScreen } from './Screens/DocScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoginUserContext } from './Contexts/loginUserContext';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './Firebase/SetUp';
import GalleryImageUpload from './Screens/GalleryImageUpload';
import MemberShip from './Screens/Memberships';

function App() {

  const [login, setLogin] = useState(false);
  const [crewId, setCrewId] = useState('');
  const [loginSuccessAlert, setloginSuccessAlert] = useState(false);
  const [loginFailAlert, setloginFailAlert] = useState(false);
  const [runloginCheck, setRunLoingCheck] = useState(false);
  const { User, setUser } = useLoginUserContext(); // Use context here

  const [screen, setScreen] = useState('home');
  const [hideButtons, setHideButtons] = useState(false);

  // ----- X -------  login + otp ----- X ------- 

  const loginAccess = ["+919398263414", "+918099712349", "+918978280654", "+918978080143", "+919959866899", "+919985772728", "+919515121664"];

  const handleLogin = () => {
    const matchedID = loginAccess.find(id => id.toLowerCase() === crewId.toLowerCase());
    const isAccessGranted = Boolean(matchedID);

    setLogin(isAccessGranted);

    if (isAccessGranted) {
      setloginSuccessAlert(true);
      setTimeout(() => {
        setloginSuccessAlert(false);
      }, 3000);

      setUser(matchedID);
      localStorage.setItem('ecrosuadminappLogin', matchedID);
    } else {
      setloginFailAlert(true);
      setTimeout(() => {
        setloginFailAlert(false);
      }, 4000);
    }
  };

  //----- X ------- 

  setTimeout(() => {
    setRunLoingCheck(!runloginCheck);
  }, 5000);

  //----- X ------- 

  useEffect(() => {
    const storedValue = localStorage.getItem('ecrosuadminappLogin');
    if (storedValue) {
      const matchedID = loginAccess.find(id => id.toLowerCase() === storedValue.toLowerCase());
      const allReadyLoggedIn = Boolean(matchedID);
      if (allReadyLoggedIn) {
        setLogin(true);
        setUser(PhoneNoToName(storedValue));
      }
    } else {
      setLogin(false);
    }
  }, [runloginCheck]); // this runs for every 5 secs 

  // ----- X ------- 

  const handleLogOut = () => {
    localStorage.removeItem("ecrosuadminappLogin");
    window.location.reload();
  }

  //----- X ------- 

  const [phone, setPhone] = useState('');
  const [userOtp, setUserOtp] = useState(null);
  const [otp, setOtp] = useState('');

  const sendOtp = async () => {
    setHideButtons(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("reCAPTCHA solved, response:", response)
        }
      })

      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUserOtp(confirmation);

      console.log(confirmation);
    } catch (err) {
      console.error(err)
    }
  }

  // ----- X ------- 

  // const sendOtp = async () => {
  //   try {
  //     const recaptcha = new RecaptchaVerifier('recaptcha', {
  //       'size': 'visible',
  //       'callback': (response) => {
  //         // reCAPTCHA solved - this function will be executed.
  //         console.log("reCAPTCHA solved, response:", response)
  //       }
  //     }, auth);

  //     recaptcha.render().then((widgetId) => {
  //       window.recaptchaWidgetId = widgetId;
  //     });

  //     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
  //     setUserOtp(confirmation);
  //     console.log(confirmation);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //----- X ------- 

  const verifyOtp = async () => {
    try {
      const data = await userOtp.confirm(otp);

      console.log(data, "logged in");
      localStorage.setItem('ecrosuadminappLogin', phone)
      setUser(PhoneNoToName(phone));
      setLogin(true);
    } catch (err) {
      console.error(err);
      alert('Requst Failed');
    }
  }

  //----- X ------- 

  function PhoneNoToName(number) {
    if (number === '+919398263414') {
      return 'Nagendra Yakkaladevara'
    }
    if (number === '+918099712349') {
      return 'Y S Prabhu'
    }
    if (number === '+918978280654') {
      return 'Y S Prabhu'
    }
    if (number === '+918978080143') {
      return 'RVSS Rao'
    }
    if (number === '+919959866899') {
      return 'GVSAR Varma'
    }
    if (number === '+919985772728') {
      return 'KV Chalapathi Rao'
    }
    if (number === '+919515121664') {
      return 'CHK Swamy'
    }
  }

  //----- X ------- 
  // ------ X ------- till here ----- X ------- 


  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClickOutside = (event) => {
    if (isNavOpen && !document.getElementById('navbarNav').contains(event.target)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isNavOpen]);

  const handleLoginCheck = () => {
    const matchedID = loginAccess.find(id => id.toLowerCase() === phone.toLowerCase());
    const allReadyLoggedIn = Boolean(matchedID);
    if (!allReadyLoggedIn) {
      alert("You Dont have Access to this application");
    }
  }


  return (
    <>
      {!login ? (<>
        <div className='LoginPage'>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }} >
            {loginFailAlert &&
              <div class="alert alert-danger FontFamliy" role="alert" style={{ position: 'absolute' }}>
                Failed To login ! <br />You dont have Access to this Application
              </div>
            }

          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: '10px' }}>
            <div className="card text-center">
              <div className="card-header">
                Login
              </div>
              <div className="card-body">
                <h5 className="card-title ">Welcome to ECoRSU App Admin Application</h5>
                <p className="card-text">Please enter your Mobile Number</p>
                {!hideButtons && (<>
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={(phone) => setPhone("+" + phone)}
                    onBlur={handleLoginCheck}
                  />
                  <button type="button" class="btn btn-warning mt-3" onClick={sendOtp} disabled={!loginAccess.includes(phone)}>Send OTP</button>
                </>)}

                <div id='recaptcha' style={{ display: 'flex', justifyContent: 'center', margin: "10px" }}></div>

                {hideButtons && (
                  <>
                    <div class="mb-3">
                      <input type="text" onChange={(e) => setOtp(e.target.value)} className="form-control" placeholder="Enter OTP" />
                    </div>
                    <button type="button" class="btn btn-warning m-1" onClick={verifyOtp}>Verify OTP</button>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </>) : (<>


        <nav className="navbar navbar-expand-lg bg-body-tertiary FontFamliy">
          <div className="container-fluid">
            <p className="navbar-brand" onClick={() => setScreen('home')} style={{ display: 'flex', alignItems: 'center', margin: '0px' }}>ECoRSU App Admin Panel</p>
            <button className="navbar-toggler" type="button" onClick={toggleNav} aria-expanded={isNavOpen ? 'true' : 'false'}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav">
                <li className={`${(screen === 'home') ? "btn btn-outline-success" : "btn btn-outline-warning"}`} onClick={() => { setScreen('home'); toggleNav() }} style={{ margin: '10px', cursor: "pointer" }}>
                  Home
                </li>
                <li className={`${(screen === 'updates') ? "btn btn-outline-success" : "btn btn-outline-warning"}`} onClick={() => { setScreen('updates'); toggleNav() }} style={{ margin: '10px', cursor: "pointer" }}>
                  Union Updates
                </li>
                <li className={`${(screen === 'doc') ? "btn btn-outline-success" : "btn btn-outline-warning"}`} onClick={() => { setScreen('doc'); toggleNav() }} style={{ margin: '10px', cursor: "pointer" }}>
                  Documents
                </li>
                <li className={`${(screen === 'gallery') ? "btn btn-outline-success" : "btn btn-outline-warning"}`} onClick={() => setScreen('gallery')} style={{ margin: '10px', cursor: "pointer", display: "none" }}>
                  Gallery Upload
                </li>
                <li className={`${(screen === 'Memberships') ? "btn btn-outline-success" : "btn btn-outline-warning"}`} onClick={() => { setScreen('Memberships'); toggleNav() }} style={{ margin: '10px', cursor: "pointer" }}>
                  Memberships
                </li>
              </ul>
              <button type="button" className="btn btn-warning" onClick={handleLogOut}>{User} - Log Out</button>
            </div>
          </div>
        </nav>
        <div>
          {loginSuccessAlert &&
            <div class="alert alert-primary" role="alert" style={{ margin: '10px' }}>
              Successfully logged in as <b>{User}</b>
            </div>
          }
        </div>

        {screen === 'home' && (
          <>
            <HomeScreen />
          </>
        )}
        {screen === 'updates' && (
          <>
            <NewsUpdatesScreen />
          </>
        )}
        {screen === 'doc' && (
          <>
            <DocScreen />
          </>
        )}
        {screen === 'gallery' && (
          <>
            <GalleryImageUpload />
          </>
        )}
        {screen === 'Memberships' && (
          <>
            <MemberShip />
          </>
        )}

      </>)}
    </>
  );
}

export default App;
