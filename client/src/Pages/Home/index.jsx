import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import b1 from '../../Assets/images/banner1.jpg';
import books from "../../Component/MockBookList";
import b2 from '../../Assets/images/banner2.jpg';
import b3 from '../../Assets/images/banner3.jpg';
import { BiAtom, BiBookBookmark, BiPen, BiCog, BiPalette, BiWorld } from "react-icons/bi";

export default class Home extends Component {
  render() {
    const catalog = [{name:"Business", icon:(<BiPen className={styles.cardicon}/>)},
    {name:"Art", icon:(<BiPalette className={styles.cardicon}/>)},
    {name:"Engineering", icon:(<BiCog className={styles.cardicon}/>)},
    {name:"Social", icon:(<BiWorld className={styles.cardicon}/>)},
    {name:"Law", icon:(<BiBookBookmark className={styles.cardicon}/>)},
    {name:"Science", icon:(<BiAtom className={styles.cardicon}/>)},
    ];
    let salebooks = books.filter(item => {
      return item.for === "sale";
    });
    let rentalbooks = books.filter(item => {
      return item.for === "rent";
    })

    return (
      <div className={styles.home}>
        <div className={styles.carousel}>
          <img className={styles.banner} src={b1} />
          {/* <img className={styles.banner} src={b2} />
          <img className={styles.banner} src={b3} />  */}
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books on sale</div>
          <div className={styles.booklist}>
            {salebooks.map((book, index)=>
              <div className={styles.book} key={index}>
                <img className={styles.fakeCover} src={book.image} />
                  <div className={styles.title}>{book.title}</div>
                  <div className={styles.price}>${book.price}</div>
              </div>
            )}
          </div>
          <Link to='/sale'><div className={styles.viewAll}>View All</div></Link>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Books rentals</div>
          <div className={styles.booklist}>
            {rentalbooks.map((book, index)=>
              <div className={styles.book} key={index}>
                <img className={styles.fakeCover} src={book.image} />
                  <div className={styles.title}>{book.title}</div>
                  <div className={styles.price}>${book.price}</div>
              </div>
            )}
            </div>
            <Link to='/rental'><div className={styles.viewAll}>View All</div></Link>
        </div>

        <div className={styles.homeModule}>
          <div className={styles.moduleTitle}>Catalog</div>
          <div className={styles.cardList}>
            {catalog.map((cata) => (
              <div className={styles.card} key={cata.name}>
                {cata.icon}
                {cata.name}</div>
            ))}
          </div>
        </div>
        <div className={styles.gap}></div>
      </div>
    );
  }
}
