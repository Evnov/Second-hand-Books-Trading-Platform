import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

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

  function handleSubmit() {
    if (emailValidator() && passwordValidator()) {
      let userInfo = user;
      userInfo.email = email;
      userInfo.password = password;
      fetch(
        "https://cgf4kyi62h.execute-api.us-west-2.amazonaws.com/test/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
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

  return (
    <div className={styles.signup}>
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <label htmlFor="email">
          Email <span className={styles.note}>(please use @uci.edu)</span>
        </label>
        <input
          name="email"
          id="emial"
          type="email"
          // pattern="[\w\d]+(@uci\.edu)$"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
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
          type="number"
          required
          onChange={(e) => setUser({ phone: e.target.value })}
        />
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
