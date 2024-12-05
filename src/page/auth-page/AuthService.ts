import LoginRequest from "../../models/dto/LoginRequest";
import {Axios, AxiosResponse} from 'axios';
import LoginResponse from "../../models/dto/LoginResponse";
import $api from "../../http";

export default class AuthService {
    static async register() {

    }

    static async login(loginRequest: LoginRequest) : Promise<AxiosResponse<LoginResponse>> {
        return await $api.post("/auth/login", loginRequest)
    }

    // static async logout(): Promise<void> {
    //     await $api.post("/auth/logout");
    // }
}