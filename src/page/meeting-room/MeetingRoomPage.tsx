import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {meetingRoomStore} from "./MeetingRoomStore";
import {popUpStore} from "../../Context";
import "./MeetingRoomStyles.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {Type} from "../../fragment/popup-block/Type";

type CalendarValue = Date | [Date, Date] | null;

interface TimeSlot {
    startTime: string;
    endTime: string;
    status: "free" | "booked" | "selected";
}

const MeetingRoomPage: React.FC = observer(() => {
    const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [doubleClickIndexes, setDoubleClickIndexes] = useState<number[]>([]);

    const isButtonVisible = timeSlots.some((slot) => slot.status === "selected");

    useEffect(() => {
        meetingRoomStore.fetchMeetingRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomId && selectedDate instanceof Date) {
            const formattedDate = formatLocalDate(selectedDate);
            meetingRoomStore.fetchTimeSlots(selectedRoomId.toString(), formattedDate);
        }
    }, [selectedRoomId, selectedDate]);

    useEffect(() => {
        setTimeSlots(meetingRoomStore.timeSlots.map((slot) => ({ ...slot, status: slot.status })));
    }, [meetingRoomStore.timeSlots]);

    const formatLocalDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const onDateChange = (value: Date | Date[] | null) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    const onRoomSelect = (room: { id: number; number: number }) => {
        if (selectedRoomId === room.id) return;
        setSelectedRoomId(room.id);
        setSelectedRoom(`Meeting Room №${room.number}`);
        setTimeSlots([]);
        setDoubleClickIndexes([]);
    };

    const handleSlotClick = (index: number) => {
        const updatedSlots = [...timeSlots];

        updatedSlots[index].status =
            updatedSlots[index].status === "selected" ? "free" : "selected";

        setTimeSlots(updatedSlots);
    };

    const handleSlotDoubleClick = (index: number) => {
        const updatedDoubleClickIndexes = [...doubleClickIndexes, index];

        if (updatedDoubleClickIndexes.length === 2) {
            const [startIndex, endIndex] = updatedDoubleClickIndexes.sort((a, b) => a - b);

            const updatedSlots = [...timeSlots];

            const hasBookedSlots = updatedSlots
                .slice(startIndex + 1, endIndex)
                .some((slot) => slot.status === "booked");

            if (hasBookedSlots) {
                popUpStore.setPopUp(
                    true,
                    Type.ERROR,
                    "You cannot select slots that include booked slots in between."
                );

                updatedSlots.forEach((slot) => {
                    if (slot.status === "selected") {
                        slot.status = "free";
                    }
                });
            } else {
                for (let i = startIndex; i <= endIndex; i++) {
                    updatedSlots[i].status = "selected";
                }
            }

            setDoubleClickIndexes([]);
            setTimeSlots(updatedSlots);
        } else {
            setDoubleClickIndexes(updatedDoubleClickIndexes);
        }
    };

    const handleBooking = () => {
        const selectedIndexes = timeSlots
            .map((slot, index) => (slot.status === "selected" ? index : -1))
            .filter((index) => index !== -1);

        if (selectedIndexes.length === 0) {
            popUpStore.setPopUp(true, Type.ERROR, "You must select at least one slot to book.");
            return;
        }

        for (let i = 1; i < selectedIndexes.length; i++) {
            if (selectedIndexes[i] - selectedIndexes[i - 1] > 1) {
                popUpStore.setPopUp(
                    true,
                    Type.ERROR,
                    "Selected slots must be continuous without gaps."
                );
                return;
            }
        }

        popUpStore.setPopUp(true, Type.SUCCESS, "Booking successful!");
    };

    return (
        <div className="meeting-room-page">
            <h1>Meeting Rooms</h1>

            <div className="selected-info-container">
                <div className="selected-info">
                    <p>
                        Selected meeting room: <strong>{selectedRoom || "not selected"}</strong>
                    </p>
                    <p>
                        Selected date:{" "}
                        <strong>
                            {selectedDate instanceof Date
                                ? selectedDate.toLocaleDateString()
                                : "not selected"}
                        </strong>
                    </p>
                </div>
            </div>

            <div className="layout">
                <div className="meeting-room-grid">
                    {meetingRoomStore.meetingRooms.map((room) => (
                        <div
                            key={room.id}
                            className={`meeting-room-card ${
                                selectedRoomId === room.id ? "selected-room" : ""
                            }`}
                            onClick={() => (selectedRoomId !== room.id ? onRoomSelect(room) : null)}
                            style={{
                                cursor: selectedRoomId === room.id ? "not-allowed" : "pointer",
                                backgroundColor: selectedRoomId === room.id ? "#d0e8ff" : undefined,
                            }}
                        >
                            <h2>Meeting room №{room.number}</h2>
                        </div>
                    ))}
                </div>

                <div className="calendar-container">
                    <h2>Select date</h2>
                    <Calendar
                        value={selectedDate || undefined}
                        onChange={(value) => onDateChange(value as Date | Date[] | null)}
                    />
                    {isButtonVisible && (
                        <div className="booking-button-container">
                            <button className="booking-button" onClick={handleBooking}>
                                Booking
                            </button>
                        </div>
                    )}
                </div>

                <div className="time-slots-container">
                    <h2>Available Time Slots</h2>
                    <div className="time-slots-grid">
                        {timeSlots.map((slot, index) => (
                            <div
                                key={index}
                                className={`time-slot ${slot.status}`}
                                style={{
                                    backgroundColor:
                                        slot.status === "booked"
                                            ? "#f7d7d7"
                                            : slot.status === "selected"
                                                ? "#add8e6"
                                                : "#e0f7e9",
                                    cursor: slot.status === "booked" ? "not-allowed" : "pointer",
                                }}
                                onClick={() =>
                                    slot.status !== "booked" && handleSlotClick(index)
                                }
                                onDoubleClick={() =>
                                    slot.status !== "booked" && handleSlotDoubleClick(index)
                                }
                            >
                                {slot.startTime} - {slot.endTime}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MeetingRoomPage;
