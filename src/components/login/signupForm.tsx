import React, {useState} from "react";
import {useDispatch}     from "react-redux";
import {signUp}   from "services/util";
import "./login.scss";
import Button            from "../visual/Button";

function SignUpForm(props: any) {
    const [username, setUsername] = useState({
        value: "",
        touch: false,
        error: false
    });
    const [email, setEmail] = useState({value: "", touch: false, error: false});
    const [password, setPassword] = useState({
        value: "",
        touch: false,
        error: false
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        touch: false,
        error: false
    });
    const [message, setMessage] = useState({message: "", error: false});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    let fn = () => {
        // This is just to stop ESLint seeing these as unused variables
        return {
            m: message,
            l: loading,
            d: dispatch
        };
    };
    fn();

    const submitHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        let responseData = await signUp({
            email: email.value,
            username: username.value,
            password: password.value,
            ...(props.inviteCode && {inviteCode: props.inviteCode}),
            ...(props.isMovie && {isMovie: props.isMovie})
        });
        if (responseData.code === "ABT0002") {
            if (typeof window !== 'undefined') window.scrollTo(0, 0);
            setMessage({message: responseData.message, error: true});
        }

        if (responseData.code === "ABT0000") {
            setMessage({message: responseData.message, error: false});
            setUsername({value: "", touch: false, error: false});
            setEmail({value: "", touch: false, error: false});
            setPassword({value: "", touch: false, error: false});
            setConfirmPassword({value: "", touch: false, error: false});
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler} className={"form form-centered padding"}>
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="username">Username:</label>
                        <input
                            required
                            type="text"
                            value={username.value}
                            onChange={(e) =>
                                setUsername({
                                    value: e.target.value,
                                    touch: true,
                                    error: e.target.value ? false : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Username"
                        />
                    </div>
                </div>
                {username.value.length < 4 && username.touch && (
                    <span className="text-danger text-center d-block font-weight-bold">
            Username must be alteast 4 characters long
          </span>
                )}
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="email">Email:</label>
                        <input
                            required
                            type="text"
                            value={email.value}
                            onChange={(e) =>
                                setEmail({
                                    value: e.target.value,
                                    touch: true,
                                    error: e.target.value ? false : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Username"
                        />
                    </div>
                </div>
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="password">Password:</label>
                        <input
                            required
                            type="password"
                            value={password.value}
                            onChange={(e) =>
                                setPassword({
                                    value: e.target.value,
                                    touch: true,
                                    error: password.value ? false : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Username"
                        />
                    </div>
                </div>
                {password.value.length < 6 && password.touch && (
                    <span className="text-danger text-center d-block font-weight-bold">
            Minimum length 6
          </span>
                )}
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="confirmPassword">Password:</label>
                        <input
                            required
                            type="password"
                            value={confirmPassword.value}
                            onChange={(e) =>
                                setConfirmPassword({
                                    value: e.target.value,
                                    touch: true,
                                    error:
                                        confirmPassword.value || confirmPassword !== password
                                            ? false
                                            : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Confirm password"
                        />
                    </div>
                </div>
                {confirmPassword.value !== password.value && confirmPassword.touch && (
                    <span className="text-danger text-center d-block font-weight-bold">
            Password Must Match With Previous Entry
          </span>
                )}
                <div className={"form-item radio"}>
                    <input type="checkbox" id="termsOfUse" name="termsOfUse" />
                    <label htmlFor="termsOfUse">I agree to the terms of use</label>
                </div>
                <Button type="submit" className={"margin-half-top notoggle"}>
                    Sign Up
                </Button>
                <Button color={"secondary"} onClick={props.backToLogin} notoggle="#aside-login"  className={"justify-content-center margin-half-top"}>Back</Button>
            </form>
        </>
    );
}

export default SignUpForm;
