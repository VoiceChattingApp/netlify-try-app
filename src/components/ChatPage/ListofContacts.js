import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../atom/globalState";
import classes from "./ListofContacts.module.css";
import ChatListItems from "./ChatListItems";
import "font-awesome/css/font-awesome.min.css";
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const allChatUsers = [];
const ChatList = (props) => {
  const authCtx = useContext(AuthContext);
  const currentUser = useRecoilValue(loggedInUser);

  const [allChats, setallChats] = useState(allChatUsers);
  const [deleteuserid, setdeleteuserid] = useState(-1);
  const [searchval, setsearchval] = useState("");
  const loadContacts = () => {
    console.log("load");
    console.log(currentUser);
    axios
      .get(
        "https://backend-for-chat-app.herokuapp.com/contacts/" + currentUser.username,
        {
          headers: {
            Authorization: "Bearer" + authCtx.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setallChats(response.data);
        props.setnotifyuser(response.data);
        authCtx.setuserhandler(response.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      loadContacts();
    }
  }, [authCtx.isLoggedIn]);
  const setsearchvalfunc = (e) => {
    setsearchval(e.target.value);
  };
  const addnewuser = () => {
    props.adduserindex();
  };
  const setempty = () => {
    setsearchval("");
  };
  useEffect(() => {
    if (props.updatecontacts.username.length > 0) {
      var j = 0;
      for (var i = 0; i < allChats.length; i++) {
        if (allChats[i].username === props.updatecontacts.username) {
          j = 1;
          break;
        }
      }
      if(props.updatecontacts.username===currentUser.username)
      {
        j=2;
      }

      //paste the func of adding to the database the props.updateuser and the call loadcontacts();
      if (j === 0) {
        console.log("j==0");
        axios
          .post(
            "https://backend-for-chat-app.herokuapp.com/contacts/" +
              currentUser.username,
            props.updatecontacts
          )
          .then((response) => {
            props.setindexfunc(-1);
            loadContacts();
          })
          .catch((err) => {
            window.alert(err.message);
          });
      } else if(j===1) {
        toast.error("User Already Exists In Contact", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.setindexfunc(-1);
      }
      else 
      {
        toast.error("Can't Add Self to Contacts", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.setindexfunc(-1);
      }
    }
  }, [props.updatecontacts]);
  useEffect(() => {
    if (deleteuserid != -1) {
    }
  }, [deleteuserid]);
  const [image,setimage]=useState(null);
  return (
    <div className={classes.main__chatlist}>
      <button className={classes.btn} onClick={addnewuser}>
        <i className="fa fa-plus"></i>
        <span>Add New Contact</span>
      </button>
      <div className={classes.chatlist__heading}>
        <h2>List of Contacts</h2>
      </div>
      <div className={classes.chatList__search}>
        <div className={`${
            searchval.length>0
              ? classes.search_wrap__cross
              : classes.search_wrap
          }`}>
          {searchval.length > 0 && (
            <i
              className="fa fa-times"
              style={{ paddingLeft: "5%" ,minWidth:"12%" , maxWidth:"12%"}}
              onClick={setempty}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search Here"
            onChange={setsearchvalfunc}
            required
            value={searchval}
          />
        </div>
      </div>
      <div className={classes.chatlist__items}>
        {props.notifyuser.length > 0 &&
          props.notifyuser
            .filter((val) => {
              if (searchval === "") {
                return val;
              } else if (
                val.firstName.toLowerCase().includes(searchval.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => {
              
              return (
                <ChatListItems
                  notifyuser={props.notifyuser}
                  setnotifyuser={props.setnotifyuser}
                  setpersonfunc={props.setpersonfunc}
                  key={index}
                  setindexfunc={props.setindexfunc}
                  name={item.firstName}
                  userName={item.username}
                  lastName={item.lastName}
                  curindex={props.curindex}
                  setindexwithname={props.setindexwithname}
                  index={index}
                  animationDelay={index + 1}
                  active={item.active ? "active" : ""}
                  isOnline={item.isOnline ? "active" : ""}
                  image={image}
                  notifiction={item.unread}
                  deleteuserid={deleteuserid}
                  setdeleteuserid={setdeleteuserid}
                />
              );
            })}
      </div>
    </div>
  );
};
export default ChatList;