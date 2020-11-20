import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Profile from "../Profile";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";

export default function Login() {
  const [onFetching, setOnFetching] = useState(false);
  const {state, dispatch} = useContext(AuthContext);
  const history = useHistory();
  if(!state.user){
    history.push("/");
  }

  const handleLogout = () => {
    dispatch({type:'LOGOUT'});
  }; 


  if (onFetching) {
    return <Loading onLoading={onFetching} />;
  } else {
      return (
        <div className={styles.loginPage}>

        </div>
      );

  }
}
