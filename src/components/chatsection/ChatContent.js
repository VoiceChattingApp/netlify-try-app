import React, { useState, useEffect, useContext, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
import { toast } from "react-toastify";
import ThreeDots from "../ChatPage/ThreeDots";
import "react-toastify/dist/ReactToastify.css";
import classes from "./chatContent.module.css";
import Avatar from "../ChatPage/Avatar";
import AuthContext from "../store/auth-context";
import AuthContext1 from "../store/second-auth";
import ChatItem from "./ChatItem";

import axios from "axios";
import { PushToTalkButton } from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
var stompClient = null;
const ChatContent = (props) => {
  const messagesEndRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const authCtx1=useContext(AuthContext1);
  const currentUser = useRecoilValue(loggedInUser);
  const [deletemsgid, setdeletemsgid] = useState(-1);
  const [messagestate, setmessagestate] = useState("");
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const { segment } = useSpeechContext();
  const[unread,setunread]=useState(0);
  const[dummycount,setdummycount]=useState(0);
 
  useEffect(() => {}, [messages]);
  useEffect(()=>{
   return ()=>{
    window.alert("leaving chatconte");
   }
  },[])
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      stompClient == null && connect();
    }
  }, [authCtx.isLoggedIn]);
  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      props.index !== -1 &&
      props.index !== -4
    ) {
      setActiveContact({
        name: props.nameofperson,
        email: authCtx.users[props.index].username,
      });
     
      setmessagestate("");
    }
  }, [props.nameofperson, props.index]);
  useEffect(() => {
    if (activeContact === undefined) {
      return;
    }
    const url =
      "https://backend-for-chat-app.herokuapp.com/messages/" +
      activeContact.email +
      "/" +
      currentUser.username;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer" + authCtx.token,
        },
      })
      .then((response) => {
        setMessages(response.data);
      });
  }, [activeContact.name, deletemsgid]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

useEffect(()=>{
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
        for(var t=0;t<response.data.length;t++)
        {
          if(response.data[t].username===activeContact.email)
          {
            setunread(response.data[t].unread);
          }
        }
      });
      var url = "https://backend-for-chat-app.herokuapp.com/contacts/"+currentUser.username+"/"+activeContact.email+"/0";
        axios
      .post(url)
      .then((result) => {
        
      })
      .catch((err) => {window.alert("error aagya")}); 
     let temparr=[...props.notifyuser];
      for(var i=0;i<temparr.length;i++)
      {
        if(temparr[i].username===activeContact.email)
        {
          temparr[i].unread=0;
        }
      }
    setunread(0);
    props.setnotifyuser(temparr);
},[activeContact.email])


  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("https://backend-for-chat-app.herokuapp.com/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + currentUser.username + "/queue/messages",
      onMessageReceived
    );
  };
  const onError = (err) => {};
  const changeinstate = (e) => {
    setmessagestate(e.target.value);
  };
  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(
      sessionStorage.getItem("recoil-persist")
    ).chatActiveContact;
    console.log("dummy");
    console.log(dummycount);
   
      console.log(authCtx1.users);
       authCtx1.adduser({name:"klklklk"});
   
    if (active.email === notification.senderId) {
      const url =
        "https://backend-for-chat-app.herokuapp.com/messages/" +
        notification.senderId +
        "/" +
        currentUser.username;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer" + authCtx.token,
          },
        })
        .then((message) => {
          // const newMessages = JSON.parse(
          //   sessionStorage.getItem("recoil-persist")
          // ).chatMessages;

          setMessages(message.data);

          scrollToBottom();
        });
    } else {
      toast.info("Received a new message from " + notification.senderName, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

        var url = "https://backend-for-chat-app.herokuapp.com/contacts/"+currentUser.username+"/"+notification.senderId+"/1";
        axios
      .post(url)
      .then((result) => {
        
      })
      .catch((err) => {window.alert("error aagya")});
      let temparr=[...props.notifyuser];
      for(var i=0;i<temparr.length;i++)
      {
        if(temparr[i].username===notification.senderId)
        {
          temparr[i].unread++;
        }
      }
     
     props.setnotifyuser(temparr);
  

    }
  };
  const [showthreedots, setshowthreedots] = useState(false);
  const clicked = () => {
    setshowthreedots((p) => !p);
    // props.setindexfunc(-4);
  };

  const sendMessage = () => {
    if (messagestate.trim() !== "") {
      const message = {
        senderId: currentUser.username,
        recipientId: activeContact.email,
        senderName: currentUser.firstName,
        recipientName: activeContact.name,
        content: messagestate.toLowerCase(),
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);

      scrollToBottom();
      setmessagestate("");
    }
  };
  useEffect(() => {
    if (deletemsgid !== -1) {
    }
  }, [deletemsgid]);

  useEffect(() => {
    if (segment && segment.isFinal) {
      setmessagestate(
        (prev) => prev + " " + segment.words.map((w) => w.value).join(" ")
      );
    }
  }, [segment]);
  const profilesectionhandler = () => {
    //take to profile page of this person (props.nameofperson)

    props.setindexfunc(-3);
  };
  const profilesectionhandler2 = () => {
    
    props.setindexwithname({
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
    profilesectionhandler();
  };
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) sendMessage();
  };
const[image,setimage]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
 useEffect(()=>{
  var url = "https://backend-for-chat-app.herokuapp.com/photos/" + props.indexwithname.username;
    axios
      .get(url)
      .then((result) => {
        
        
        setimage(`data:image/png;base64,${result.data}`);
      })
      .catch((err) => {console.log("ERROR IN GET")
        setimage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")});
  },[props.indexwithname.username])
  return (
    <div className={classes.main__chatcontent}>
      <div className={classes.content__header}>
        <div className={classes.blocks}>
          <div className={classes["current-chatting-user"]}>
           
            <div onClick={profilesectionhandler} style={{cursor:"pointer"}}>{props.nameofperson}</div>
            
          </div>
        </div>

        <div className={classes.blocks}>
          <div className={classes.settings}>
            <i
              className="fa fa-ellipsis-v"
              aria-hidden="true"
              style={{ color: "white", cursor: "pointer" }}
              onClick={clicked}
            ></i>
            {showthreedots && (
              <ThreeDots clickedprofileoption={profilesectionhandler2} />
            )}
          </div>
        </div>
      </div>
      <div className={classes.content__body}>
        <div className={classes.chat__items}>
          {messages.map((itm, index) => {
            return (
              <ChatItem
                unread={unread}
                len={messages.length}
                key={index}
                animationDelay={index + 2}
                id={itm.id}
                user={itm.type ? itm.type : "me"}
                msg={itm.content}
                timestamp={itm.timestamp}
                sender={itm.senderId}
                currentUser={currentUser.username}
                setdeletemsgid={setdeletemsgid}
                deletemsgid={deletemsgid}
              />
            );
          })}
 
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={classes.content__footer}>
        <div className={classes.sendNewMessage}>
          <input
            type="text"
            placeholder="Type a message here"
            onKeyDown={onKeyDownHandler}
            onChange={changeinstate}
            value={messagestate.toLowerCase()}
          />

          <PushToTalkButton intro="" tapToTalkTime="60000" size="2.5rem" />

          <button
            className={classes.btnSendMsg}
            id="sendMsgBtn"
            onClick={sendMessage}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
