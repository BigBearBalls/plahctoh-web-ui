import React, {useEffect, useState} from 'react';
import {departmentStore} from "../../Context";
import {useNavigate} from "react-router";
import {Department} from "../../models/Department";

function DepartmentInfo() {
    const navigate = useNavigate();

    return (
        <div className="department-info">
            <p className="title">Department: {departmentStore.selectedDepartment.departmentName}</p>
            {departmentStore.selectedDepartment.teamLeaderAccountPreview &&
                <div className="team-leader">
                    <p>Team Leader: </p>
                    <p onClick={() => (departmentStore.selectedDepartment.teamLeaderAccountPreview) ?
                        navigate(`/account/${departmentStore.selectedDepartment.teamLeaderAccountPreview.id}`) : null}>
                        {departmentStore.selectedDepartment.teamLeaderAccountPreview.firstName}
                        &nbsp;{departmentStore.selectedDepartment.teamLeaderAccountPreview.lastName}</p>
                </div>
            }
        </div>
    );
}

export default DepartmentInfo;