import React, { Component } from "react";
import Slider from 'infinite-react-carousel';
import styles from "./style.module.scss";
import b1 from '../../Assets/images/banner1.jpg';
import b2 from '../../Assets/images/banner2.jpg';
import b3 from '../../Assets/images/banner3.jpg';
import {FaChevronRight} from 'react-icons/fa';

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
    const fakebooks = [
      {title: 'Algorithms to Live By', price:'9.99'}, 
      {title: 'Cracking the Coding Interview', price:'9.99'}, 
      {title: 'Kubeflow for Machine Learning', price:'9.99'}, 
      {title: 'Artificial Intelligence in Finance', price:'9.99'},
      {title: 'Hands-On Machine Learning with C++', price:'9.99'}];

    return (
      <div className={styles.home}>
        <div className={styles.carousel}>
        {/* <Slider arrows={false} autoplay={true}> */}
            <img className={styles.banner} src={b1} />
            {/* <img className={styles.banner} src={b2} />
            <img className={styles.banner} src={b3} /> */}
        {/* </Slider> */}
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books on sale</div>
          {/* <Slider slidesPerRow={4} prevArrow={<div/>} nextArrow={<FaChevronRight color='#666'/>}>
            {fakebooks.map((book, index)=>
              <div className={styles.book} key={index}>
                <div className={styles.fakeCover} />
                  <div className={styles.title}>{book.title}</div>
                  <div className={styles.price}>${book.price}</div>
              </div>
            )}
          </Slider> */}
          <div className={styles.viewAll}>View All</div>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books rentals</div>
          {/* <Slider slidesPerRow={4} prevArrow={<div/>} nextArrow={<FaChevronRight color='#666'/>}>
            {fakebooks.map((book, index)=>
              <div className={styles.book} key={index}>
                <div className={styles.fakeCover} />
                  <div className={styles.title}>{book.title}</div>
                  <div className={styles.price}>${book.price}</div>
              </div>
            )}
          </Slider> */}
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
        <div className={styles.gap}></div>
      </div>
    );
  }
}
