import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState();
  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);
  if (user) {
    return <div>{user.name} is Logged in.</div>;
  }
  return <div></div>;
}
