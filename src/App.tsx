import React, {useState, useEffect} from 'react';
import './App.css';
import { ICustomerData, IBookingData, IRoomData } from './Types/OverlookTypes'

function App() {


  const [currentUser, setCurrentUser] = useState()
  const [customers, setAllCustomers] = useState([])
  const [rooms, setAllRooms] = useState([])
  const [bookings, setAllBookings] = useState([])

  const [userBookings, setUserBookings] = useState([])

  


  const fetchData = (dataSet: string) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`).then((res) => res.json())
  }

  const fetchAll = () => {
   let apiCustomersData = fetchData('customers')
   let apiRoomsData = fetchData('rooms')
   let apiBookingsData = fetchData('bookings')
   return Promise.all([apiCustomersData, apiRoomsData, apiBookingsData])
  }

  useEffect(() => {
    fetchAll().then((data) => {
      setAllCustomers(data[0].customers)
      setAllRooms(data[1].rooms)
      setAllBookings(data[2].bookings)
    })
  }, []);

  const getCurrentUser = (id: number) => {
   const user: any =  customers.find((customer: ICustomerData) => customer.id === id)
   setCurrentUser(user)
   getCurrentBookings(user.id)
   getTotalRoomCost()
  }

  const getCurrentBookings = (id: number) => {
    const userBookings = bookings.filter((booking: IBookingData) => booking.userID === id)
    setUserBookings(userBookings)
  }

  const getTotalRoomCost = () => {
    let total = rooms.reduce((acc: number, curr: IRoomData) => {

      userBookings.forEach((booking: IBookingData) => {
        if (booking.roomNumber === curr.number) {
          acc += curr.costPerNight
        }
      })
      return acc
    }, 0)
    console.log(total.toFixed(2))
    return total.toFixed(2)
  }

  return (
    <>
    <div onClick={() => getCurrentUser(1) }>APP</div>
    </>
  );
}

export default App;
