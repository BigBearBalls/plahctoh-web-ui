import {Type} from "../fragment/popup-block/Type";
import {popUpStore} from "../Context";

export class AsyncMethodTryCatchWrapper {
    static async withErrorHandling<T>(promise: Promise<T>): Promise<T | null> {
        try {
            return await promise;
        } catch (error: any) {
            console.error("Error occurred:", error);
            popUpStore.setPopUp(true, Type.ERROR, error.response?.data.message);
            return null;
        }
    }
}