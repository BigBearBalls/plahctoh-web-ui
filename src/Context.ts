import LoginStore from "./page/auth-page/LoginStore";
import GlobalStore from "./store/GlobalStore";
import AccountStore from "./page/account/AccountStore";
import RegistrationStore from "./page/registration/RegistrationStore";
import {PopUpStore} from "./fragment/popup-block/PopUpStore";
import DepartmentStore from "./page/department/DepartmentStore";

export const authStore = new LoginStore();
export const globalStore = new GlobalStore();
export const accountStore = new AccountStore();
export const registrationStore = new RegistrationStore();
export const popUpStore = new PopUpStore();
export const departmentStore = new DepartmentStore();