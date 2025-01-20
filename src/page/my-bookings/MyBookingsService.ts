import { AxiosResponse } from "axios";
import $api from "../../http";
import { Booking } from "../../models/dto/Booking";
import { accountStore } from "../../Context";

export class MyBookingsService {
    static async getMyBookings(): Promise<AxiosResponse<Booking[]>> {
        const userId = accountStore.user.id; // Здесь нужно получить userId
        return $api.get<Booking[]>(`/bookings/my-bookings/${userId}`);
    }
}
