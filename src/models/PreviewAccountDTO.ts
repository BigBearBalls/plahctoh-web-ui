import {DepartmentRole} from "./enums/DepartmentRole";

export interface PreviewAccountDTO {
    id: string;
    firstName: string;
    lastName: string;
    role: DepartmentRole;
}