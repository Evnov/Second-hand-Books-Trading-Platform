import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
import querystring from "querystring";
// import axios from "axios";

export default function Login() {
  const [onlogin, setOnlogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onFetching, setOnFetching] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  function emailValidator() {
    let regex = /[\w\d]+(@uci\.edu)$/;
    if (regex.test(email)) {
      return true;
    } else {
      alert("please use @uci.edu!");
      return false;
    }
  }

  function passwordValidator() {
    if (password.length >= 6 && password === confirmPassword) {
      return true;
    } else {
      alert("please check your password!");
      return false;
    }
  }

  //https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    setOnFetching(true);
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/user/login.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(user),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOnFetching(false);
        console.log(data);
        let userinfo = data.data;
        console.log("Success:", userinfo);
        dispatch({ type: "LOGIN", data: userinfo });
        history.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleSignup(e) {
    e.preventDefault();
    if (emailValidator() && passwordValidator()) {
      let user = { email, password, username, phone };
      console.log(querystring.stringify(user));
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/user/register.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify(user),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let response = data.msg;
          console.log(response);
          dispatch({ type: "LOGIN", data: response });
          history.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(error);
        });
    }
  }

  if (onFetching) {
    return (
      <div className={styles.loginPage}>
        <Loading onLoading={onFetching} />;
      </div>
    );
  } else {
    // if (state.user) {
    //   return (
    //     <div className={styles.loginPage}>
    //       <div>
    //         <h1 className={styles.greet}>Hello, {state.user.name}</h1>
    //         <button className={styles.logoutBtn} onClick={handleLogout}>
    //           Sign out
    //         </button>
    //         <Profile user />
    //       </div>
    //       <div className={styles.gap}></div>
    //     </div>
    //   );
    // }

    return (
      <div className={styles.loginPage}>
        <form onSubmit={onlogin ? handleLogin : handleSignup}>
          {onlogin ? <h1>SIGN IN</h1> : <h1>SIGN UP</h1>}
          <label htmlFor="email">
            Email address <span className={styles.note}> ( @uci.edu )</span>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            autocomplete="off"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {!onlogin && (
            <div>
              <label htmlFor="username">UserName</label>
              <input
                name="username"
                id="username"
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="phone">Phone number</label>
              <input
                name="phone"
                id="phone"
                type="text"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
          <label htmlFor="password">
            Password{" "}
            {onlogin ? (
              ""
            ) : (
              <span className={styles.note}> ( at least 6 characters )</span>
            )}
          </label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {!onlogin && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                minLength="6"
                maxLength="20"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <input type="submit" value={onlogin ?"Sign in":"Sign up"} data-test="submit" />
          {onlogin ? (
            <p className={styles.link} onClick={() => setOnlogin(!onlogin)}>
              Create an account
            </p>
          ) : (
            <p className={styles.link} onClick={() => setOnlogin(!onlogin)}>
              Already have an account? Sign in
            </p>
          )}
        </form>
      </div>
    );
  }
}
