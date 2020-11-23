import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";

function AccountNavbar() {
  const addr = window.location.href.split("/").pop();
  const index = ["profile", "watchlist", ""].indexOf(addr);
  return (
    <div className={styles.sidebar}>
      <Link to="/profile">
        <div
          className={styles.menuitem + ` ${index === 0 ? styles.selected : ""}`}
        >
          Profile
        </div>
      </Link>
      <Link to="/watchlist">
        <div
          className={styles.menuitem + ` ${index === 1 ? styles.selected : ""}`}
        >
          Watchlist
        </div>
      </Link>
      <Link>
        <div
          className={styles.menuitem + ` ${index === 2 ? styles.selected : ""}`}
        >
          Bookshelf
        </div>
      </Link>
      <Link to="/post">
        <div
          className={styles.menuitem + ` ${index === 3 ? styles.selected : ""}`}
        >
          Post
        </div>
      </Link>
    </div>
  );
}

export default withRouter(AccountNavbar);
