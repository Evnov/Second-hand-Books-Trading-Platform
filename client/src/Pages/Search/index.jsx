import React, { Component } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";

class SearchResult extends Component {
  render() {
    const { items, query, select } = this.props.location;
    const pair = {
      Title: "Book Title",
      Subtitle: "Book Author",
      BookCondition: "Book Condition",
    };
    return (
      <div className={styles.search}>
        {items === undefined ? (
          <h3>
            0 searching results for {pair[select]} - {query}:
          </h3>
        ) : (
          <div>
            <h3>
              {items.length} searching results for {pair[select]} - {query}:
            </h3>
            <BookList items={items} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchResult;
