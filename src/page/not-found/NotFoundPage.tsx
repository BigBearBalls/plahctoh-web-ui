import React from 'react';
import "./NotFoundStyles.css"
import {Link, NavLink} from "react-router";

function NotFoundPage() {
    return (
        <div className="container">
            <div className="not-found">
                <p>404</p>
                <p>Not found!</p>
                <NavLink to="/">Go back to the homepage</NavLink>
            </div>
        </div>
    );
}

export default NotFoundPage;