import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignInPage from "./pages/SignInPage";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import UserPool from "./config/UserPool";
import "./fonts/BebasKai.otf";

const LoggedInUser = () => {
  const [user, setUser] = useState<CognitoUserSession | null>(null);

  useEffect(() => {
    UserPool.getCurrentUser()?.getSession(
      (error: Error | null, session: CognitoUserSession | null) => {
        if (!error && session) {
          setUser(session);
        }
      }
    );
  }, []);
  return user ? <App /> : <SignInPage setUser={setUser} />;
};

ReactDOM.render(
  <React.StrictMode>
    <LoggedInUser />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
