import React, {useEffect, useState} from 'react';
import {accountStore} from "../../Context";
import "./AccountStyles.css"
import { getReadableValue} from "../../models/enums/DepartmentRole";
import {Navigate, useNavigate, useParams} from "react-router";
import {User} from "../../models/User";
import {AsyncMethodTryCatchWrapper} from "../../util/AsyncMethodTryCatchWrapper";

function AccountPage() {

    const { userId } = useParams();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    const moveToTeamLeaderAccount = (teamLeaderId: string) => {
        navigate(`/account/${teamLeaderId}`)
    }

    useEffect(() => {
        if (userId) {
            AsyncMethodTryCatchWrapper.withErrorHandling(accountStore.getUserAccountById(userId).then(setUser));
        } else {
            accountStore.getUserAccount().then(setUser);
        }
    }, [userId]);
    
    return (
        <>
            <div className="container">
                <div className="account-page">
                    <p className="title">Account</p>
                    {(user && user.id !== undefined) ? <div className="info-block">
                        <div className="account-image">

                        </div>
                        <div className="info">
                            <p>Full name: {user.firstName} {user.lastName}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone number: {user.phoneNumber}</p>
                            {user.departmentName && <div>
                                <p>Department:</p>
                                {user.departmentName ? <p className="ref">{user.departmentName}</p> : ''}
                            </div>}
                            {user.teamLeader && <div>
                                <p>Team leader:</p>
                                {(user.teamLeader?.firstName || user.teamLeader?.lastName) ?
                                    <p className="ref" onClick={() => {if (user?.teamLeader?.id)
                                    {moveToTeamLeaderAccount(user.teamLeader.id);}}}>
                                        {user.teamLeader?.firstName} {user.teamLeader?.lastName}
                                    </p> : ''}
                            </div>}
                            {user.role && <p>Role: {user.role ? `${getReadableValue(user.role)}` : ''}</p>}
                        </div>
                    </div> : <div> Nothing found! </div>}
                </div>
            </div>
        </>
    );
}

export default AccountPage;