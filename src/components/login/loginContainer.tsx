import {useState}  from "react";
import LoginForm   from "./loginForm";
import "./modal.scss";
import RecoverForm from "./recoverForm";
import SignUpForm  from "./signupForm";

const LoginContainer = () => {
    const [active, setActive] = useState("login");

    return (
        <>
            {active === "login" ? (
                <LoginForm
                    toSignup={() => setActive("signup")}
                    toRecover={() => setActive("recover")}
                />
            ) : active === "signup" ? (
                <SignUpForm backToLogin={() => setActive("login")} />
            ) : (
                <RecoverForm backToLogin={() => setActive("login")} />
            )}
        </>
    );
};

export default LoginContainer;
