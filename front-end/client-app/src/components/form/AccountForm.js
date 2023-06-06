import React, { useContext, useRef, useState } from 'react';

import ls from 'localstorage-slim';
import { useNavigate } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import useScrollDisable from '../../hooks/useScrollDisable';
import "../../styles/partials/pages/AccountForm.css";
import axios from 'axios';
import { message } from 'antd';
// import VerificationCodeInput from './verificationCode';
const AccountForm = () => {

    const { isFormOpen, toggleForm } = useContext(commonContext);
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const tel = useRef();
    const [type, setType] = useState();
    let history = useNavigate()

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);


    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
    };

    const handlIncsriptionSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            tel: tel.current.value,
            type: type,

        })
            .then((res) => {
                console.log(res.data)
                ls.set('token', res.data.token, { encrypt: true })
                ls.set('user', JSON.stringify(res.data.user), { encrypt: true })
                history('/')
                toggleForm(false)
                message.info(res.data.message)
            })
            .catch((error) => {
                message.error(error.response.data.name[0]);
                message.error(error.response.data.email[0]);
                message.error(error.response.data.tel[0]);
                message.error(error.response.data.password[0]);
            });

    };

    const handelLoginSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email: email.current.value,
            password: password.current.value

        }).then(response => {
            console.log(response)
            toggleForm(false)
            if (response.data.banne) {
                message.error(response.data.banne)
            } else {
                ls.set('token', response.data.token, { encrypt: true })
                ls.set('user', JSON.stringify(response.data.user), { encrypt: true })
                history('/verificationCode')
            }

        }
        ).catch(error => {
            console.log(error)
            message.error(error.response.data.error)
        })
        // const user = JSON.parse(sessionStorage.getItem('user'));

        // const isLoggedIn = !!token && !!user;
    }
    return (
        <>
            {
                isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            {isSignupVisible ? (
                                <form id="account_form" onSubmit={handlIncsriptionSubmit}>
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

                                    <div className="form_body">
                                        <div className="input_box">
                                            <input
                                                type="text"
                                                name="username"
                                                className="input_field"
                                                required
                                                ref={name}
                                            />
                                            <label className="input_label">Username</label>
                                        </div>
                                        <div className="input_box">
                                            <input
                                                type="text"
                                                name="mail"
                                                className="input_field"
                                                required
                                                ref={email}
                                            />
                                            <label className="input_label">Email</label>
                                        </div>
                                        <div className="input_box">
                                            <input
                                                ref={tel}
                                                type="text"
                                                name="tel"
                                                className="input_field"
                                                required
                                            />
                                            <label className="input_label">tel</label>
                                        </div>
                                        <div className="input_box">
                                            <input

                                                type="password"
                                                name="password"
                                                className="input_field"
                                                required
                                                ref={password}
                                            />
                                            <label className="input_label">Password</label>
                                        </div>
                                        <div className="input_box">
                                            <input
                                                type="password"
                                                name="conf_password"
                                                className="input_field"
                                                required
                                            />
                                            <label className="input_label">Confirm Password</label>
                                        </div>
                                        <div className="input_box">
                                            <label className="radio">
                                                type de compte : {" "}
                                            </label>
                                            <label className="radio">
                                                {" "}
                                                vendeur
                                            </label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="vendeur"
                                                onClick={e => { setType(e.target.value) }}
                                                required
                                            />

                                            <label className="radio">
                                                {" "}
                                                acheteur
                                            </label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="acheteur"
                                                onClick={e => { setType(e.target.value) }}
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn login_btn">
                                            {isSignupVisible ? 'Signup' : 'Login'}
                                        </button>

                                    </div>
                                </form>) : (
                                <form id="account_form" onSubmit={handelLoginSubmit}>
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
                                    <div className="form_body">
                                        <div className="input_box">
                                            <input
                                                type="text"
                                                name="mail"
                                                className="input_field"
                                                required
                                                ref={email}
                                            />
                                            <label className="input_label">Email</label>
                                        </div>

                                        <div className="input_box">
                                            <input
                                                type="password"
                                                name="password"
                                                className="input_field"
                                                required
                                                ref={password}
                                            />
                                            <label className="input_label">Password</label>
                                        </div>
                                        <button
                                            type='submit'
                                            className="btn login_btn">
                                            {isSignupVisible ? 'Signup' : 'Login'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;