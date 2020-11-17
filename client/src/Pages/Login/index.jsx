import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const history = useHistory();

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  const handleLogout = () => {
    setUser();
    setEmail("");
    setPassword("");
    localStorage.clear();
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await axios.post(
      "https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user",
      user
    );
    if (response.data.statusCode === 200) {
      setUser(JSON.parse(response.data.body));
      console.log(JSON.parse(response.data.body));
      localStorage.setItem(
        "user",
        JSON.stringify(JSON.parse(response.data.body))
      );
      history.push("/");
    } else {
      alert("wrong email address or password");
    }

    // if (email.length > 0 && password.length > 0) {
    //   alert("Log In Successfully!");
    //
    // }
  };

  if (user) {
    return (
      <div className={styles.loginPage}>
        <div>
          {user.name} is Logged in
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handelSubmit}>
        <h1>LOG IN</h1>
        <label htmlFor="email">
          Email <span className={styles.note}>(please use @uci.edu)</span>
        </label>
        <input
          name="email"
          id="emial"
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
        <input type="submit" value="Log in" data-test="submit" />
        <Link to="/signup">
          <p className={styles.link}>Create an account</p>
        </Link>
      </form>
    </div>
  );
}
