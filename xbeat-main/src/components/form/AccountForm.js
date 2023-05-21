import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import commonContext from "../../contexts/common/commonContext";
import useForm from "../../hooks/useForm";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import "../../styles/partials/pages/AccountForm.css";
import { message } from "antd";
import axios from "axios";
const AccountForm = () => {
    const { isFormOpen, toggleForm } = useContext(commonContext);

    // const formRef = useRef();
    const name = useRef();
    const email = useRef();
    const tel = useRef();
    const password = useRef();
    const type = useRef();

    const handlSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/register", {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                tel: tel.current.value,
            })
            .then((res) => console.log(res))
            .catch((error) => {
                message.error(error.response.data.email[0]);
                message.error(error.response.data.password[0]);
            });
    };

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);

    // Signup-form visibility toggling
    const handleIsSignupVisible = () => {
        setIsSignupVisible((prevState) => !prevState);
    };

    return (
        <>
            {isFormOpen && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form id="account_form" onSubmit={handlSubmit}>
                            {/*===== Form-Header =====*/}
                            <div className="form_head">
                                <h2>{isSignupVisible ? "Signup" : "Login"}</h2>
                                <p>
                                    {isSignupVisible
                                        ? "Already have an account ?"
                                        : "New to X-Beat ?"}
                                    &nbsp;&nbsp;
                                    <button
                                        type="button"
                                        onClick={handleIsSignupVisible}
                                    >
                                        {isSignupVisible
                                            ? "Login"
                                            : "Create an account"}
                                    </button>
                                </p>
                            </div>

                            {/*===== Form-Body =====*/}
                            <div className="form_body">
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            name="username"
                                            className="input_field"
                                            ref={name}
                                            required
                                        />
                                        <label className="input_label">
                                            Username
                                        </label>
                                    </div>
                                )}

                                <div className="input_box">
                                    <input
                                        type="email"
                                        name="mail"
                                        className="input_field"
                                        ref={email}
                                        required
                                    />
                                    <label className="input_label">Email</label>
                                </div>
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            name="tel"
                                            className="input_field"
                                            ref={tel}
                                            required
                                        />
                                        <label className="input_label">
                                            telephone
                                        </label>
                                    </div>
                                )}

                                <div className="input_box">
                                    <input
                                        type="password"
                                        name="password"
                                        className="input_field"
                                        ref={password}
                                        required
                                    />
                                    <label className="input_label">
                                        Password
                                    </label>
                                </div>

                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="conf_password"
                                            className="input_field"
                                            required
                                        />
                                        <label className="input_label">
                                            Confirm Password
                                        </label>
                                    </div>
                                )}
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <label className="radio">
                                            type de compte{" "}
                                        </label>
                                        <input
                                            type="radio"
                                            name="type"
                                            // className="input_field"
                                            ref={type}
                                            required
                                        />
                                        <label className="radio">
                                            {" "}
                                            vendeur
                                        </label>
                                        <input
                                            type="radio"
                                            name="type"
                                            // className="input_field"
                                            ref={type}
                                            required
                                        />
                                        <label className="radio">
                                            {" "}
                                            acheteur
                                        </label>
                                    </div>
                                )}

                                <button className="btn login_btn">
                                    {isSignupVisible ? "Signup" : "Login"}
                                </button>
                            </div>

                            {/*===== Form-Footer =====*/}
                            {/* <div className="form_foot">
                                    <p>or login with</p>
                                    <div className="login_options">
                                        <Link to="/">Facebook</Link>
                                        <Link to="/">Google</Link>
                                        <Link to="/">Twitter</Link>
                                    </div>
                                </div> */}

                            {/*===== Form-Close-Btn =====*/}
                            <div
                                className="close_btn"
                                title="Close"
                                onClick={() => toggleForm(false)}
                            >
                                &times;
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountForm;
