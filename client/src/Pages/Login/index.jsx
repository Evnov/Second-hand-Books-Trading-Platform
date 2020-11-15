import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handelSubmit(event) {
    event.preventDefault();
    if (email.length > 0 && password.length > 0) {
      alert("Log In Successfully!");
      history.push("/");
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handelSubmit}>
        <h1>LOG IN</h1>
        <label for="email">
          Email <span className={styles.note}>(please use @uci.edu)</span>
        </label>
        <input
          name="email"
          id="emial"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log in" data-test="submit" />
        <Link to="/signup">
          <p class={styles.link}>Create an account</p>
        </Link>
      </form>
    </div>
  );
}
