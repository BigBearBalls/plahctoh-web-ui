import LoginStore from "./page/auth-page/LoginStore";
import GlobalStore from "./store/GlobalStore";
import AccountStore from "./page/account/AccountStore";
import RegistrationStore from "./page/registration/RegistrationStore";
import {PopUpStore} from "./fragment/popup-block/PopUpStore";
import DepartmentStore from "./page/department/DepartmentStore";
import {MeetingRoom} from "@mui/icons-material";
import {MeetingRoomStore} from "./page/meeting-room/MeetingRoomStore";
// import {TeamLeadStore} from "./page/teamlead-settings/TeamLeadStore";

export const authStore = new LoginStore();
export const globalStore = new GlobalStore();
export const accountStore = new AccountStore();
export const registrationStore = new RegistrationStore();
export const popUpStore = new PopUpStore();
export const departmentStore = new DepartmentStore();
export const meetingRoomStore = new MeetingRoomStore();
// export const teamLeaderStore = new TeamLeadStore();