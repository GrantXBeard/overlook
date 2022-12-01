import React from "react";
import { IBookingData } from "../../Types/OverlookTypes";


interface IDisplayProps {
    bookings: IBookingData[]
}

const Display = ({ bookings }: IDisplayProps) => {
    return (
        <div>Display</div>
    )
}

export default Display;