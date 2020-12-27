import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut} from './loginManager';
import gmailLogo from '../../logos/google.png';
import './Login.css';
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    localStorage.setItem("name",res.name)
    localStorage.setItem("email",res.email)
    localStorage.setItem("photo",res.photo)
    if(redirect){
        history.replace(from);
    }
  }

  return (
    <div className="login-form">
            <form>
                <p className="form-text login-headline">Login With</p>
                
                <div className="social-btn" onClick={googleSignIn}>
                    <img src = {gmailLogo} className ="icons" /><span className = "text">Continue with Google</span>
                </div>
                
            <div className = "form-text">Don't have an account? <a href="#" >Create an account</a></div>
            </form>
        </div>
  );
}

export default Login;
