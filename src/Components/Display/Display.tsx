import React from "react";
import './Display.css'
import { IBookingData, IRoomData } from "../../Types/OverlookTypes";


interface IDisplayProps {
    userBookings: IBookingData[]
    rooms: IRoomData[]
    showAdd: boolean
}

const Display = ({ userBookings, rooms, showAdd }: IDisplayProps) => {

    const availableRooms = rooms.map(room => {
        return(
            <div className="display-card">
                <p>Room #: {room.number}</p>
                <p>Type: {room.roomType}</p>
                <p>Beds: {room.numBeds}</p>
                <p>Bed size: {room.bedSize}</p>
                <p>Cost per night: ${room.costPerNight}</p>
                <button>Book!</button>
            </div>
        )
    })

    const bookedCards = userBookings.map(booking => {
        return(
            <div className="display-card" key={booking.id}>
                <p>{booking.date}</p>
                <p>Room: {booking.roomNumber}</p>
            </div>
        )
    })

    return (
        <div>{
            showAdd ? 
            availableRooms
            :
            bookedCards
        }</div>
    )
}

export default Display;