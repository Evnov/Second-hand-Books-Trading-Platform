import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Profile from "../Profile";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
// import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState();
  const [onFetching, setOnFetching] = useState(false);
  const {state, dispatch} = useContext(AuthContext);
  const history = useHistory();

  // const loggedInUser = localStorage.getItem("user");

  // useEffect(() => {
  //   if (loggedInUser) {
  //     console.log(JSON.parse(loggedInUser));
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  const handleLogout = () => {
    // setUser();
    setEmail("");
    setPassword("");
    // localStorage.clear();
    dispatch({type:'LOGOUT'});
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    setOnFetching(true);
    fetch("https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setOnFetching(false);
        let statusCode = data.statusCode;
        if (statusCode === 200) {
          let userinfo = JSON.parse(data.body);
          console.log("Success:", userinfo);
          // setUser(userinfo);
          // localStorage.setItem("user", JSON.stringify(userinfo));
          dispatch({type: 'LOGIN', data: userinfo});
          history.push("/");
        } else {
          throw new Error(statusCode);
        }
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
  if (onFetching) {
    return <Loading onLoading={onFetching} />;
  } else {
    if (state.user) {
      return (
        <div className={styles.loginPage}>
          <div>
            <h1 className={styles.greet}>Hello, {state.user.name}</h1>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Sign out
            </button>
            <Profile user />
          </div>
          <div className={styles.gap}></div>
        </div>
      );
    }

    return (
      <div className={styles.loginPage}>
        <form onSubmit={handelSubmit}>
          <h1>SIGN IN</h1>
          <label htmlFor="email">
            Email address<span className={styles.note}>ending with @uci.edu</span>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Sign in" data-test="submit" />
          <Link to="/signup">
            <p className={styles.link}>Create an account</p>
          </Link>
        </form>
      </div>
    );
  }
}
