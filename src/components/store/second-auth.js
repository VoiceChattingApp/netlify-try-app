import React, { useState } from 'react';
const AuthContext1 = React.createContext({
  users:[],
  adduser: (token) => {},
  removeuser:(token) =>{}
});
export const AuthContextProvider1 = (props) => {
  const [users,setuser]=useState([]);
  const removeuser=(val)=>{
    console.log("removeuser");
    console.log(users);
    setuser(p=>p.filter(p.name!==val.name));
  }
  const adduser=(val)=>{
    console.log(val);
    console.log("adduser");
    console.log(users);
    
    setuser(users=>[...users,1]);
  }
  const contextValue = {
    adduser:adduser,
    removeuser:removeuser,
    users:users, 
  };
  return (
    <AuthContext1.Provider value={contextValue}>
      {props.children}
    </AuthContext1.Provider>
  );
};
export default AuthContext1;