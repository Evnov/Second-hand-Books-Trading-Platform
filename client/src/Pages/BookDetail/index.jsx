import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useParams, Link } from "react-router-dom";

export default function Login() {
  const { bookID } = useParams();
  const [user, setUser] = useState();

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  return (
    <div className={styles.bookdetailPage}>
      <h1>book id: {bookID}</h1>
      {user === undefined ? (
        <h2>
          <Link to="/login" className={styles.link}>Login to</Link> get saler's contact info
        </h2>
      ) : (
        <div>saler contact info: xxxx</div>
      )}
    </div>
  );
}
