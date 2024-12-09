import React from 'react';
import {accountStore} from "../../Context";
import "./AccountStyles.css"

function AccountPage() {
    return (
        <>
            <div className="container">
                <div className="account-page">
                    <p className="title">Account</p>
                    <div className="info-block">
                        <div className="account-image">

                        </div>
                        <div className="info">
                            <p>First name: {accountStore.user.firstName}</p>
                            <p>Last name: {accountStore.user.lastName}</p>
                            <p>Email: {accountStore.user.email}</p>
                            <p>Phone number: {accountStore.user.phoneNumber}</p>
                            <p>Department: {accountStore.user.department}</p>
                            <p>Team leader: {accountStore.user.teamLeader}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountPage;