import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  const [bookInfo, setBookInfo] = useState({
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
    }
  }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  if (!user) {
    return (
      <div className={styles.messagePage}>
        <h2>
          Please{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>{" "}
          to post books.
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
  function openDialog() {
    setOpenDialog(true);
  }
  function closeDialog() {
    setOpenDialog(false);
  }
  function handleSubmit(e) {
    //post bookInfo
    e.preventDefault();
    console.log(bookInfo);
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/updateBook.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(bookInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((err) => alert("Error", err));
  }
  return (
    <div className={styles.messagePage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>Post your Book</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="for">For*</label>
          <select
            onChange={(e) => {
              setPurpose(e.target.value);
              setBookInfo({ ...bookInfo, status: e.target.value });
            }}
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
            onChange={(e) => {
              setBookInfo({ ...bookInfo, title: e.target.value });
            }}
          />
          <label htmlFor="authors">Authors of Book*</label>
          <input
            type="text"
            id="authors"
            name="authors"
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
          {/* <label htmlFor="publishdate">Published Date of Book</label>
          <input
            type="date"
            id="publishdate"
            name="publishdate"
            onChange={(e) => {
              setBookInfo({ publishedDate: e.target.value });
            }}
          /> */}
          <label htmlFor="condition">Condition*</label>
          <select
            required
            onChange={(e) => {
              setBookInfo({ ...bookInfo, bookCondition: e.target.value });
            }}
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
          {/* {purpose === "rent" ? (
            <div>
              <label htmlFor="availabletime">Available Time*</label>
              <p>from</p>
              <input
                type="date"
                id="starttime"
                name="availabletime"
                required
                onChange={(e) => {
                  setBookInfo({ starttime: e.target.value });
                }}
              />
              <p>to</p>
              <input
                type="date"
                id="endtime"
                name="availabletime"
                required
                onChange={(e) => {
                  setBookInfo({ endtime: e.target.value });
                }}
              />
            </div>
          ) : (
            <></>
          )} */}
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
            onChange={(e) => {
              setBookInfo({ ...bookInfo, price: e.target.value });
            }}
          />
          <label htmlFor="images">Upload Images</label>
          {/* <input type="file" /> */}
          <input
            type="text"
            id="images"
            name="images"
            required
            onChange={(e) => {
              setBookInfo({ ...bookInfo, images: e.target.value });
            }}
          />
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
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
