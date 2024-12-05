import {makeAutoObservable} from "mobx";

export default class GlobalStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _isAuthenticated: boolean = false;

    set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }
}