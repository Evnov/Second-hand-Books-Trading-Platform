import React, { Component } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";

class SearchResult extends Component {
  render() {
    const { items, query } = this.props.location;
    return (
      <div className={styles.search}>
        {items === undefined ? (
          <h3>0 searching results for "{query}":</h3>
        ) : (
          <div>
            <h3>
              {items.length} searching results for "{query}":
            </h3>
            <BookList items={items} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchResult;
