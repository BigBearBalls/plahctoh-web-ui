import AuthStore from "./page/auth-page/AuthStore";
import GlobalStore from "./store/GlobalStore";
import React, {createContext} from "react";
import AccountStore from "./page/account/AccountStore";

export interface State {
    authStore: AuthStore;
    globalStore: GlobalStore;
    accountStore: AccountStore;
}

export const authStore = new AuthStore();
export const globalStore = new GlobalStore();
export const accountStore = new AccountStore();

export const Context: React.Context<State> = createContext<State>({
    authStore,
    globalStore,
    accountStore
})
