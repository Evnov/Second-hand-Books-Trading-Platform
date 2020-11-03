import React, { Component } from "react";
import styles from "./style.module.scss";

class SearchResult extends Component {
  render() {
    return (
      <div className={styles.search}>
        <h3>
          {this.props.location.items.length} searching results for "
          {this.props.location.query}":
        </h3>
        <div className={styles.books}>
          {this.props.location.items.map((item, index) => {
            let { title, imageLink, infoLink } = item.volumeInfo;
            return (
              <div className={styles.bookDiv} key={index}>
                <header className={styles.bookTitle}>{title}</header>
                <footer className={styles.bookIndex}>{index + 1}</footer>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchResult;
