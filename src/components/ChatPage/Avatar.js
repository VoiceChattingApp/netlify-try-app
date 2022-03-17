import React, { Component } from "react";
import './ListofContacts.css'
const Avatar=(props)=> {
 
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={props.image} alt="#" />
        </div>
        
      </div>
    );
  
}
export default Avatar;