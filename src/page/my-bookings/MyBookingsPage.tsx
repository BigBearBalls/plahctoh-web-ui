import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { myBookingsStore } from "./MyBookingsStore";
import { Booking } from "../../models/dto/Booking";
import "./MyBookingsStyles.css";

const MyBookingsPage: React.FC = observer(() => {
    const [sortOption, setSortOption] = useState("none");

    useEffect(() => {
        myBookingsStore.fetchBookings();
    }, []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = event.target.value;
        setSortOption(newSort);
        myBookingsStore.sortBookings(newSort);
    };

    const bookingLine = (booking: Booking, index: number) => {
        const startTime =
            booking?.timeSlots?.length
                ? booking.timeSlots[0]?.reservationStart?.slice(0, 5) || "N/A"
                : "N/A";

        const endTime =
            booking?.timeSlots?.length
                ? booking.timeSlots[booking.timeSlots.length - 1]?.reservationEnd?.slice(0, 5) || "N/A"
                : "N/A";

        return (
            <div key={booking.id} className="booking-line">
                <p className="column-value">{index + 1}</p>
                <p className="column-value">Meeting Room №{booking.meetingRoom.number}</p>
                <p className="column-value">{booking.bookingDate}</p>
                <p className="column-value">{startTime}</p>
                <p className="column-value">{endTime}</p>
                <p className="column-value">{booking.status}</p>
            </div>
        );
    };

    const nothingFoundBookingLine = () => {
        return (
            <div className="booking-line nothing-found">
                <p className="column-value"></p>
                <p className="column-value">Nothing found!</p>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="sorting-container">
                <label className="sorting-title">Sort by:</label>
                <select className="sorting-dropdown" value={sortOption} onChange={handleSortChange}>
                    <option value="none">None</option>
                    <option value="dateAsc">Date ↑</option>
                    <option value="dateDesc">Date ↓</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="meetingRoom">Meeting Room</option>
                </select>
            </div>

            <div className="booking-page">
                <div className="booking-table">
                    <div className="booking-line">
                        <p>№</p>
                        <p className="column-title">Meeting Room</p>
                        <p className="column-title">Date</p>
                        <p className="column-title">Start Time</p>
                        <p className="column-title">End Time</p>
                        <p className="column-title">Status</p>
                    </div>
                    {myBookingsStore.bookings.length !== 0
                        ? myBookingsStore.bookings.map((booking, index) =>
                            bookingLine(booking, index)
                        )
                        : nothingFoundBookingLine()}
                </div>
            </div>
        </div>
    );
});

export default MyBookingsPage;
