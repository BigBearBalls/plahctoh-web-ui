import {DepartmentDTO} from "../DepartmentDTO";

export interface DepartmentsPageResponse {
    departments: DepartmentDTO[];
    totalCount: number;
}