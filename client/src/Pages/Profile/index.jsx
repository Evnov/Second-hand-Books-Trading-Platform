import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Profile from "../Profile";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
import AccountNavbar from "../../Layouts/AccountNavbar";

export default function Login() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onFetching, setOnFetching] = useState(false);
  const [userinfo, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
  });
  const { state, dispatch } = useContext(AuthContext);
  const user = state.user;
  const history = useHistory();
  console.log(user);
  useEffect(() => {
    if (!user) {
      dispatch({ type: "CHECK_CACHE" });
    }
    if (!user) {
      history.push("/");
    } else {
      setUser({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  if (onFetching) {
    return (
      <div className={styles.accountPage}>
        <Loading onLoading={onFetching} />
      </div>
    );
  } else {
    return (
      <div className={styles.accountPage}>
        <AccountNavbar index={index} />
        <div className={styles.content}>
          {index === 0 && (
            <div>
              <form>
                <input
                  type="submit"
                  className={styles.whitebtn}
                  value="Log out"
                  data-test="submit"
                  onClick={handleLogout}
                />
              </form>
              <form>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  required
                  disabled
                  value={userinfo.email}
                />
                {/*<label htmlFor="firstName">FirstName</label>
                 <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  value={userinfo.firstname}
                  required
                  onChange={(e) => setUser({ firstName: e.target.value })}
                />
                <label htmlFor="lastName">LastName</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={userinfo.lastname}
                  required
                  onChange={(e) => setUser({ lastName: e.target.value })}
                /> */}
                <label htmlFor="userName">UserName</label>
                <input
                  name="userName"
                  id="userName"
                  type="text"
                  value={userinfo.username}
                  required
                  onChange={(e) => setUser({ username: e.target.value })}
                />
                <label htmlFor="phone">Phone number</label>
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  value={userinfo.phone}
                  required
                  onChange={(e) => setUser({ phone: e.target.value })}
                />
                <input
                  type="submit"
                  value="Update profile"
                  data-test="submit"
                />
              </form>
              <form>
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
                <input
                  type="submit"
                  value="Change password"
                  data-test="submit"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
