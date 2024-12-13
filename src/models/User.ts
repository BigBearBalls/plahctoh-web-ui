import {PreviewAccountDTO} from "./PreviewAccountDTO";
import {DepartmentRole} from "./enums/DepartmentRole";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    departmentName?: string;
    teamLeader?: PreviewAccountDTO;
    role?: DepartmentRole;
}