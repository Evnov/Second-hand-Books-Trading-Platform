import React, { Component } from "react";
import styles from "./style.module.scss";

class SearchResult extends Component {
  render() {
    const { items, query, } = this.props.location;
    return (
      <div className={styles.search}>
        {items.length === 0 ? (
          <h3>0 searching results for "{query}":</h3>
        ) : (
          <div>
            <h3>
              {items.length} searching results for "
              {query}":
            </h3>
            <div className={styles.books}>
              {items.map((item, index) => {
                let { title, authors, publishedDate } = item.volumeInfo;
                return (
                  <div className={styles.bookDiv} key={index}>
                    <div className={styles.bookImg}></div>
                    <div className={styles.bookInfo}>
                      <header className={styles.bookTitle}>{title}</header>
                      <section className={styles.bookAuthor}>
                        {authors === undefined ? "" : authors[0]}
                      </section>
                      <section className={styles.bookPrice}>
                        ${Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                      </section>
                      <section className={styles.bookSection}>
                        Published: {publishedDate}
                      </section>
                      <section className={styles.bookSection}>
                        Department: ICS
                      </section>
                      <section>Course: 260P Application of Algorithm </section>
                    </div>
                    <div className={styles.bookBtn}>
                      <button className={styles.btn}>Add to Cart</button>
                      <button className={styles.btn}>Add to WatchList</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResult;
