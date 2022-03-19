import React, { Component } from "react";
import './ListofContacts.css'
const Avatar=(props)=> {
 
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={props.image} alt="#" />
          <span className={`isOnline ${props.isOnline}`}></span>
        </div>
        
      </div>
    );
  
}
export default Avatar;