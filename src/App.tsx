import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Layout from "./fragment/Layout";
import {User} from "./models/User";
import {accountStore, authStore, globalStore} from "./Context";
import NotFoundPage from "./page/not-found/NotFoundPage";
import AuthPage from "./page/auth-page/AuthPage";

function App() {

  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (!isLoaded) {
      console.log("App loading", isLoaded);
      console.log();
      setIsLoaded(true);
      console.log("App loaded", isLoaded);
      const user: User = {
        id:"id",
        firstName:"Artem",
        lastName:"Yushkevich",
        email:"Email",
        phoneNumber:"Phone",
        department:"Department",
        teamLeader:"TeamLeader"}
      accountStore.user = user
    }
  }, [])

  return (
    <div className="App">
          <BrowserRouter>
              {globalStore.isAuthenticated ?
                  <Routes>
                      <Route path="/" element={<Layout/>}>
                          <Route path="*" element={<NotFoundPage />} />
                      </Route>
                  </Routes> :
                  <Routes>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<AuthPage />} />
                  </Routes>
              }
          </BrowserRouter>
    </div>
  );
}

export default App;
