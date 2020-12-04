import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import { useParams } from "react-router-dom";
import CategoryNavbar from "../../Layouts/CategoryNavbar";
import cat from "../../Component/Category";

export default function CategoryResult() {
  const { categoryID } = useParams();
  const [books, setBooks] = useState();
  useEffect(() => {
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/book/get_allBooks.do",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("allbooks:", data.data);
        // console.log("cataID", categoryID);
        let catabooks = data.data.filter(
          (item) => item.categoryId == categoryID
        );
        // console.log("catbooks", catabooks);
        setBooks(catabooks);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [categoryID]);

  return (
    <div className={styles.categoryPage}>
      <h2>Categories</h2>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <CategoryNavbar />
        </div>
        <div className={styles.right}>
          {books ? <BookList items={books} /> : <></>}
        </div>
      </div>
    </div>
  );
}
