import LoginStore from "./page/auth-page/LoginStore";
import GlobalStore from "./store/GlobalStore";
import React, {createContext} from "react";
import AccountStore from "./page/account/AccountStore";
import RegistrationStore from "./page/registration/RegistrationStore";
import {PopUpStore} from "./fragment/popup-block/PopUpStore";

export interface State {
    authStore: LoginStore;
    globalStore: GlobalStore;
    accountStore: AccountStore;
    registrationStore: RegistrationStore;
    popUpStore: PopUpStore;
}

export const authStore = new LoginStore();
export const globalStore = new GlobalStore();
export const accountStore = new AccountStore();
export const registrationStore = new RegistrationStore();
export const popUpStore = new PopUpStore();

export const Context: React.Context<State> = createContext<State>({
    authStore,
    globalStore,
    accountStore,
    registrationStore,
    popUpStore,
})
