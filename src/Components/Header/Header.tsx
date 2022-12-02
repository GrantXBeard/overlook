import React from "react";
import { ICustomerData } from "../../Types/OverlookTypes"

interface IHeaderProps {
    user: ICustomerData | undefined;
    roomCost: string
}

const Header = ({ user, roomCost}: IHeaderProps) => {
    return (
        <div>
            <h1>Overlook</h1>
            {user && 
            <>
                <p>{`Welcome Back ${user.name.split(' ')[0]}!`}</p>
                <p>{`You've spent $${roomCost} on bookings.`}</p>
                <div>
                    <button>Add Booking</button>
                </div>
            </>
            }
        </div>
    )
}

export default Header;