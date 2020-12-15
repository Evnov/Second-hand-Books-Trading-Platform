import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Storage } from "aws-amplify";
import styles from "./style.module.scss";
import b1 from "../../Assets/images/banner1.jpg";
import {
  BiAtom,
  BiBookBookmark,
  BiPen,
  BiCog,
  BiPalette,
  BiWorld,
  BiBaseball,
  BiHealth,
  BiBook,
  BiMale,
  BiDotsHorizontalRounded,
} from "react-icons/bi";

export default function Home() {
  const [salebook, setSalebook] = useState([]);
  const [rentbook, setRentbook] = useState([]);
  const [rurl, setrurl] = useState([]);
  const [surl, setsurl] = useState([]);

  useEffect(()=>{
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/book/get_allBooks.do",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let sale = data.data.filter((item) => item.status === 1&&item.stock>0).slice(0, 5);
        let rent = data.data.filter((item) => item.status === 0&&item.stock>0).slice(0, 5);
        function seturl(nam){
          return Promise.resolve(nam).then((key)=>Storage.get(key));
        } 
        Promise.all(rent.map((r)=>seturl(r.bookImage))).then((urls)=>{
          setrurl(urls);
        });
        Promise.all(sale.map((r)=>seturl(r.bookImage))).then((urls)=>{
          setsurl(urls);
        });
        setSalebook(sale);
        setRentbook(rent);
      });
  }, []);

  const catalog = [
    {
      name: "Arts",
      id: "100004",
      icon: <BiPalette className={styles.cardicon} />,
    },
    {
      name: "Athletics",
      id: "100005",
      icon: <BiBaseball className={styles.cardicon} />,
    },
    {
      name: "Science",
      id: "100006",
      icon: <BiAtom className={styles.cardicon} />,
    },
    {
      name: "Business",
      id: "100007",
      icon: <BiPen className={styles.cardicon} />,
    },
    {
      name: "Education",
      id: "100008",
      icon: <BiBook className={styles.cardicon} />,
    },
    {
      name: "Engineering",
      id: "100009",
      icon: <BiCog className={styles.cardicon} />,
    },
    {
      name: "Health & Medicine",
      id: "100010",
      icon: <BiHealth className={styles.cardicon} />,
    },
    {
      name: "Humanities",
      id: "100011",
      icon: <BiMale className={styles.cardicon} />,
    },
    {
      name: "Law",
      id: "100012",
      icon: <BiBookBookmark className={styles.cardicon} />,
    },
    {
      name: "Social Sciences",
      id: "100013",
      icon: <BiWorld className={styles.cardicon} />,
    },
    {
      name: "Others",
      id: "100014",
      icon: <BiDotsHorizontalRounded className={styles.cardicon} />,
    },
  ];

  return(
    <div className={styles.home}>
    <div className={styles.carousel}>
      <img className={styles.banner} src={b1} />
    </div>

    <div className={styles.homeModule}>
      <div className={styles.moduleTitle}>Books on sale</div>
      <div className={styles.booklist}>
        {salebook.map((book, index) => (
          <div className={styles.book} key={index}>
            <Link to={"/bookdetail/" + book.id}>
              <img
                className={styles.fakeCover}
                src={surl[index]}
              />
            </Link>
            <div className={styles.title}>{book.title}</div>
            <div className={styles.price}>${book.price}</div>
          </div>
        ))}
      </div>
      <Link to="/sale">
        <div className={styles.viewAll}>View All</div>
      </Link>
    </div>

    <div className={styles.homeModule}>
      <div className={styles.moduleTitle}>Book rentals</div>
      <div className={styles.booklist}>
        {rentbook.map((book, index) => (
          <div className={styles.book} key={index}>
            <Link to={"/bookdetail/" + book.id}>
              <img
                className={styles.fakeCover}
                src={rurl[index]}
              />
            </Link>
            <div className={styles.title}>{book.title}</div>
            <div className={styles.price}>${book.price}</div>
          </div>
        ))}
      </div>
      <Link to="/rental">
        <div className={styles.viewAll}>View All</div>
      </Link>
    </div>

    <div className={styles.homeModule}>
      <div className={styles.moduleTitle}>Categories</div>
      <div className={styles.cardList}>
        {catalog.map((cata) => (
          <Link to={"/category/" + cata.id} >
            <div className={styles.card} key={cata.name}>
              {cata.icon}
              {cata.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className={styles.gap}></div>
  </div>
  );
}