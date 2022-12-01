import React from "react";
import './Display.css'
import { IBookingData } from "../../Types/OverlookTypes";


interface IDisplayProps {
    bookings: IBookingData[]
}

const Display = ({ bookings }: IDisplayProps) => {

    const cards = bookings.map(booking => {
        return(
            <div className="display-card" key={booking.id}>
                <p>{booking.date}</p>
                <p>Room: {booking.roomNumber}</p>
            </div>
        )
    })

    return (
        <div>{cards}</div>
    )
}

export default Display;