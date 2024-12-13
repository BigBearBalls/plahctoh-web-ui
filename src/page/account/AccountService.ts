import {AxiosResponse} from "axios";
import $api from "../../http";
import {User} from "../../models/User";
import {PreviewAccountDTO} from "../../models/PreviewAccountDTO";
import {DepartmentDTO} from "../../models/DepartmentDTO";
import PreviewsAccountsResponse from "../../models/dto/PreviewsAccountsResponse";
import FindUsersAccountsRequest from "../../models/dto/FindUsersAccountsRequest";

export default class AccountService {
    static async getAccountInfo() : Promise<AxiosResponse<User>> {
        return await $api.get("/accounts/")
    }

    static async getAccountInfoById(userId: string) : Promise<AxiosResponse<User>> {
        return await $api.get(`/accounts/${userId}`)
    }

    static async getAccountPreview(userId: string) : Promise<AxiosResponse<PreviewAccountDTO>> {
        return await $api.get(`/accounts/${userId}/preview`)
    }

    static async searchAccounts(request: FindUsersAccountsRequest) : Promise<AxiosResponse<PreviewsAccountsResponse>> {
        return await $api.get(`/accounts/search`, {params: {
                firstName: request.firstName,
                lastName: request.lastName
            }})
    }
}