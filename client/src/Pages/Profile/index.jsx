import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Profile from "../Profile";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function Login() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onFetching, setOnFetching] = useState(false);
  const [userinfo, setUser] = useState({
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
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/user/update_information.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(userinfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/profile");
      })
      .catch((err) => console.log("Error", err));
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const request = {
      email: userinfo.email,
      passwordOld: oldPassword,
      passwordNew: password,
    };
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/user/reset_password.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(request),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/login");
      })
      .catch((err) => console.log("Error", err));
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
                <label htmlFor="userName">UserName</label>
                <input
                  name="userName"
                  id="userName"
                  type="text"
                  value={userinfo.username}
                  required
                  onChange={(e) =>
                    setUser({ ...userinfo, username: e.target.value })
                  }
                />
                <label htmlFor="phone">Phone number</label>
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  value={userinfo.phone}
                  required
                  onChange={(e) =>
                    setUser({ ...userinfo, phone: e.target.value })
                  }
                />
                <input
                  type="submit"
                  value="Update profile"
                  data-test="submit"
                  onClick={handleUpdateProfile}
                />
              </form>
              <form>
                <label htmlFor="oldpassword">Old Password </label>
                <input
                  name="oldpassword"
                  id="oldpassword"
                  type="password"
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <label htmlFor="password">
                  New Password{" "}
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
                <label htmlFor="confirmPassword">Confirm New Password</label>
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
                  onClick={handleUpdatePassword}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
