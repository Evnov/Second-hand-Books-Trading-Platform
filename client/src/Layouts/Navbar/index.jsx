import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './style.module.scss';
import { FaRegStar, FaRegUser, FaRegBell } from 'react-icons/fa';
// https://react-icons.github.io/react-icons/icons?name=fa

export default class Navbar extends Component{

  render(){
    return(
      <div className={styles.navbar}>
        {/* <img title='logo'/> */}
        <div className={styles.navItem}><Link to="/">Home</Link></div>
        <div className={styles.navItem}><Link to="/sale">Sale</Link></div>
        <div className={styles.navItem}><Link to="/rental">Rental</Link></div>
        <FaRegStar color="white" />
        <FaRegBell color="white" />
        <FaRegUser color="white" />
      </div>
    );
  }
}