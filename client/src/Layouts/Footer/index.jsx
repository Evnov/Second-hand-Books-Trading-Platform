import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";

function Footer() {
  const Copyright = () => {
    return (
      <p className={styles.copyright}>
        {"Copyright © "}
        UCI SecondBook {new Date().getFullYear()}
        {"."}
      </p>
    );
  };
  return (
    <div className={styles.footer}>
      <Copyright />
    </div>
  );
}

export default withRouter(Footer);
