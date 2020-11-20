import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import AccountNavbar from "../../Layouts/AccountNavbar";
import { useHistory } from "react-router-dom";

export default function Profile(props) {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  if (user) {
    return (
      <div className={styles.profile}>
        <div className={styles.navbar}>
          {/* {user.name} is Logged in. */}
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <header>Your Details</header>
          <form>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              disabled
              value={user.email}
            />
            <label htmlFor="firstName">FirstName</label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              value={user.firstname}
              required
              onChange={(e) => setUser({ firstName: e.target.value })}
            />
            <label htmlFor="lastName">LastName</label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              value={user.lastname}
              required
              onChange={(e) => setUser({ lastName: e.target.value })}
            />
            <label htmlFor="phone">Phone number</label>
            <input
              name="phone"
              id="phone"
              type="number"
              value={user.phone}
              required
              onChange={(e) => setUser({ phone: e.target.value })}
            />
            <label htmlFor="password">
              Password{" "}
              <span className={styles.note}>(at least 6 characters)</span>
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
            <input type="submit" value="Save Changes" data-test="submit" />
          </form>
        </div>
      </div>
    );
  }
  return <div></div>;
}
