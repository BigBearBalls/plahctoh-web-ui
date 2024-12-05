import React, {useState} from 'react';
import LoginRequest from "../../models/dto/LoginRequest";
import {authStore, globalStore} from "../../Context";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import "./AuthStyles.css"


function AuthPage() {
    const [authData, setAuthData] = useState<LoginRequest>({
        email: "",
        password: ""
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const onChange = (e: any) => {
        const {name, value} = e.target;
        setAuthData({
            ...authData,
            [name]: value,
        });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        authStore.login(authData);
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
                        {authStore.wrongLogin && <p className="red-color">Неверный логин</p>}
                        {authStore.wrongLogin && <MdErrorOutline className="login-error-icon"/>}
                    </div>
                    <input type="text" name="username" onChange={onChange}
                           className={`${authStore.wrongLogin && "error"}`}/>
                </label>
                <label>
                    <div>
                        <p>Password</p> {authStore.wrongPassword && <p className="red-color">Неверный пароль</p>}
                    </div>
                    <input type={passwordVisible ? 'text' : 'password'}
                           name="password" onChange={onChange}
                           className={`${authStore.wrongPassword && "error"}`}/>
                    <div className="password-visible-icon">
                        {passwordVisible ? <IoEyeOutline onClick={togglePasswordVisibility}/> :
                            <IoEyeOffOutline onClick={togglePasswordVisibility}/>}
                    </div>
                </label>
                {(authData.email !== "" && authData.password !== "") ?
                    <button onClick={onSubmit} /*className={`${!globalStore.isLoaded && 'loading'}`}*/>Войти</button> :
                    <button className="disabled">Sign In</button>
                }

            </div>
        </div>
    );
}

export default AuthPage;