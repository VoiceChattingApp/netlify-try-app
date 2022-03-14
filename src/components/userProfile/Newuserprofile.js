import React, { useState, useRef, useEffect } from "react";
import classes from "./newuserprofile.module.css";
import "font-awesome/css/font-awesome.min.css";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../atom/globalState";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Newuserprofile = (props) => {
  const [editstate, seteditstate] = useState(false);
  const [showpara, setshowpara] = useState(false);
  const inputRef = useRef(null);
  const currentUser = useRecoilValue(loggedInUser);
  const [image, setimage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  useEffect(() => {
    if (showpara) inputRef.current.focus();

    var url = "https://chat-lg.azurewebsites.net/photos/" + props.user.username;
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setimage(`data:image/png;base64,${result.data}`);
      })
      .catch((err) => {
        console.log("ERROR IN GET");
        setimage(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        );
      });
  }, [props.user.username, showpara]);
  const submithandler = () => {
    props.updatecontacts(props.user);
  };

  const imageHandler = (e) => {
    seteditstate(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result);
      }
    };
    var file = e.target.files[0];
    if (file && file.type.match("image.*"))
      reader.readAsDataURL(e.target.files[0]);
    var url =
      "https://chat-lg.azurewebsites.net/photos/" + currentUser.username;
    let formdata = new FormData();
    formdata.append("image", file);
    axios
      .post(url, formdata)
      .then(() => {})
      .catch((err) => {
        window.alert("Something went wrong");
      });
  };

  const editprofilehandler = () => {
    setshowpara(true);
    seteditstate(true);
  };
  const [status, setstatus] = useState(
    "Hey there I am using talk-to-chat app by divansh mahajan"
  );
  const changestatus = (e) => {
    setstatus(e.target.value);
  };
  const submitchangeshandler = (e) => {
    e.preventDefault();
    console.log(status);


    setshowpara(false);
    seteditstate(false);
  };
  console.log(editstate);
  return (
    <div
      className={`${
        props.curindex === -3 ? classes.minheight : classes.maxheight
      }`}
    >
      <div
        className={`${
          props.curindex === -3 ? classes.cardmargin : classes.card
        }`}
      >
        <div
          className={`${
            props.curindex === -3
              ? classes["card-background-margin"]
              : classes["card-background"]
          }`}
        >
          <div
            className={classes["img-holder"]}
            style={{
              backgroundImage: `url(${image})`,
              objectFit: "fill",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition:"center center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="input"
              onChange={imageHandler}
              className={classes.nodisplay}
            />
            <div className={classes.label}>
              {props.curindex === -3 &&
                props.user.username === currentUser.username && (
                  <label className={classes["image-upload"]} htmlFor="input">
                    
                    <i className="fa fa-camera fa-2x " style={{color:"black"}}></i>
                  </label>
                )}
            </div>
          </div>
        </div>

        <div
          className={`${
            props.curindex === -3
              ? classes["card-info-margin"]
              : classes["card-info"]
          }`}
        >
          <h1>
            {props.user.firstName} {props.user.lastName}
          </h1>
          <div style={{ display: "flex" }}>
            {showpara && (
              <input className={classes.padding}
                type="text"
                maxlength="56"
                value={status}
                onChange={changestatus}
                ref={inputRef}
              />
            )}
            {!showpara && (
              <p
                dangerouslySetInnerHTML={{ __html: status }}
                className={`${
                  props.curindex !== -3 ||
                  props.user.username !== currentUser.username
                    ? classes["para-fullwidth"]
                    : classes["para-seven"]
                }`}
              />
            )}
            {props.user.username === currentUser.username &&
              props.curindex !== -2 && (
                <i
                  className="fa fa-edit fa-lg"
                  style={{
                    color: "black",
                    justifySelf: "center",
                    alignSelf: "center",
                    width: "10%",
                    margin: "auto",
                  }}
                  onClick={editprofilehandler}
                ></i>
              )}
          </div>
          {editstate && (
            <button
              className={classes.buttonflex}
              onClick={submitchangeshandler}
              style={{ color: "black" }}
            >
              SAVE CHANGES
            </button>
          )}
        </div>

        {props.curindex === -2 && (
          <button className={classes.buttonflex} onClick={submithandler}>
            ADD TO CONTACTS
          </button>
        )}
      </div>
    </div>
  );
};

export default Newuserprofile;
