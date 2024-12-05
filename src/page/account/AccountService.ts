import {AxiosResponse} from "axios";
import $api from "../../http";
import {User} from "../../models/User";

export default class AccountService {
    static async getAccountInfo() : Promise<AxiosResponse<User>> {
        return await $api.get("/account/")
    }
}