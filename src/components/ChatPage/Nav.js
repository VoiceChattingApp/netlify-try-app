import React from 'react'
import classes from './Nav.module.css'

const Nav=()=>{
	return (
		<div>
		<div className={classes.nav}>
        <div className={classes.nav__blocks}>
          <img src={"https://img.icons8.com/material-rounded/24/000000/chat--v1.png"}></img>
        </div>
        <div className={classes.nav__blocks}></div>
        <div className={classes.nav__blocks}></div>
      </div>
		</div>
	)
}

export default Nav