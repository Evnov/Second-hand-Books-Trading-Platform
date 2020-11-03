import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";
import { FaRegStar, FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
// https://react-icons.github.io/react-icons/icons?name=fa

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      query: "",
      items: [],
    };
  }

  search() {
    const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
    fetch(`${API_URL}${this.state.query}`)
      .then((response) => response.json())
      .then((json) => {
        let { items } = json;
        console.log(json);
        this.setState({ items });
      })
      .catch((err) => {
        alert("Error!", err);
      });
  }

  handleSearchClick = () => {
    this.search();
    var input = document.getElementById("input");

    setTimeout(() => {
      this.props.history.push({
        pathname: "/search",
        items: this.state.items,
        query: this.state.query,
      });
      input.value = "";
    }, 1000);
    // if (this.state.items) {
    //   this.props.history.push({
    //     pathname: "/search",
    //     items: this.state.items,
    //   });
    // }
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
          <FaRegUser color="white" className={styles.faIcon} />
        </div>
        <div className={styles.iconWrapper}>
          <FaRegStar color="white" className={styles.faIcon} />
        </div>
        <div className={styles.iconWrapper}>
          <FaRegBell color="white" className={styles.faIcon} />
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
