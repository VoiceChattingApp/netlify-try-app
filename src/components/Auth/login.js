import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./login.module.css";
import { loggedInUser } from "../../atom/globalState";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css";
const Login = () => {
  const [login, setlogin] = useState(false);
  const changelogin = () => {
    setlogin((p) => !p);
  };
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();
  const emailName = useRef();
  const passwordsignup = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandlerSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: emailName.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: passwordsignup.current.value,
    };

    axios
      .post("https://chat-lg.azurewebsites.net/register", userData)
      .then((response) => {
        toast.success(
          "User created successfully!!! Check your email to verify your email address",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error in creating user", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setLoading(false);
      });
  };
  const submitHandlerLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: userName.current.value,
      password: password.current.value,
    };

    axios
      .post("https://chat-lg.azurewebsites.net/authenticate", userData)
      .then((response) => {
        authCtx.login(response.data.token);

        localStorage.setItem("token", response.data.token);
        
        console.log(response.data.user);
        setCurrentUser(response.data.user);
        toast.success("Successfully Logged In", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setLoading(false);
        history.replace("/chatpage");
      })
      .catch((err) => {
        toast.error("Invalid username or password!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setLoading(false);
      });
  };
  return (
    <div className={classes.flexing}>
      <div
        className={`${classes.container} ${
          login ? classes["right-panel-active"] : ""
        }`}
      >
        <div
          className={`${classes["form-container"]} ${classes["sign-up-container"]}`}
        >
          <form className={classes.form} onSubmit={submitHandlerSignup}>
            <h1>Create Account</h1>
            <div className={classes["social-container"]}>
              {/* <a href="#" className={classes.social}>
                <i className="fa-facebook-f"></i>
              </a>
              <a href="#" className={classes.social}>
                <i className="fa-google-plus-g"></i>
              </a>
              <a href="#" className={classes.social}>
                <i className="fa-linkedin-in"></i>
              </a> */}
            </div>

            <input
              type="text"
              className={classes.input}
              ref={firstName}
              required
              placeholder="First Name"
            />
            <input
              className={classes.input}
              type="text"
              ref={lastName}
              required
              placeholder="Last Name"
            />
            <input
              className={classes.input}
              type="email"
              id="email"
              ref={emailName}
              required
              placeholder="Email"
            />
            <input
              className={classes.input}
              type="password"
              id="password"
              ref={passwordsignup}
              required
              placeholder="Password"
            />
            {!loading && <button className={classes.button}>Sign Up</button>}
            {loading && <div className={classes["lds-dual-ring"]}></div>}
          </form>
        </div>

        <div
          className={`${classes["form-container"]} ${classes["sign-in-container"]}`}
        >
          <form className={classes.form} onSubmit={submitHandlerLogin}>
            <h1>Sign in</h1>
            <div className={classes["social-container"]}>
              {/* <a href="#" className={classes.social}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={classes.social}>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className={classes.social}>
                <i className="fab fa-linkedin-in"></i>
              </a> */}
            </div>
            <input
              className={classes.input}
              type="email"
              id="email"
              ref={userName}
              required
              placeholder="Email"
            />
            <input
              className={classes.input}
              type="password"
              id="password"
              ref={password}
              required
              placeholder="Password"
            />{" "}
            <a href="#">Forgot your password?</a>
            {!loading && <button className={classes.button}>Sign In</button>}
            {loading && <div className={classes["lds-dual-ring"]}></div>}
          </form>
        </div>

        <div className={classes["overlay-container"]}>
          <div className={classes.overlay}>
            <div
              className={`${classes["overlay-panel"]} ${classes["overlay-left"]}`}
            >
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={`${classes.ghost} ${classes.button}`}
                onClick={changelogin}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div
              className={`${classes["overlay-panel"]} ${classes["overlay-right"]}`}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className={`${classes.ghost} ${classes.button}`}
                onClick={changelogin}
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
