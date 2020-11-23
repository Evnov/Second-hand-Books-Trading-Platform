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
  const [userinfo, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
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
    if (password.length > 6 && password === confirmPassword) {
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
          // "Content-Type": "application/json"
        },
        body: querystring.stringify(user),
        // body: JSON.stringify(user)
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

    // const response = await axios.post(
    //   "https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user",
    //   user
    // );
    // if (response.data.statusCode === 200) {
    //   setUser(JSON.parse(response.data.body));
    //   console.log(JSON.parse(response.data.body));
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify(JSON.parse(response.data.body))
    //   );
    //   history.push("/");
    // } else {
    //   alert("wrong email address or password");
    // }

    // if (email.length > 0 && password.length > 0) {
    //   alert("Sign In Successfully!");
    //
    // }
  };

  function handleSignup() {
    if (emailValidator() && passwordValidator()) {
      userinfo.email = email;
      userinfo.password = password;
      fetch(
        "https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userinfo),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let statusCode = data.statusCode;
          if (statusCode === 200) {
            let response = JSON.parse(data.body);
            console.log("Success:", response);
            history.push("/login");
          } else {
            throw new Error(statusCode);
          }
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
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {!onlogin && (
            <div>
              <label htmlFor="firstName">FirstName</label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                required
                onChange={(e) => setUser({ firstName: e.target.value })}
              />
              <label htmlFor="lastName">LastName</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                required
                onChange={(e) => setUser({ lastName: e.target.value })}
              />
              <label htmlFor="phone">Phone number</label>
              <input
                name="phone"
                id="phone"
                type="text"
                required
                onChange={(e) => setUser({ phone: e.target.value })}
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
            onChange={(e) => setPassword(e.target.value)}
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
          <input type="submit" value="Sign in" data-test="submit" />
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
