import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Storage } from "aws-amplify";
import AccountNavbar from "../../Layouts/AccountNavbar";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import ConditionGuide from "./conditionGuide";
import cat from "../../Component/Category";
import querystring from "querystring";

export default function Post() {
  const [user, setUser] = useState();
  const [purpose, setPurpose] = useState("sale");
  const loggedInUser = localStorage.getItem("user");
  const [opendialog, setOpenDialog] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [editing, onEditing] = useState(false);
  const [bookInfo, setBookInfo] = useState({
    id: "",
    title: "",
    subtitle: "",
    categoryId: "",
    bookCondition: "",
    price: "",
    descr: "",
    status: "sale",
    bookImage: "",
    user_id: "",
    stock: "1",
  });
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setBookInfo({ ...bookInfo, user_id: foundUser.id });
      const bookid = window.location.href.split("/").pop();
      if (bookid !== "newbook") {
        onEditing(true);
        getBookInfo(bookid);
      }
    }
  }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  // useEffect(() => {
  //   if (onEditing) {
  //     fetch(
  //       "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/getBookById.do",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: querystring.stringify({
  //           book_id: window.location.href.split("/").pop(),
  //         }),
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBookInfo({ ...bookInfo, ...data });
  //       })
  //       .catch((err) => alert("Error", err));
  //   }
  // }, [onEditing]);

  if (!user) {
    return (
      <div className={styles.messagePage}>
        <h2>
          Please{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>{" "}
          to {editing ? "edit" : "post"} books.
        </h2>
      </div>
    );
  }

  const condition = [
    "As New",
    "Fine",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
    "Binding Copy",
    "Reading Copy",
  ];

  function getBookInfo(bookid) {
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/getBookById.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ book_id: bookid }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookInfo({ ...data });
      })
      .catch((err) => alert("Error", err));
  }

  function openDialog() {
    setOpenDialog(true);
  }
  function closeDialog() {
    setOpenDialog(false);
  }
  function handleSubmit(e) {
    //post bookInfo
    e.preventDefault();
    let req = {
      title: bookInfo.title,
      subtitle: bookInfo.subtitle,
      categoryId: bookInfo.categoryId,
      descr: bookInfo.descr,
      price: bookInfo.price,
      bookImage: bookInfo.bookImage,
      bookCondition: bookInfo.bookCondition,
      status: bookInfo.status,
      stock: bookInfo.stock,
      user_id: user.id,
    };
    if (bookInfo.id !== "") {
      req.id = bookInfo.id;
    }
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/updateBook.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(req),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/bookshelf");
      })
      .catch((err) => alert("Error", err));
  }

  function uploadImage(e) {
    const file = e.target.files[0];
    const key = Date.now().toString();
    Storage.put(key, file, {
      contentType: "image/png",
    })
      .then((result) => {
        console.log(result);
        setImgUploaded(true);
        setBookInfo({ ...bookInfo, bookImage: key });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.messagePage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>{editing ? "Edit" : "Post"} your Book</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="for">For*</label>
          <select
            onChange={(e) => {
              setPurpose(e.target.value);
              setBookInfo({ ...bookInfo, status: e.target.value });
            }}
            value={bookInfo.status}
            required
          >
            <option value=""></option>
            <option value="1"> Sale</option>
            <option value="0"> Rent</option>
          </select>
          <label htmlFor="booktitle">Name of Book*</label>
          <input
            type="text"
            id="booktitle"
            name="booktitle"
            required
            autoComplete="off"
            value={bookInfo.title}
            onChange={(e) => {
              setBookInfo({ ...bookInfo, title: e.target.value });
            }}
          />
          <label htmlFor="authors">Authors of Book*</label>
          <input
            type="text"
            id="authors"
            name="authors"
            autoComplete="off"
            value={bookInfo.subtitle}
            required
            onChange={(e) => {
              setBookInfo({ ...bookInfo, subtitle: e.target.value });
            }}
          />
          <label htmlFor="catetory">Category*</label>
          <select
            required
            onChange={(e) => {
              setBookInfo({ ...bookInfo, categoryId: e.target.value });
            }}
            value={bookInfo.categoryId}
          >
            <option value=""></option>
            {Object.keys(cat).map((catId) => {
              return (
                <option value={catId} key={catId}>
                  {cat[catId]}
                </option>
              );
            })}
          </select>
          <label htmlFor="condition">Condition*</label>
          <select
            required
            onChange={(e) => {
              setBookInfo({ ...bookInfo, bookCondition: e.target.value });
            }}
            value={bookInfo.bookCondition}
          >
            <option value=""></option>
            {condition.map((cond) => {
              return (
                <option value={cond} key={cond}>
                  {cond}
                </option>
              );
            })}
          </select>
          <button className={styles.conditionBtn} onClick={openDialog}>
            Condition Guide
          </button>
          <Dialog open={opendialog} onClose={closeDialog}>
            <DialogTitle id="dialog">{"Contidion Guide"}</DialogTitle>
            <ConditionGuide />
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <label htmlFor="price">Price*</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="$"
            min="0.00"
            max="10000.00"
            step="0.01"
            required
            value={bookInfo.price}
            onChange={(e) => {
              setBookInfo({ ...bookInfo, price: e.target.value });
            }}
          />
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={(evt) => uploadImage(evt)}
          />
          {imgUploaded && <small>Upload successfully!</small>}
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            rows="3"
            value={bookInfo.descr}
            onChange={(e) => {
              setBookInfo({ ...bookInfo, descr: e.target.value });
            }}
          />
          <input type="submit" value="Post" data-test="submit" />
        </form>
      </div>
    </div>
  );
}
