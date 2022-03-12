import React, { useContext } from "react";
import classes from "./chatContent.module.css";
import AuthContext from "../store/auth-context";
const Logout = () => {
  const authCtx = useContext(AuthContext);
  const logouthandler = () => {
    authCtx.logout();
  };
  return (
    <div className={classes.main__chatcontent}>
      <div className={classes.content__header}>
        <div className={classes.blocks}>
          <div className={classes["current-chatting-user"]}></div>
        </div>

        <div className={classes.blocks}>
          <div className={classes.settings}>
            <button className={classes["btn-nobg"]} onClick={logouthandler}>
              LOGGING
            </button>
          </div>
          <i
            className="fa fa-ellipsis-v"
            aria-hidden="true"
            style={{ color: "blue" }}
          ></i>
        </div>
      </div>
    </div>
  );
};
export default Logout;
