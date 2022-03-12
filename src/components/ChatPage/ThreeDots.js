 import React,{useContext} from 'react'
 import classes from './ThreeDots.module.css'
import AuthContext from '../store/auth-context'
 
 const ThreeDots=(props)=>{
 	const authCtx = useContext(AuthContext);
    const logouthandler=()=>{
    
 	authCtx.logout();
 }
 	return (
 		<div className={classes['dropdown-menu']}>
                <ul>
                  <li onClick={props.clickedprofileoption}>My Profile  </li>
                  <li onClick={logouthandler}>Logout</li>
                  </ul>
              </div>
 	)
 }
 
 export default ThreeDots
 