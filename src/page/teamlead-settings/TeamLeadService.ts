import { AxiosResponse } from "axios";
import $api from "../../http";

export class TokenService {
    static async generateToken(): Promise<AxiosResponse<{ registrationToken: string }>> {
        return $api.post<{ registrationToken: string }>("/tokens/");
    }
}
