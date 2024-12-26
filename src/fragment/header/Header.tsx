import React from 'react';
import {NavLink} from "react-router";
import {observer} from "mobx-react-lite";
import "./HeaderStyles.css"
import {accountStore, authStore} from "../../Context";
import { VscAccount } from "react-icons/vsc";
import {Constants} from "../../util/Constants";

function Header() {

    const handleLogout = () => {
        authStore.logout();
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-body">
                    <div className="title">
                        <p>{Constants.APP_NAME}</p>
                    </div>
                    <div>
                        <ul className="nav">
                            <NavLink className={({isActive}) => isActive ?
                                'li btn-effect active' : 'li btn-effect'} to="/home">Home</NavLink>
                            <NavLink className={({isActive}) => isActive ?
                                'li btn-effect active' : 'li btn-effect'} to="/departments">Departments</NavLink>
                            <NavLink className={({isActive}) => isActive ?
                                'li btn-effect active' : 'li btn-effect'} to="/meeting-room">Meeting Rooms</NavLink>
                        </ul>
                        <div className="account">
                            <p className="name">
                                {accountStore.user.firstName} {accountStore.user.lastName}
                            </p>
                            <NavLink className={({isActive}) => isActive ?
                                'active logo' : 'logo'} to="/account/">
                                <VscAccount className="logo"/>
                            </NavLink>
                            <p className="logout-btn btn-effect" onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default observer(Header);