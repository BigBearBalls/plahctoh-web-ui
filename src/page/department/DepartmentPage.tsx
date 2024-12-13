import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router";
import {departmentStore} from "../../Context";
import "./DepartmentStyles.css"
import {Department} from "../../models/Department";
import {observer} from "mobx-react-lite";
import DepartmentInfo from "./DepartmentInfo";
import {AsyncMethodTryCatchWrapper} from "../../util/AsyncMethodTryCatchWrapper";

function DepartmentPage() {

    const { departmentId } = useParams();
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            AsyncMethodTryCatchWrapper.withErrorHandling(departmentStore.getDepartmentPage())

        }
    })

    const departmentLine = (department: Department, index: number) => {
        return <div key={department.id} className="department-line" onClick={()=>
            departmentStore.getDepartment(department.id)}>
            <p className="column-value">{index+1}</p>
            <p className="column-value">{department.departmentName}</p>
            {department.teamLeaderAccountPreview &&
                <p className="column-value">{department.teamLeaderAccountPreview.firstName} {department.teamLeaderAccountPreview.lastName}</p> }

        </div>
    }

    return (
        <div className="container">
            <div className="department-page">
                <div className="department-table">
                    <div className="department-line">
                        <p>№</p>
                        <p className="column-title">Title</p>
                        <p className="column-title">Team Leader</p>
                    </div>
                    {departmentStore.departments.map((department, index) =>
                        departmentLine(department, index))}
                </div>
                {departmentStore.selectedDepartment.id !== undefined && <DepartmentInfo/>}
            </div>
        </div>
    );
}

export default observer(DepartmentPage);