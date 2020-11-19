import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";
import { FaRegStar, FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Loading from "../../Component/onLoading";
// https://react-icons.github.io/react-icons/icons?name=fa

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      query: "",
      items: [],
      // onFetching: false,
    };
  }

  search() {
    const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
    // this.setState({ onFetching: true });
    fetch(`${API_URL}${this.state.query}`)
      .then((response) => response.json())
      .then((json) => {
        let { items } = json === null ? [] : json;
        console.log(json);
        this.setState({ items });
      })
      .then(() => {
        // this.setState({ onFetching: false });
        this.props.history.push({
          pathname: "/search/" + this.state.query,
          items: this.state.items,
          query: this.state.query,
        });
        document.getElementById("input").value = "";
        this.setState({ query: "" });
      })
      .catch((err) => {
        alert("Error:", err);
      });
  }

  handleSearchClick = () => {
    this.search();
  };

  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.navItem}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.navItem}>
          <Link to="/sale">Sale</Link>
        </div>
        <div className={styles.navItem}>
          <Link to="/rental">Rental</Link>
        </div>
        <div className={styles.iconWrapper}>
          <Link to="/login">
            <FaRegUser color="white" className={styles.faIcon} />
          </Link>
        </div>
        <div className={styles.iconWrapper}>
          <Link to="/watchlist">
            <FaRegStar color="white" className={styles.faIcon} />
          </Link>
        </div>
        <div className={styles.iconWrapper}>
          <Link to="/message">
            <FaRegBell color="white" className={styles.faIcon} />
          </Link>
        </div>
        <div className={styles.searchBox}>
          <input
            id="input"
            className={styles.searchInput}
            onChange={(event) => this.setState({ query: event.target.value })}
            onKeyPress={(event) => {
              if ("Enter" === event.key) {
                this.handleSearchClick();
              }
            }}
          />
          <div className={styles.searchIconWrapper}>
            <FiSearch
              color="white"
              className={styles.faIcon}
              onClick={this.handleSearchClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
