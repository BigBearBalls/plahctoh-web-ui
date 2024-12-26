import { AxiosResponse } from "axios";
import $api from "../../http";
import { MeetingRoomDto } from "../../models/dto/MeetingRoomDto";

interface TimeSlotResponseDTO {
    reservationStart: string;
    reservationEnd: string;
}

export class MeetingRoomService {
    static async getMeetingRooms(): Promise<AxiosResponse<MeetingRoomDto[]>> {
        return $api.get<MeetingRoomDto[]>("/bookings/meeting-rooms");
    }

    static async getBookedTimeSlots(
        roomId: string,
        date: string
    ): Promise<AxiosResponse<TimeSlotResponseDTO[]>> {
        const requestBody = { id: roomId, date };
        return $api.post<TimeSlotResponseDTO[]>("/bookings/booked-time-slots", requestBody);
    }
}
