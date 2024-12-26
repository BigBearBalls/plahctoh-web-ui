import { makeAutoObservable } from "mobx";
import { MeetingRoomService } from "./MeetingRoomService";
import { MeetingRoomDto } from "../../models/dto/MeetingRoomDto";

interface TimeSlot {
    startTime: string;
    endTime: string;
    status: "free" | "booked";
}

class MeetingRoomStore {
    private _meetingRooms: MeetingRoomDto[] = [];
    private _timeSlots: TimeSlot[] = [];
    private _loading: boolean = false;
    private _error: string | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get meetingRooms() {
        return this._meetingRooms;
    }

    get timeSlots() {
        return this._timeSlots;
    }

    get loading() {
        return this._loading;
    }

    get error() {
        return this._error;
    }

    async fetchMeetingRooms() {
        this._loading = true;
        this._error = null;

        try {
            const response = await MeetingRoomService.getMeetingRooms();
            this._meetingRooms = response.data;
        } catch (error: any) {
            this._error = error.message || "Error fetching meeting rooms.";
        } finally {
            this._loading = false;
        }
    }

    async fetchTimeSlots(roomId: string, date: string) {
        this._loading = true;
        this._error = null;

        try {
            const response = await MeetingRoomService.getBookedTimeSlots(roomId, date);
            const bookedSlots = response.data;

            const allSlots = this.generateAllSlots(date);
            this._timeSlots = allSlots.map((slot) => {
                const isBooked = bookedSlots.some(
                    (booked) => booked.reservationStart.slice(0, 5) === slot.startTime
                );
                return {
                    ...slot,
                    status: isBooked ? "booked" : "free",
                };
            });
        } catch (error: any) {
            this._error = error.message || "Error fetching time slots.";
        } finally {
            this._loading = false;
        }
    }

    private generateAllSlots(date: string): TimeSlot[] {
        const slots: TimeSlot[] = [];
        const [year, month, day] = date.split("-").map(Number);

        let currentTime = new Date(year, month - 1, day, 8, 0); // Начало: 8:00
        const endTime = new Date(year, month - 1, day, 20, 0); // Конец: 20:00

        while (currentTime < endTime) {
            const start = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + 15);
            slots.push({
                startTime: start.toTimeString().slice(0, 5),
                endTime: currentTime.toTimeString().slice(0, 5),
                status: "free",
            });
        }

        return slots;
    }
}

export { MeetingRoomStore };
export const meetingRoomStore = new MeetingRoomStore();
