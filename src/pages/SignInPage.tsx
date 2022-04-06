import { useRef, useState } from "react";
import Logo from "../assets/logo.png";
import UserPool from "../config/UserPool";

import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import AppInput from "../components/common/AppInput";
import LoadingSpinner from "../components/common/LoadingSpinner";

type SignInPageProps = {
  setUser: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>;
};

const SignInPage = ({ setUser }: SignInPageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const Username = userNameRef.current?.value;
    const Password = passwordRef.current?.value;
    if (Username && Password) {
      setLoading(true);
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data: CognitoUserSession) => {
          setLoading(false);
          setUser(data);
        },
        onFailure: (err) => {
          setError(err.message);
          setLoading(false);
        },
        newPasswordRequired: (data) => {
          console.log(data);
          setLoading(false);
        },
      });
    } else {
      console.log("Missing details");
    }
  };

  const resetError = () => setError(null);

  return (
    <div
      className="h-100 d-flex align-items-center bg-black"
      onSubmit={handleSubmit}
    >
      <form className="form-signin d-flex flex-column align-items-center mx-auto col-12 col-sm-8 col-md-6 col-lg-4 gap-3 px-4">
        <img
          src={Logo}
          alt="Explor Logo"
          className="w-100"
          style={{ objectFit: "contain", maxWidth: 400 }}
        />
        <AppText themeColor="white">WELCOME TO EXPLOR</AppText>
        <AppText themeColor="white">ASTRONAUT HEALTH COMMAND CENTER</AppText>
        <div className="d-flex flex-row align-items-center w-100">
          <AppText themeColor="white" style={{ width: 90 }}>
            LOGIN
          </AppText>
          <AppInput
            ref={userNameRef}
            placeholder="Username"
            required
            onFocus={resetError}
          />
        </div>
        <div className="d-flex flex-row align-items-center w-100">
          <AppText themeColor="white" style={{ width: 90 }}>
            PASSCODE
          </AppText>
          <AppInput
            ref={passwordRef}
            type="password"
            id="inputPassword"
            placeholder="Password"
            required
            onFocus={resetError}
          />
        </div>
        {error && (
          <AppText fontSize={6} themeColor="red">
            {error}
          </AppText>
        )}
        <AppButton type="submit">
          {loading ? <LoadingSpinner /> : "Login"}
        </AppButton>
      </form>
    </div>
  );
};

export default SignInPage;
