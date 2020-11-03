import React, { Component } from "react";
import styles from "./style.module.scss";

export default class Home extends Component {
  render() {
    const catalog = [
      "Business",
      "Communication & Journalism",
      "Computer Science",
      "Education",
      "Engineering",
      "Humanities",
      "Law",
      "Medicine",
      "Science",
      "Social",
    ];

    return (
      <div className={styles.home}>
        <div className={styles.carousel}>Banner</div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books on sale</div>
          <div className={styles.viewAll}>View All</div>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books rentals</div>
          <div className={styles.bookList}></div>
          <div className={styles.viewAll}>View All</div>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Catalog</div>
          <div className={styles.cardList}>
            {catalog.map((name) => (
              <div className={styles.card} key={name}>{name}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
