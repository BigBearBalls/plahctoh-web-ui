import {AxiosResponse} from "axios";
import $api from "../../http";
import {DepartmentsPageResponse} from "../../models/dto/DepartmentsPageResponse";
import {DepartmentDTO} from "../../models/DepartmentDTO";

export class DepartmentService {
    static async getDepartmentPage(page: number, size: number) : Promise<AxiosResponse<DepartmentsPageResponse>> {
        return await $api.get("/departments/", {params: {page: page-1, size: size}});
    }
    static async getDepartment(departmentId: string) : Promise<AxiosResponse<DepartmentDTO>> {
        return await $api.get(`/departments/${departmentId}`);
    }
}