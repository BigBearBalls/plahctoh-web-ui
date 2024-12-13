import {makeAutoObservable} from "mobx";
import {User} from "../../models/User";
import AccountService from "./AccountService";
import {Constants} from "../../util/Constants";
import {accountStore} from "../../Context";
import React from "react";

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

    async getUserAccount(): Promise<User> {
        if (this._user.id === undefined) {
            const responseAccount = await AccountService.getAccountInfo();
            localStorage.setItem(Constants.USER_KEY, JSON.stringify(responseAccount.data));
            this.user = responseAccount.data;
        }
        return this._user;
    }

    async getUserAccountById(userId: string): Promise<User> {
        const responseAccount = await AccountService.getAccountInfoById(userId);
        return responseAccount.data;
    }
}