import React from "react";
import './Display.css'
import { IBookingData, IRoomData } from "../../Types/OverlookTypes";


interface IDisplayProps {
    userBookings: IBookingData[]
    rooms: IRoomData[]
    showAdd: boolean
    chosenDate: string
    allBookings: IBookingData[]
}

const Display = ({ userBookings, rooms, showAdd, chosenDate, allBookings }: IDisplayProps) => {

    const getAvailableRooms = (date: string) => {
        var bookingsForDay = 
          allBookings.filter(booking => booking.date === date)
          .reduce((acc: any, curr) => {
            rooms.forEach((room: IRoomData) => {
              if (room.number !== curr.roomNumber) {
                acc.push(room)
              }
            })
            return acc
          }, [])
        let newArr = bookingsForDay.filter((bking: IBookingData, index: any) => {
          return bookingsForDay.indexOf(bking) !== index
        })
        return newArr
      }

    const availableRoomsDisplay = rooms.map(room => {
        return(
            <div className="display-card" key={room.number}>
                <p>Room #: {room.number}</p>
                <p>Type: {room.roomType}</p>
                <p>Beds: {room.numBeds}</p>
                <p>Bed size: {room.bedSize}</p>
                <p>Cost per night: ${room.costPerNight}</p>
                <button>Book!</button>
            </div>
        )
    })

    const bookedRooms = userBookings.map(booking => {
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
            availableRoomsDisplay
            :
            bookedRooms
        }</div>
    )
}

export default Display;