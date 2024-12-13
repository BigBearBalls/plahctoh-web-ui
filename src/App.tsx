import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Layout from "./fragment/Layout";
import {User} from "./models/User";
import {accountStore, authStore, globalStore} from "./Context";
import NotFoundPage from "./page/not-found/NotFoundPage";
import LoginPage from "./page/auth-page/LoginPage";
import RegistrationPage from "./page/registration/RegistrationPage";
import PopUp from "./fragment/popup-block/PopUp";
import {observer} from "mobx-react-lite";
import AccountPage from "./page/account/AccountPage";
import DepartmentPage from "./page/department/DepartmentPage";

function App() {

  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (!isLoaded) {
      console.log("App loading", isLoaded);
      authStore.checkAuth().then(()=>setIsLoaded(true));
      console.log("App loaded", isLoaded);
    }
  }, [])

  return (
    <div className="App">
      <PopUp/>
      {isLoaded &&
          <BrowserRouter>
              {globalStore.isAuthenticated ?
                  <Routes>
                      <Route path="/" element={<Layout/>}>
                          <Route path="/account/:userId?" element={<AccountPage />} />
                          <Route path="/departments" element={<DepartmentPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                      </Route>
                  </Routes> :
                  <Routes>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                  </Routes>
              }
          </BrowserRouter>
      }
    </div>
  );
}

export default observer(App);
