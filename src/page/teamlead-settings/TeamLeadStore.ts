import { makeAutoObservable } from "mobx";
import { TokenService } from "./TeamLeadService";

class TokenStore {
    private _registrationToken: string | null = null;
    private _loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get token() {
        return this._registrationToken;
    }

    get loading() {
        return this._loading;
    }

    async fetchToken() {
        this._loading = true;
        try {
            const response = await TokenService.generateToken();
            this._registrationToken = response.data.registrationToken;
        } catch (error) {
            console.error("Failed to generate token:", error);
            this._registrationToken = "Error generating token";
        } finally {
            this._loading = false;
        }
    }
}

export const tokenStore = new TokenStore();
