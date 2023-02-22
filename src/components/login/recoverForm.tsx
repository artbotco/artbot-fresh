import React, {useState} from "react";
import {resetPassword}   from "services/util";
import "./modal.scss";
import Group             from "../structural/Group";
import Button            from "../visual/Button";

function RecoverForm(props: any) {
    const [email, setEmail] = useState({value: "", touch: false, error: false});

    const [message, setMessage] = useState({
        message: "",
        error: false,
        general: false
    });
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        let resetResponse = await resetPassword({email: email.value.trim()});
        if (resetResponse.data.code === "ABT0000") {
            setMessage({
                message: resetResponse.data.message,
                error: false,
                general: true
            });
            setEmail({...email, value: ""});
            localStorage.setItem("isMovieChangePassword", 'true');
        } else {
            setMessage({
                message: resetResponse.data.message,
                error: true,
                general: true
            });
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Forgot Password</h1>
            <form onSubmit={submitHandler} className={"form form-centered padding"}>
                <div className="form-container">
                    <div className={"form-item"}>
                        <label htmlFor="email">Email:</label>
                        <input
                            required
                            type="email"
                            value={email.value}
                            onChange={(e) =>
                                setEmail({
                                    value: e.target.value,
                                    touch: true,
                                    error: e.target.value ? false : true
                                })
                            }
                            className="form-control login-form__input"
                            placeholder="Email"
                        />
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
                <Button type="submit" className={"margin-half-top"}>
                    Submit
                </Button>
                <Button color={"secondary"} onClick={props.backToLogin} notoggle="#aside-login"  className={"justify-content-center margin-half-top"}>Back</Button>
            </form>
        </>
    );
}

export default RecoverForm;
