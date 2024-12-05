import {makeAutoObservable} from "mobx";
import {User} from "../../models/User";
import LoginRequest from "../../models/dto/LoginRequest";
import {accountStore, globalStore} from "../../Context";
import {Constants} from "../../util/Constants";
import AuthService from "./AuthService";
import AccountService from "../account/AccountService";
import $api from "../../http";

export default class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _wrongLogin: boolean = false;
    private _wrongPassword: boolean = false;

    set wrongLogin(flag: boolean) {
        this._wrongLogin = flag;
    }

    get wrongPassword() {
        return this._wrongPassword;
    }

    set wrongPassword(flag: boolean) {
        this._wrongPassword = flag;
    }

    get wrongLogin() {
        return this._wrongLogin;
    }

    async login(loginRequest: LoginRequest) {
        // globalStore.isLoaded = false;
        this.wrongLogin = false;
        this.wrongPassword = false;
        try {
            const response = await AuthService.login(loginRequest);
            const responseAccount = await AccountService.getAccountInfo();
            localStorage.setItem(Constants.ACCESS_TOKEN_KEY, response.data.accessToken);
            localStorage.setItem(Constants.USER_KEY, JSON.stringify(responseAccount.data));

            accountStore.user = responseAccount.data
            globalStore.isAuthenticated = true;
            console.log(responseAccount.data + " " + response.data.accessToken)

        } catch (e: any) {
            // globalStore.checkException(e);
            globalStore.isAuthenticated = false;
            console.log(e.response?.data);
/*            if (e.response.status === 400 &&
                e.response.data.exceptionDetails as Iterable<ErrorTemplate>) {
                for (const detailArray of e.response.data.exceptionDetails) {
                    for (const detail of detailArray) {
                        if (detail.fieldName === 'password') {
                            this.wrongPassword = true;
                        }
                        if (detail.fieldName === 'username') {
                            this.wrongLogin = true;
                        }
                    }
                }
            } else if (e.response.status === 404) {
                if (e.response.data.exceptionMessage === "User not found!") {
                    this.wrongLogin = true;
                }
            } else if (e.response.status === 403) {
                if (e.response.data.exceptionMessage === "Access denied!") {
                    this.wrongPassword = true;
                }
            }*/
        } /*finally {
            globalStore.isLoaded = true;
        }*/
    }

    async logout() {
        try {
            localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
            localStorage.removeItem(Constants.USER_KEY);
            accountStore.user = {} as User;
            globalStore.isAuthenticated = false;
        } catch (e) {
            // globalStore.checkException(e);
        }
    }

/*    async checkAuth() {
        // globalStore.isLoaded = false;
        try {

            const response = await $api.post(`/auth/refresh`, {},
                {withCredentials: true});
            console.log(response.data);
            localStorage.setItem(Constants.ACCESS_TOKEN_KEY, response.data.accessToken);
            localStorage.setItem(Constants.USER_KEY, JSON.stringify(response.data.userDTO))
            this.user = response.data.userDTO;
            if (this.user) {
                globalStore.isAuthenticated = true;
            }
        } catch (e) {
            globalStore.isAuthenticated = false;
            this.user = {} as User;
        } finally {
            globalStore.isLoaded = true;
        }
    }*/


}