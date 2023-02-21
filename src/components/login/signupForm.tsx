import jwt_decode        from "jwt-decode";
import React, {useState} from "react";
import {useDispatch}     from "react-redux";
import {login, signUp}   from "services/util";
import { loginUser } from "_redux/reducers/auth.duck";
import "./modal.scss";

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
    const [remember, setRemember] = useState(false);
    const [profileImage, setProfileImg] = useState(null);
    const [message, setMessage] = useState({message: "", error: false});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
            if (process.browser) window.scrollTo(0, 0);
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
            <div>Sign Up</div>
            <form onSubmit={submitHandler}>
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
                <div>
                    <div>
                        <input type="checkbox" id="termsOfUse" name="termsOfUse" />
                        <label htmlFor="termsOfUse">I agree to the terms of use</label>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={props.backToLogin}>Back</button>
        </>
    );
}

export default SignUpForm;
