
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/store/auth-context";
import { AuthContextProvider1 } from "./components/store/second-auth";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import recoilPersist from "recoil-persist";
import { ToastContainer, toast } from 'react-toastify';
import {SpeechProvider} from '@speechly/react-client';
  import 'react-toastify/dist/ReactToastify.css';


const { RecoilPersist, updateState } = recoilPersist([], {
  key: "recoil-persist",
  storage: sessionStorage,
});

ReactDOM.render(
  <SpeechProvider appId="8b238cd8-597a-4c70-add6-222799409645" language="en-US">
  <AuthContextProvider1>
  <AuthContextProvider>

    <BrowserRouter>
      <RecoilRoot initializeState={updateState}>
        <RecoilPersist />
        <App />
        <ToastContainer pauseOnFocusLoss={false}/>
      </RecoilRoot>
    </BrowserRouter>
  </AuthContextProvider>
   </AuthContextProvider1>
  </SpeechProvider>,
  document.getElementById('root')
);
