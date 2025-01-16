import React, { useEffect, useState } from 'react';
import { accountStore } from "../../Context";
import "./AccountStyles.css";
import { DepartmentRole, getReadableValue } from "../../models/enums/DepartmentRole";
import { useNavigate, useParams } from "react-router";
import { User } from "../../models/User";
import { AsyncMethodTryCatchWrapper } from "../../util/AsyncMethodTryCatchWrapper";

function AccountPage() {
    const { userId } = useParams();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    const moveToTeamLeaderAccount = (teamLeaderId: string) => {
        navigate(`/account/${teamLeaderId}`);
    };

    const handleTeamLeadAction = () => {
        navigate("/team-lead-settings");
    };

    const transformRole = (role: string | undefined): DepartmentRole | null => {
        switch (role) {
            case "TEAM_LEADER":
                return DepartmentRole.TEAM_LEADER;
            case "DEVELOPER":
                return DepartmentRole.DEVELOPER;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (userId) {
            AsyncMethodTryCatchWrapper.withErrorHandling(accountStore.getUserAccountById(userId).then(setUser));
        } else {
            accountStore.getUserAccount().then(setUser);
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            console.log("User Role:", user.role || "Role not set");
        }
    }, [user]);

    return (
        <>
            <div className="container">
                <div className="account-page">
                    {transformRole(user?.role) === DepartmentRole.TEAM_LEADER && (
                        <button
                            className="team-lead-button"
                            onClick={handleTeamLeadAction}
                        >
                            TEAM LEAD ACTION
                        </button>
                    )}

                    <p className="title">Account</p>
                    {(user && user.id !== undefined) ? (
                        <div className="info-block">
                            <div className="account-image"></div>
                            <div className="info">
                                <p>Full name: {user.firstName} {user.lastName}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone number: {user.phoneNumber}</p>
                                {user.departmentName && (
                                    <div>
                                        <p>Department:</p>
                                        {user.departmentName ? <p className="ref">{user.departmentName}</p> : ''}
                                    </div>
                                )}
                                {user.teamLeader && (
                                    <div>
                                        <p>Team leader:</p>
                                        {(user.teamLeader?.firstName || user.teamLeader?.lastName) ? (
                                            <p className="ref" onClick={() => {
                                                if (user?.teamLeader?.id) {
                                                    moveToTeamLeaderAccount(user.teamLeader.id);
                                                }
                                            }}>
                                                {user.teamLeader?.firstName} {user.teamLeader?.lastName}
                                            </p>
                                        ) : ''}
                                    </div>
                                )}
                                {user.role && <p>Role: {user.role ? `${getReadableValue(user.role)}` : ''}</p>}
                            </div>
                        </div>
                    ) : (
                        <div> Nothing found! </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
