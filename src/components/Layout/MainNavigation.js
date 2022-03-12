import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log("isloggedin main navigation");
  console.log(isLoggedIn);
  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };
 
  return (
    <div>
    HELLO
    </div>
  );
};

 export default MainNavigation;
// /* <nav>
//         <ul>
//           {!isLoggedIn && (
//             <li>
//               <Link to='/auth'>Login</Link>
//             </li>
//           )}
//           {isLoggedIn && (
//             <li>
//               <Link to='/profile'>Profile</Link>
//             </li>
//           )}
//           {isLoggedIn && (
//             <li>
//               <button onClick={logoutHandler}>Logout</button>
//             </li>
//           )}
//         </ul>
//       </nav>
//       */