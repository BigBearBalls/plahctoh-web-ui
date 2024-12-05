import {makeAutoObservable} from "mobx";
import {User} from "../../models/User";

export default class AccountStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _user: User = {} as User;

    set user(user: User) {
        this._user = user;
    }

    get user() {
        return this._user;
    }
}