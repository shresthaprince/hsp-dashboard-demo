import { useRef, useState } from "react";
import Logo from "../assets/logo.png";
import UserPool from "../config/UserPool";

import { CognitoUser, AuthenticationDetails, CognitoUserSession } from "amazon-cognito-identity-js"

type SignInPageProps = {
    setUser: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>
}

const SignInPage = ({ setUser }: SignInPageProps) => {
    const [loading, setLoading] = useState<boolean>(false);
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
                Pool: UserPool
            });
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    setLoading(false);
                    setUser(data);
                },
                onFailure: err => {
                    console.log(err);
                    setLoading(false);
                },
                newPasswordRequired: data => {
                    console.log(data);
                    setLoading(false);
                },
            })
        } else {
            console.log("Missing details");
        }
    }

    return (
        <div className="h-100 d-flex align-items-center" onSubmit={handleSubmit}>
            <form className="form-signin bg-dark rounded-3 d-flex flex-column align-items-center mx-auto col-12 p-4 p-sm-5 col-sm-8 col-md-6 col-lg-4">
                <img className="mb-4" src={Logo} alt="Explor Logo" style={{ objectFit: "contain", width: 200 }} />
                <h1 className="h3 mb-3 font-weight-normal text-light">Please sign in</h1>
                <label className="sr-only">Username</label>
                <input ref={userNameRef} className="form-control" placeholder="Username" required />
                <label className="sr-only mt-3">Password</label>
                <input ref={passwordRef} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                {/* <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">{loading ? <div style={{ height: "1.5rem", width: "1.5rem" }} className="spinner-border" /> : "Login"}</button>
            </form>
        </div>
    )
}

export default SignInPage;