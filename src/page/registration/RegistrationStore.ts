import {makeAutoObservable} from "mobx";
import {User} from "../../models/User";
import {accountStore, globalStore, popUpStore} from "../../Context";
import {Constants} from "../../util/Constants";
import RegistrationService from "./RegistrationService";
import Violation from "../../models/dto/Violation";
import RegistrationRequest from "../../models/dto/RegistrationRequest";
import {Type} from "../../fragment/popup-block/Type";

export default class RegistrationStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _errors: { [key: string]: string; } = {};

    setError(field: string, message: string = "") {
        if (message) {
            this._errors[field] = message;
        } else {
            delete this._errors[field];
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

    async registration(request: RegistrationRequest, navigate: (path: string) => void) {
        if (request.password !== request.confirmPassword) {
            this.setError("passwordsMatch", "Passwords do not match");
            return
        }
        globalStore.isLoading = true;
        try {
            await RegistrationService.register(request);
            popUpStore.setPopUp(true, Type.SUCCESS, "Successfully registered");
            this.clearErrors();
            navigate("/login");
        } catch (e: any) {
            // globalStore.checkException(e);
            console.log(e.response?.data);
            this.clearErrors();
            if (e.response.status === 400 &&
                e.response.data.message as Iterable<Violation> &&
                e.response.data.code === "ERR_METHOD_ARGUMENTS_VALIDATION_EXCEPTION") {
                let violationArray: Violation[] = JSON.parse(e.response.data.message);
                for (const detail of violationArray) {
                    this.setError(detail.fieldName, detail.message);
                }
            } else if (e.response.status === 409) {
                if (e.response.data.code === "ERR_USER_ALREADY_EXISTS") {
                    this.setError("email", "User already exists");
                }
                if (e.response.data.code === "ERR_PHONE_NUMBER_ALREADY_EXISTS") {
                    this.setError("phoneNumber", "Phone number already exists");
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