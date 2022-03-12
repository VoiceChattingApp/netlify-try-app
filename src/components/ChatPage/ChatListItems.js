import React, { useState,useEffect} from "react";
import Avatar from "./Avatar";
import "./ListofContacts.css";
import axios from "axios";
const ChatListItems = (props) => {
  const [activeclass, setactiveclass] = useState(false);
  const[image,setimage]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const setindexfun = (e) => {
    
    
      setactiveclass(true);
      props.setindexfunc(props.index);
       props.setpersonfunc(`${props.name + " " + props.lastName}`);
      props.setindexwithname({
        username: props.userName,
        firstName: props.name,
        lastName: props.lastName,
      });
   
  };
  const handlesubmission = (e) => {
    //props.setpersonfunc
    
    props.setindexwithname({
      username: props.userName,
      firstName: props.name,
      lastName: props.lastName,
    });
  };
  console.log("image obtained");
  console.log(props.image);
  useEffect(()=>{
  var url = "https://chat-lg.azurewebsites.net/photos/" + props.userName;
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        
        setimage(`data:image/png;base64,${result.data}`);
      })
      .catch((err) => {console.log("ERROR IN GET")});
  },[props.userName])
  
  return (
    <div
      className={`chatlist__item ${
        props.curindex === props.index ? "active" : ""
      } ` } onClick={setindexfun}
    >
      <Avatar
        image={image}
        isOnline={props.isOnline}
      />

      <div className="userMeta" onClick={setindexfun}>
        <p style={{ color: "white" }} onClick={handlesubmission}>
          {props.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
};
export default ChatListItems;
