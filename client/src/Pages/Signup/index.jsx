import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    if (password.length > 6 && password === confirmPassword) {
      alert("singup success!");
      history.push("/");
    } else {
      alert("fail to sign up");
    }
  }

  return (
    <div className={styles.signup}>
      <form onSubmit={validateForm}>
        <h1>SIGN UP</h1>
        <label htmlFor="email">
          Email <span className={styles.note}>(please use @uci.edu)</span>
        </label>
        <input
          name="email"
          id="emial"
          type="email"
          pattern="[\w\d]+(@uci\.edu)$"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="firstName">FirstName</label>
        <input name="firstName" id="firstName" type="text" required />
        <label htmlFor="lastName">LastName</label>
        <input name="lastName" id="lastName" type="text" required />
        <label htmlFor="phone">Phone number</label>
        <input name="phone" id="phone" type="number" required />
        <label htmlFor="password">
          Password <span className={styles.note}>(at least 6 characters)</span>
        </label>
        <input
          name="password"
          id="password"
          type="password"
          minLength="6"
          maxLength="20"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <input type="submit" value="Submit" data-test="submit" />
        <Link to="/login">
          <p className={styles.link}>Already have an account? Log in</p>
        </Link>
      </form>
    </div>
  );
}
