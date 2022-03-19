import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  users:[]
});

export const AuthContextProvider = (props) => {
  const val=localStorage.getItem("token");
  const [token, setToken] = useState(val);
  const [users,setuser]=useState([]);
  const userIsLoggedIn=!!token;
  
  const loginHandler = (token) => {
  console.log("loginHandler");
  console.log(token);
    setToken(token);
  };
  const setuserhandler=(arr)=>{
   console.log("jk");
   console.log(users);
   setuser([...users,...arr]);
   console.log(users);
  }
  const logoutHandler = () => {
    console.log("hjh");
    localStorage.removeItem("token");
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    users:users,
    setuserhandler:setuserhandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;