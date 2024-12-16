import {makeAutoObservable} from "mobx";
import {User} from "../../models/User";
import LoginRequest from "../../models/dto/LoginRequest";
import {accountStore, globalStore} from "../../Context";
import {Constants} from "../../util/Constants";
import LoginService from "./LoginService";
import AccountService from "../account/AccountService";
import Violation from "../../models/dto/Violation";
import $api from "../../http";

export default class LoginStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _errors: { [key: string]: string; } = {};

    setError(field: string, message: string) {
        if (message) {
            this._errors[field] = message;
        }
    }

    getError(field: string): string | undefined {
        return this._errors[field];
    }

    hasError(field: string): boolean {
        return field in this._errors;
    }

    clearErrors() {
        this._errors = {}
    }

    async login(loginRequest: LoginRequest, navigate: (path: string) => void) {
        globalStore.isLoading = true;
        try {
            const response = await LoginService.login(loginRequest);
            localStorage.setItem(Constants.ACCESS_TOKEN_KEY, response.data.accessToken);
            await accountStore.getUserAccount()
            navigate("/home")
            globalStore.isAuthenticated = true;
            this.clearErrors();
        } catch (e: any) {
            // globalStore.checkException(e);
            globalStore.isAuthenticated = false;
            console.log(e.response);
            this.clearErrors();
            if (e.response.status === 400 &&
                e.response.data.message as Iterable<Violation> &&
                e.response.data.code === "ERR_METHOD_ARGUMENTS_VALIDATION_EXCEPTION") {
                let violationArray: Violation[] = JSON.parse(e.response.data.message);
                for (const detail of violationArray) {
                    this.setError(detail.fieldName, detail.message);
                }
            } else if (e.response.status === 401) {
                if (e.response.data.code === "ERR_WRONG_CREDENTIALS") {
                    this.setError("wrongCredentials", "Wrong email or password!");
                }
            }
        } finally {
            globalStore.isLoading = false;
        }
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

    async checkAuth() {
        globalStore.isLoading = true;
        try {
            // const response = await $api.post(`/auth/refresh`, {},
            //     {withCredentials: true});

            if (localStorage.getItem(Constants.ACCESS_TOKEN_KEY) != null) {
                await accountStore.getUserAccount()
                globalStore.isAuthenticated = true
            } else {
                globalStore.isAuthenticated = false;
            }
            // localStorage.setItem(Constants.ACCESS_TOKEN_KEY, response.data.accessToken);
        } catch (e) {
            globalStore.isAuthenticated = false;
        } finally {
            globalStore.isLoading = false;
        }
    }


};