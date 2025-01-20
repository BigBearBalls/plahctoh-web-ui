import { makeAutoObservable } from "mobx";
import { MyBookingsService } from "./MyBookingsService";
import { Booking } from "../../models/dto/Booking";

class MyBookingsStore {
    bookings: Booking[] = [];
    originalBookings: Booking[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchBookings() {
        try {
            const response = await MyBookingsService.getMyBookings();
            this.bookings = response.data;
            this.originalBookings = [...response.data];
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    }

    sortBookings(criteria: string) {
        this.bookings = [...this.originalBookings];

        switch (criteria) {
            case "dateAsc":
                this.bookings.sort((a, b) => a.bookingDate.localeCompare(b.bookingDate));
                break;
            case "dateDesc":
                this.bookings.sort((a, b) => b.bookingDate.localeCompare(a.bookingDate));
                break;
            case "approved":
                this.bookings = this.bookings.filter(booking => booking.status === "APPROVED");
                break;
            case "pending":
                this.bookings = this.bookings.filter(booking => booking.status === "PENDING");
                break;
            case "meetingRoom":
                this.bookings.sort((a, b) => a.meetingRoom.number - b.meetingRoom.number);
                break;
            default:
                break;
        }
    }
}

export const myBookingsStore = new MyBookingsStore();
