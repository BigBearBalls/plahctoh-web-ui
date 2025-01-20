export interface Booking {
    id: string;
    meetingRoom: {
        id: string;
        number: number;
    };
    bookingDate: string;
    timeSlots: { reservationStart: string; reservationEnd: string }[];
    userId: string;
    status: "PENDING" | "APPROVED" | "CANCELLED";
}
