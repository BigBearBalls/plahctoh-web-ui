import React from 'react';
import {Link, NavLink} from "react-router";
import {observer} from "mobx-react-lite";
import "./HeaderStyles.css"
import {accountStore, authStore} from "../../Context";

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-body">
                    <div className="title">
                        <p>Plankton</p>
                    </div>
                    <div>
                        <ul className="nav">
                            <NavLink className={({isActive}) => isActive ?
                                'li btn-effect active' : 'li btn-effect'} to="/home">Home</NavLink>
                        </ul>
                        <div className="account">
                            <p className="name">
                                {accountStore.user.firstName} {accountStore.user.lastName}
                            </p>
                            <div className="logo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default observer(Header);