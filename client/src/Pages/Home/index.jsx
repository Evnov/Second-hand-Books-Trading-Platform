import React, { Component } from 'react';
import styles from './style.module.scss';

export default class Home extends Component{

  render(){

    const catalog = ['Business & Finance', 'Communication & Journalism', 'Computer Science', 'Education', 'Engineering', 'Humanities', 'Law',
  'Medicine & Health', 'Science & Mathematics', 'Social Sciences'];

    return(
      <div className={styles.home}>
        <div className={styles.searchBox}>
          <input className={styles.searchInput}/>
        </div>
        <div className={styles.carousel}></div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books on sale</div>
          <div className={styles.bookList}></div>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books rentals</div>
          <div className={styles.bookList}></div>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Catalog</div>
          <div className={styles.cardList}>
            {catalog.map((name)=>
            <div className={styles.card}>
              {name}
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}