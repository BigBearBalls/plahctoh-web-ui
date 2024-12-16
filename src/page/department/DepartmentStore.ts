import {makeAutoObservable} from "mobx";
import {DepartmentDTO} from "../../models/DepartmentDTO";
import {DepartmentService} from "./DepartmentService";
import {Department} from "../../models/Department";
import {PreviewAccountDTO} from "../../models/PreviewAccountDTO";
import AccountService from "../account/AccountService";

export default class DepartmentStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _departments: Department[] = [] as Department[];
    private _selectedDepartment: Department = {} as Department;
    private _selectedDepartmentUsers: PreviewAccountDTO[] = [];
    private _page: number = 1;
    private _size: number = 10;

    set size(value: number) {
        this._size = value;
    }

    set page(value: number) {
        this._page = value;
    }

    set departments(value: Department[]) {
        this._departments = value;
    }

    set selectedDepartment(value: Department) {
        this._selectedDepartment = value;
    }

    set selectedDepartmentUsers(value: PreviewAccountDTO[]) {
        this._selectedDepartmentUsers = value;
    }

    get page() {
        return this._page;
    }

    get departments() {
        return this._departments;
    }

    get size() {
        return this._size;
    }

    get selectedDepartment() {
        return this._selectedDepartment;
    }

    get selectedDepartmentUsers() {
        return this._selectedDepartmentUsers;
    }

    async getDepartmentPage() {
        const response = await DepartmentService.getDepartmentPage(this.page, this.size);
        const departmentDTOS: DepartmentDTO[] = response.data.departments;
        if (departmentDTOS.length !== 0) {
            this.departments = await Promise.all(
                departmentDTOS.map(async (departmentDTO: DepartmentDTO): Promise<Department> => {
                    const department: Department = {
                        id: departmentDTO.id,
                        departmentName: departmentDTO.departmentName,
                        teamLeaderAccountPreview: {} as PreviewAccountDTO,
                    };

                    if (departmentDTO.teamLeaderId) {
                        const accountResponse = await AccountService.getAccountPreview(departmentDTO.teamLeaderId);
                        department.teamLeaderAccountPreview = accountResponse.data;
                    }

                    return department;
                })
            );
        }
    }

    async getDepartment(departmentId: string) {
        const response = await DepartmentService.getDepartment(departmentId);
        let teamLeaderAccountPreview = undefined;
        if (response.data.teamLeaderId) {
            const teamLeader = await AccountService.getAccountPreview(response.data.teamLeaderId);
            teamLeaderAccountPreview = teamLeader.data;
        }
        this.selectedDepartment = {
            id: response.data.id,
            departmentName: response.data.departmentName,
            teamLeaderAccountPreview: teamLeaderAccountPreview,
        };
    }

    async getDepartmentUsers(departmentId: string) {
        const response = await DepartmentService.getDepartmentUsers(departmentId);

    }
}