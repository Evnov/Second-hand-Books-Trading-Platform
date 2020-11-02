import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './style.module.scss';
import { FaRegStar, FaRegUser, FaRegBell } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
// https://react-icons.github.io/react-icons/icons?name=fa

export default class Navbar extends Component{

  render(){
    return(
      <div className={styles.navbar}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.navItem}><Link to="/">Home</Link></div>
        <div className={styles.navItem}><Link to="/sale">Sale</Link></div>
        <div className={styles.navItem}><Link to="/rental">Rental</Link></div>
        <div className={styles.iconWrapper}><FaRegUser color="white" className={styles.faIcon} /></div>
        <div className={styles.iconWrapper}><FaRegStar color="white" className={styles.faIcon} /></div>
        <div className={styles.iconWrapper}><FaRegBell color="white" className={styles.faIcon} /></div>
        <div className={styles.searchBox}>
          <input className={styles.searchInput}/>
          <div className={styles.searchIconWrapper}>
            <FiSearch color="white" className={styles.faIcon} />
          </div>
        </div>
      </div>
    );
  }
}