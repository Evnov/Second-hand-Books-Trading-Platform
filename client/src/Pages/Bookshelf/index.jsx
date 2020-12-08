import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [opendialog, setOpenDialog] = useState(false);
  const [booklist, setBooklist] = useState(undefined);
  const [allbooks, setAllbooks] = useState(undefined);
  const [orderlist, setOrderlist] = useState(undefined);
  const [orderlist2, setOrderlist2] = useState(undefined);
  const [idx, setIdx] = useState(0);
  const [userlist, setUserlist] = useState(undefined);
  const [display, setDisplay] = useState("Books On Sale");

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
        
        const bli = await getListByBuyer();//117

        const sli = await getListBySeller();//96

        const bks = await fetchBooklist();//139
        
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
    // .filter((book)=>book!==null);
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
        setOpenDialog(false);
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

  function toggle(i){
    setIdx(i);
  }

  function getTime(timestamp){
    let d = new Date(timestamp);
    return `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`;
  }

  function openDialog() {
    setOpenDialog(true);
  }
  function closeDialog() {
    setOpenDialog(false);
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
                    <td className={styles.clickable}>{book.username}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status-1]}</td>
                    {book.status===1&&<td><button className={styles.tablebtn} onClick={()=>changeStatus(3, book.id)}>Cancel</button></td>}
                    {book.status===2&&<td><button className={styles.tablebtn}>Review</button></td>}
                  </tr>
                ))}
              </table>}
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
                    <td className={styles.clickable}>{book.username}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status-1]}</td>
                    {book.status===1&&<td>
                      <button className={styles.tablebtn} onClick={()=>changeStatus(2, book.id)}>Done</button>
                      <button className={styles.tablebtn} onClick={()=>changeStatus(3, book.id)}>Cancel</button>
                    </td>}
                    {book.status===2&&<td><button className={styles.tablebtn}>Review</button></td>}
                  </tr>
                ))}
              </table>}
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
                      <button className={styles.tablebtn} onClick={openDialog}>Delete</button>
                      <Dialog open={opendialog} onClose={closeDialog} fullWidth={true} maxWidth='xs'>
                        <DialogTitle id="dialog">{"Warning"}</DialogTitle>
                        <div className={styles.dialogtext}>Do you really want to delete the book?</div>
                        <DialogActions>
                        <Button onClick={()=>deletebook(book.id)} color="primary">
                          Delete
                        </Button>
                        <Button onClick={closeDialog} color="primary">
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
