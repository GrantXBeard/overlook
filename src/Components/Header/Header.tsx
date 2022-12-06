import React from "react";
import { ICustomerData } from "../../Types/OverlookTypes"

interface IHeaderProps {
    user: ICustomerData | undefined
    roomCost: string
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>
    showAdd: boolean
    setDate: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ user, roomCost, setShowAdd, showAdd, setDate}: IHeaderProps) => {
    return (
        <div>
            <h1>Overlook</h1>
            {user && 
            <>
                <p>{`Welcome Back ${user.name.split(' ')[0]}!`}</p>
                <p>{`You've spent $${roomCost} on bookings.`}</p>
                <div>
                    {!showAdd ? <button onClick={() => setShowAdd(true)}>Add Booking</button> : <input type="date" onChange={event => setDate(event.target.value)}></input>}
                </div>
            </>
            }
        </div>
    )
}

export default Header;