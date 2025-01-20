import React from "react";
import { observer } from "mobx-react-lite";
import { tokenStore } from "../teamlead-settings/TeamLeadStore";

const Header: React.FC = observer(() => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">PLAHCTOH</div>
                <ul className="nav-links">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/departments">Departments</a></li>
                    <li><a href="/meeting-rooms">Meeting Rooms</a></li>
                </ul>
                {tokenStore.token && (
                    <div className="token-display">
                        <span>Invite Token: {tokenStore.token}</span>
                    </div>
                )}
            </nav>
        </header>
    );
});

export default Header;
