import { makeAutoObservable } from "mobx";
import { MeetingRoomService } from "./MeetingRoomService";
import { MeetingRoomDto } from "../../models/dto/MeetingRoomDto";

interface TimeSlot {
    startTime: string;
    endTime: string;
    status: "free" | "approved" | "pending" | "past";
    teamLeadName?: string; // Имя тим-лида (опционально)
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

            const allSlots = this.generateAllSlots(date);this._timeSlots = allSlots.map((slot) => {
                const matchingSlot = bookedSlots.find(
                    (booked) => booked.reservationStart.slice(0, 5) === slot.startTime
                );

                if (matchingSlot) {
                    const teamLeadName = matchingSlot.teamLeadFirstName && matchingSlot.teamLeadSecondName
                        ? `${matchingSlot.teamLeadFirstName} ${matchingSlot.teamLeadSecondName}`
                        : undefined;

                    if (matchingSlot.status === "APPROVED") {
                        return { ...slot, status: "approved" };
                    } else if (matchingSlot.status === "PENDING") {
                        return { ...slot, status: "pending", teamLeadName }; // Добавляем имя тим-лида
                    }
                }

                if (this.isPastSlot(slot.startTime, new Date(date))) {
                    return { ...slot, status: "past" };
                }

                return { ...slot, status: "free" };
            });


        } catch (error: any) {
            this._error = error.message || "Error fetching time slots.";
        } finally {
            this._loading = false;
        }
    }

    private isPastSlot(startTime: string, selectedDate: Date): boolean {
        const slotDateTime = new Date(selectedDate);
        const [hours, minutes] = startTime.split(":").map(Number);
        slotDateTime.setHours(hours, minutes, 0, 0);
        return slotDateTime < new Date();
    }

    private generateAllSlots(date: string): TimeSlot[] {
        const slots: TimeSlot[] = [];
        const [year, month, day] = date.split("-").map(Number);

        let currentTime = new Date(year, month - 1, day, 8, 0);
        const endTime = new Date(year, month - 1, day, 20, 0);

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

    async saveBooking(meetingRoomId: string, bookingDate: string, bookingStart: string, bookingEnd: string) {
        this._loading = true;
        this._error = null;

        try {
            await MeetingRoomService.createBooking(meetingRoomId, bookingDate, bookingStart, bookingEnd);
            await this.fetchTimeSlots(meetingRoomId, bookingDate);
        } catch (error: any) {
            this._error = error.message || "Error saving booking.";
        } finally {
            this._loading = false;
        }
    }
}


export { MeetingRoomStore };
export const meetingRoomStore = new MeetingRoomStore();