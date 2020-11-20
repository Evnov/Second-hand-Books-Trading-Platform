import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import AccountNavbar from "../../Layouts/AccountNavbar";

export default function Message() {
  const [user, setUser] = useState();

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  if (!user) {
    return (
      <div className={styles.messagePage}>
        <h2>
          Please{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>{" "}
          to get your message.
        </h2>
      </div>
    );
  }
  return (
    <div className={styles.messagePage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>Message</h1>
        <div className={styles.list}></div>
      </div>
    </div>
  );
}
