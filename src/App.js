import {useContext} from 'react';
import { Switch, Route ,Redirect} from 'react-router-dom';
import "./App.css";
import Layout from './components/Layout/Layout';
import AuthContext from './components/store/auth-context';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/Chat-Page'
function App() {
   const authCtx = useContext(AuthContext);
  return (
    
    <div className="main-background">
      <Switch>
        <Route path='/' exact>
          <AuthPage />
        </Route>
        <Route path='/check' exact>
        <p>HELLO</p>
        </Route>
        <Route path='/chatpage' exact>
        {authCtx.isLoggedIn && <ChatPage />}

        {!authCtx.isLoggedIn &&<Redirect to='/auth' />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
           
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;