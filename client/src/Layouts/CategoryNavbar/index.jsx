import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./style.module.scss";

function CategoryNavbar() {
  const addr = window.location.href.split("/").pop();
  const idx = [
    100004,
    100005,
    100006,
    100007,
    100008,
    100009,
    100010,
    100011,
    100012,
    100013,
    100014,
  ].indexOf(Number(addr));

  // useEffect(() => {
  //   console.log("addr", addr);
  //   console.log("idx", idx);
  // }, []);
  const catalog = [
    {
      name: "Arts",
      id: "100004",
    },
    {
      name: "Athletics",
      id: "100005",
    },
    {
      name: "Science",
      id: "100006",
    },
    {
      name: "Business",
      id: "100007",
    },
    {
      name: "Education",
      id: "100008",
    },
    {
      name: "Engineering",
      id: "100009",
    },
    {
      name: "Health & Medicine",
      id: "100010",
    },
    {
      name: "Humanities",
      id: "100011",
    },
    {
      name: "Law",
      id: "100012",
    },
    {
      name: "Social Sciences",
      id: "100013",
    },
    {
      name: "Others",
      id: "100014",
    },
  ];
  return (
    <div className={styles.sidebar}>
      {catalog.map((cata, index) => {
        return (
          <Link to={"/category/" + cata.id}>
            <div
              className={
                styles.menuitem + ` ${index === idx ? styles.selected : ""}`
              }
            >
              {cata.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default withRouter(CategoryNavbar);
