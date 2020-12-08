import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Rating from '@material-ui/lab/Rating';
import { getTime, getAlpha } from '../../Component/common';
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [deletedialog, setDeleteDialog] = useState(false);
  const [reviewdialog, setReviewDialog] = useState(false);
  const [contactdialog, setContactDialog] = useState(false);
  const [booklist, setBooklist] = useState();
  const [allbooks, setAllbooks] = useState();
  const [orderlist, setOrderlist] = useState();
  const [orderlist2, setOrderlist2] = useState();
  const [idx, setIdx] = useState(0);
  const [userlist, setUserlist] = useState();
  const [contact, setContact] = useState({username:"",email:"",phone:""});
  const [tab, setTab] = useState(0);
  const [reviews, setReviews] = useState([]);

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      (async function getdata(){
        
        const bli = await getListByBuyer();
        const sli = await getListBySeller();
        const bks = await fetchBooklist();
        const allbook = await fetchAllBooks();
        const uli = await getUsers();
        
        await bli.forEach((item)=>{
          const b = allbook.data.filter((bk)=>bk.id === item.productId)[0];

          const u = uli.filter((ur)=>ur.id === item.sellerId)[0];
          console.log(item);
          console.log(u);
          item.title = b.title;
          item.price = b.price;
          item.username = u.username;
        });
        await setOrderlist(bli);
        await sli.forEach((item)=>{
          const b = allbook.data.filter((bk)=>bk.id === item.productId)[0];
          const b2 = bks.filter((bk)=>bk.id === item.productId)[0];
          if(b2) b2.sts = item.status;
          const u = uli.filter((ur)=>ur.id === item.buyerId)[0];
          item.title = b.title;
          item.price = b.price;
          item.username = u.username;
        });
        await setOrderlist2(sli);
        await setBooklist(bks);
        console.log(bks);
        await setUserlist(uli);
        await setAllbooks(allbook.data);
      })();

    }
  }, [user]);

  async function fetchAllBooks() {
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/book/get_allBooks.do",
      {
        method: "GET",
      }
    );
    return await res.json();
  }

  async function getUsers(){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/user/getAllUsers.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return await res.json();
  }

  async function getListBySeller(){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/order/getOrderBySeller.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ seller_id: user.id }),
      }
    );
    return await res.json();
  }

  async function getListByBuyer(){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/order/getOrderByBuyer.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ buyer_id: user.id }),
      }
    );
    return await res.json();
  }

  async function fetchBooklist(){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/booklist/getAllBooks.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ user_id: user.id }),
      }
    );
    const r = await res.json();
    console.log(r);
    return r.filter((book)=>book!==null);
  }
  
  function deletebook(bookid){
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/deleteBookById.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ book_id: bookid }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchBooklist(user.id);
        setDeleteDialog(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  function changeStatus(sts, oid){
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/order/setOrderStatus.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ status: sts, order_id: oid }),
      }
    );
  }

  async function getReviews(uid){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/rating/getReview.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ reviewee_id: uid }),
      }
    );
    const rws = await res.json();
    setReviews(rws);
  }

  function submitReview(uid, oid){

  }

  function toggle(i){
    setIdx(i);
  }

  function getContact(uid){
    const u = userlist.filter((ur)=>ur.id===uid)[0];
    setContact({...contact, phone: u.phone, email: u.email, username: u.username});
  }

  function tabChange(e, v){
    setTab(v);
  }

  function toggleDialog(idx, flag, data) {
    if(idx===1)
      setDeleteDialog(flag);
    else if(idx===2)
      setReviewDialog(flag);
    else{
      setContactDialog(flag);
      if(data){
        getContact(data.uid);
        getReviews(data.uid);
      }
    }
  }

  if (!user) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <h2>
            Please{" "}
            <Link to="/login" className={styles.link}>
              Sign in
            </Link>
            .
          </h2>
        </div>
      </div>
    );
  }

  const bookcategory= ["On rental","On sale"];
  const bookstatus=["Pending","Completed","Canceled"];
  if (booklist) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <div className={styles.tabs}>
            <div className={idx===0&&styles.active} onClick={()=>toggle(0)}>Order history</div>
            <div className={idx===1&&styles.active} onClick={()=>toggle(1)}>My books on shelf</div>
          </div>
          <div className={styles.tabContent}>
            {idx===0&&<section className={styles.bookSection}>
              {orderlist&&<h1>What I bought</h1>}
              {orderlist&&<table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Owner</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {orderlist.map((book)=>(
                  <tr key={book.id}>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td className={styles.clickable} onClick={()=>toggleDialog(3, true, {uid:book.sellerId})}>{book.username}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status-1]}</td>
                    {book.status===1&&<td><button className={styles.tablebtn} onClick={()=>changeStatus(3, book.id)}>Cancel</button></td>}
                    {book.status===2&&<td><button className={styles.tablebtn} onClick={()=>toggleDialog(2, true)}>Review</button></td>}
                  </tr>
                ))}
              </table>}
              {orderlist2&&<h1>What I sold</h1>}
              {orderlist2&&<table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Purchaser</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {orderlist2.map((book)=>(
                  <tr key={book.id}>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td className={styles.clickable} onClick={()=>toggleDialog(3, true, {uid:book.buyerId})}>{book.username}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status-1]}</td>
                    {book.status===1&&<td>
                      <button className={styles.tablebtn} onClick={()=>changeStatus(2, book.id)}>Done</button>
                      <button className={styles.tablebtn} onClick={()=>changeStatus(3, book.id)}>Cancel</button>
                    </td>}
                    {book.status===2&&<td><button className={styles.tablebtn} onClick={()=>toggleDialog(2, true)}>Review</button></td>}
                  </tr>
                ))}
              </table>}
              <Dialog open={reviewdialog} onClose={()=>toggleDialog(2, false)} fullWidth={true} maxWidth='md'>
                <DialogTitle id="dialog">{"Submit your review"}</DialogTitle>
{/* private Integer orderId;
private Integer revieweeId;
private Integer reviewerId;
private Integer score;
private String review;
private Date createTime; */}
                <DialogActions>
                  {/* <Button onClick={()=>deletebook(book.id)} color="primary">
                    Submit
                  </Button> */}
                  <Button onClick={()=>toggleDialog(2, false)} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={contactdialog} onClose={()=>toggleDialog(3, false)} fullWidth={true} maxWidth='sm'>
                <DialogTitle id="dialog">{"About "+contact.username}</DialogTitle>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={tabChange}
                >
                  <Tab label="Contact info" value={0} />
                  <Tab label="Reviews" value={1} />
                </Tabs>
                {tab===0&&<div className={styles.tabBlock}>
                  <p><strong>username: </strong>{contact.username}</p>
                  <p><strong>email: </strong>{contact.email}</p>
                  <p><strong>phone: </strong>{contact.phone}</p>
                </div>}
                {tab===1&&<div className={styles.tabBlock}>
                  {reviews.map((rw)=>
                    <div className={styles.rw} key={rw.createTime}>
                      <div className={styles.reviewer}>{getAlpha(rw.reviewerId)}</div>
                      <div className={styles.rwcontent}>
                        <Rating value={rw.score} disabled />
                        <div>{rw.review}</div>
                        <div>{getTime(rw.createTime)}</div>
                      </div>
                    </div>
                  )}
                </div>}
              </Dialog>
            </section>}
            {idx===1&&<section className={styles.bookSection}>
              <table className={styles.booktable}>
                <tbody>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  {booklist.map((book)=>(
                  <tr>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td>${book.price}</td>
                    <td>{bookcategory[book.sts-1]}</td>
                    <td>
                      <Link to={'/post/'+book.id}><button className={styles.tablebtn}>Edit</button></Link>
                      <button className={styles.tablebtn} onClick={()=>toggleDialog(1, true)}>Delete</button>
                      <Dialog open={deletedialog} onClose={()=>toggleDialog(1, false)} fullWidth={true} maxWidth='xs'>
                        <DialogTitle id="dialog">{"Warning"}</DialogTitle>
                        <div className={styles.dialogtext}>Do you really want to delete the book?</div>
                        <DialogActions>
                          <Button onClick={()=>deletebook(book.id)} color="primary">
                            Delete
                          </Button>
                          <Button onClick={()=>toggleDialog(1, false)} color="primary">
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </section>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.watchlistPage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>BookShelf</h1>
      </div>
    </div>
  );
}
