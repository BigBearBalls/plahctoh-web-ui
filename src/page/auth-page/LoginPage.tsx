import React, {useState} from 'react';
import LoginRequest from "../../models/dto/LoginRequest";
import {authStore, globalStore} from "../../Context";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import "./LoginStyles.css"
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router";


function LoginPage() {
    const [authData, setAuthData] = useState<LoginRequest>({
        email: "",
        password: ""
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const onChange = (e: any) => {
        const {name, value} = e.target;
        setAuthData({
            ...authData,
            [name]: value,
        });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        authStore.login(authData, navigate);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className="auth-page">
            <h1>Plankton</h1>
            <div className="auth-page-block">
                <h1>Login</h1>
                <label>
                    <div>
                        <p>Email</p>
                    </div>
                    <div className={`${(authStore.hasError("email") || authStore.hasError("wrongCredentials")) && "error"} input-field`}>
                        <input type="text" name="email" onChange={onChange}
                               className={`${authStore.hasError("email") && "error"}`}/>
                        <div className="error-icon">
                            {(authStore.hasError("email") || authStore.hasError("wrongCredentials")) && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {authStore.hasError("email") && <p className="red-color">{authStore.getError("email")}</p>}
                </label>
                <label>
                    <div>
                        <p>Password</p>
                    </div>
                    <div className={`${(authStore.hasError("password") || authStore.hasError("wrongCredentials")) && "error"} input-field`}>
                        <input type={passwordVisible ? 'text' : 'password'}
                               name="password" onChange={onChange}/>
                        <div className="password-visible-icon">
                            {passwordVisible ? <IoEyeOutline onClick={togglePasswordVisibility}/> :
                                <IoEyeOffOutline onClick={togglePasswordVisibility}/>}
                        </div>
                        <div className="error-icon">
                            {(authStore.hasError("password") || authStore.hasError("wrongCredentials")) && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {authStore.hasError("password") && <p className="red-color">{authStore.getError("password")}</p>}
                    {authStore.hasError("wrongCredentials") && <p className="red-color">Неправильная почта или пароль!</p>}
                </label>
                {(authData.email !== "" && authData.password !== "") ?
                    <button onClick={onSubmit} className={`${globalStore.isLoading && 'loading'}`}>Sign
                        In</button> :
                    <button className="disabled">Sign In</button>
                }
                <NavLink to={"/registration"} className="registration-link">Sign Up</NavLink>
            </div>
        </div>
    );
}

export default observer(LoginPage);