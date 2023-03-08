import {loginUser}       from "_redux/reducers/auth.duck";
import jwt_decode        from "jwt-decode";
import React, {useState} from "react";
import {connect}         from "react-redux";
import {useNavigate}     from "react-router-dom";
import {login}           from "services/util";
import Group             from "../structural/Group";
import Button            from "../visual/Button";
import "./login.scss";

const LoginForm = (props: any) => {
    const [username, setUsername] = useState({
        value: "",
        touch: false,
        error: false
    });
    const [password, setPassword] = useState({
        value: "",
        touch: false,
        error: false
    });
    const [remember, setRemember] = useState(true);
    const [message, setMessage] = useState({
        message: "",
        error: false,
        general: false
    });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const submitHandler = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        let loginResponse = await login({
            username: username.value,
            password: password.value
        });
        if (loginResponse.code === "ABT0000") {
            props.login(
                jwt_decode(loginResponse.data.userToken),
                loginResponse.data.userToken
            );
            window.location.reload();
        } else {
            setLoading(false);
            setMessage({
                message: loginResponse.message,
                error: true,
                general: true
            });
        }
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submitHandler} className={"form form-centered padding"}>
                <div className="form-container">
                    {/* icon here */}
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
                <div className="form-container">
                    {/* icon here */}
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
                                    error: e.target.value ? false : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div className="form-container">
                    <div className="form-item radio">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(event) => setRemember(event.target.checked)}
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>
                {loading && <div>Loading...</div>}
                {message?.message && (
                    <div
                        style={{
                            color: message.error ? "red" : "green",
                            marginTop: "16px"
                        }}
                    >
                        {message?.message}
                    </div>
                )}
                <button type="submit" className={"btn btn-primary margin-half-top notoggle"}>
                    Log In
                </button>
                <Group className={"justify-content-center margin-half-top"}>
                    <Button color={"secondary"} notoggle="#aside-login" onClick={props.toSignup}>Sign Up</Button>
                    <Button color={"secondary"} notoggle="#aside-login" onClick={props.toRecover}>Recover</Button>
                </Group>
            </form>
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    login: (data: any, token: any) => dispatch(loginUser(data, token))
});

export default connect(null, mapDispatchToProps)(LoginForm);
