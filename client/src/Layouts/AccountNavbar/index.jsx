import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";

function AccountNavbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/login">
        <button> Your Profile </button>
      </Link>
      <Link to="/watchlist">
        <button> Your Watchlist </button>
      </Link>
      <Link>
        <button> Your Booklist </button>
      </Link>
      <Link to="/message">
        <button> Your Message </button>
      </Link>
    </div>
  );
}

export default withRouter(AccountNavbar);
