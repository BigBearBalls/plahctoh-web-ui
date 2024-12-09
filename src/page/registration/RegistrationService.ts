import $api from "../../http";
import RegistrationRequest from "../../models/dto/RegistrationRequest";

export default class RegistrationService {
    static async register(request: RegistrationRequest) {
        await $api.post("/auth/registration", request)
    }
}