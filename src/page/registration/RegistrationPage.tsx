import React, {useState} from 'react';
import {registrationStore, globalStore} from "../../Context";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import "./RegistrationStyles.css"
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router";
import RegistrationRequest from "../../models/dto/RegistrationRequest";
import {Constants} from "../../util/Constants";


function RegistrationPage() {
    const [regData, setRegData] = useState<RegistrationRequest>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const onChange = (e: any) => {
        const {name, value} = e.target;
        if (!value) {
            registrationStore.setError(name);
        }
        setRegData({
            ...regData,
            [name]: value,
        });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        registrationStore.registration(regData, navigate);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className="registration-page">
            <h1>{Constants.APP_NAME}</h1>
            <div className="registration-page-block">
                <h1>Registration</h1>
                <label>
                    <div>
                        <p>Email</p>
                    </div>
                    <div
                        className={`${registrationStore.hasError("email") && "error"} input-field`}>
                        <input type="text" name="email" onChange={onChange}
                               className={`${registrationStore.hasError("email") && "error"}`}/>
                        <div className="error-icon">
                            {registrationStore.hasError("email") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("email") &&
                        <p className="red-color">{registrationStore.getError("email")}</p>}
                </label>
                <label>
                    <div>
                        <p>Password</p>
                    </div>
                    <div
                        className={`${registrationStore.hasError("password") && "error"} input-field`}>
                        <input type={passwordVisible ? 'text' : 'password'}
                               name="password" onChange={onChange}/>
                        <div className="password-visible-icon">
                            {passwordVisible ? <IoEyeOutline onClick={togglePasswordVisibility}/> :
                                <IoEyeOffOutline onClick={togglePasswordVisibility}/>}
                        </div>
                        <div className="error-icon">
                            {registrationStore.hasError("password") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("password") &&
                        <p className="red-color">{registrationStore.getError("password")}</p>}
                </label>
                <label>
                    <div>
                        <p>Confirm password</p>
                    </div>
                    <div className={`${registrationStore.hasError("passwordsMatch") && "error"} input-field`}>
                        <input type={passwordVisible ? 'text' : 'password'}
                               name="confirmPassword" onChange={onChange}/>
                        <div className="error-icon">
                            {registrationStore.hasError("passwordsMatch") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("passwordsMatch") &&
                        <p className="red-color">{registrationStore.getError("passwordsMatch")}</p>}
                </label>
                <label>
                    <div>
                        <p>First name</p>
                    </div>
                    <div className={`${registrationStore.hasError("firstName") && "error"} input-field`}>
                        <input name="firstName" onChange={onChange}/>
                        <div className="error-icon">
                            {registrationStore.hasError("firstName") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("firstName") &&
                        <p className="red-color">{registrationStore.getError("firstName")}</p>}
                </label>
                <label>
                    <div>
                        <p>Last name</p>
                    </div>
                    <div className={`${registrationStore.hasError("lastName") && "error"} input-field`}>
                        <input name="lastName" onChange={onChange}/>
                        <div className="error-icon">
                            {registrationStore.hasError("lastName") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("lastName") &&
                        <p className="red-color">{registrationStore.getError("lastName")}</p>}
                </label>
                <label>
                    <div>
                        <p>Phone number</p>
                    </div>
                    <div className={`${registrationStore.hasError("phoneNumber") && "error"} input-field`}>
                        <input name="phoneNumber" onChange={onChange}/>
                        <div className="error-icon">
                            {registrationStore.hasError("phoneNumber") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("phoneNumber") &&
                        <p className="red-color">{registrationStore.getError("phoneNumber")}</p>}
                </label>

                <label>
                    <div>
                        <p>TL Token</p>
                    </div>
                    <div className={`${registrationStore.hasError("tlToken") && "error"} input-field`}>
                        <input name="tlToken" onChange={onChange}/>
                        <div className="error-icon">
                            {registrationStore.hasError("tlToken") && <MdErrorOutline className="error-icon"/>}
                        </div>
                    </div>
                    {registrationStore.hasError("tlToken") &&
                        <p className="red-color">{registrationStore.getError("tlToken")}</p>}
                </label>

                {(regData.email && regData.password && regData.confirmPassword && regData.firstName && regData.lastName
                    && regData.phoneNumber) ?
                    <button onClick={onSubmit} className={`${globalStore.isLoading && 'loading'}`}>Sign
                        Up</button> :
                    <button className="disabled">Sign Up</button>
                }
                <NavLink to={"/login"} className="login-link">Sign In</NavLink>
            </div>
        </div>
    );
}

export default observer(RegistrationPage);