import {makeAutoObservable} from "mobx";

export default class GlobalStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _isAuthenticated: boolean = false;
    private _isLoading: boolean = false;

    set isLoading(value: boolean) {
        this._isLoading = value;
    }

    get isLoading() {
        return this._isLoading;
    }

    set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }
}