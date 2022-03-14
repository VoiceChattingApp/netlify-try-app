import classes from "./ChatBody.module.css";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { chatActiveContact } from "../../atom/globalState";
import ListofContacts from "./ListofContacts";
import ChatContent from "../chatsection/ChatContent";
import Newuserprofile from "../userProfile/Newuserprofile";
import Adduser from "./Adduser";
import ThreeDots from "./ThreeDots";
const ChatBody = () => {
  const [nameofperson, setnameofperson] = useState("");
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [index, setindex] = useState(-1);
  const [email, setemail] = useState("");
  const [updatecontacts, setupdatecontacts] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });
  const [notifyuser,setnotifyuser]=useState([]);
  const [indexwithname, setindexwithname] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });
  const setindexfunc = (e) => {
    setindex(e);
  };

  useEffect(() => {}, []);

  const setpersonfunc = (e) => {
    setnameofperson(e);
  };
  const setemailfunc = (e) => {
    setemail(e.target.innerText);
  };
  const setuserindex = () => {
    setindex(-2);
  };

  useEffect(() => {
    if (index === -2) {
      setActiveContact({ name: " ", email: " " });
    }
  }, [index]);

  console.log("INDEX");
  console.log(index);
  return (
    <div className={classes.main__chatbody}>
      <ListofContacts
      setnotifyuser={setnotifyuser}
        setindexwithname={setindexwithname}
        updatecontacts={updatecontacts}
        adduserindex={setuserindex}
        setpersonfunc={setpersonfunc}
        curindex={index}
        setemailfunc={setemailfunc}
        setindexfunc={setindexfunc}
        notifyuser={notifyuser}
      />
      
      {index === -3 && <Newuserprofile curindex={index} user={indexwithname} />}

      {index !== -1 && index !== -2 && index !== -3 && (
        <ChatContent
          notifyuser={notifyuser}
          setnotifyuser={setnotifyuser}
          setindexfunc={setindexfunc}
          nameofperson={nameofperson}
          email={email}
          index={index}
          setindexwithname={setindexwithname}
          indexwithname={indexwithname}
        />
      )}

      {index === -2 && (
        <Adduser
          curindex={index}
          setindexfunc={setindexfunc}
          setupdatecontacts={setupdatecontacts}
        />
      )}
      
    </div>
  );
};

export default ChatBody;
