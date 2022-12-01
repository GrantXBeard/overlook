import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login/Login';
import { ICustomerData, IBookingData, IRoomData } from './Types/OverlookTypes'

function App() {


  const [currentUser, setCurrentUser] = useState<ICustomerData>()
  const [customers, setAllCustomers] = useState([])
  const [rooms, setAllRooms] = useState([])
  const [bookings, setAllBookings] = useState([])
  const [userBookings, setUserBookings] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

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

  const checkLoginInput = (username: string, password: string) => {
    let id = parseInt(username.split('').splice(8).join(''))
    customers.forEach((customer: ICustomerData) => {
      if (customer.id === id && password === 'overlook2021') {
        setErrorMessage('')
        getCurrentUser(id)
      } else {
        setErrorMessage('Please enter a valid username and password')
      }
    })
  }

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
    return total.toFixed(2)
  }
  console.log(currentUser)

  return (
    <>
      <div>APP</div>
      {currentUser === undefined && <Login handleUserInput={checkLoginInput}/>}
      {/* {errorMessage.length > 1 && <h2>{errorMessage}</h2>} */}
      {currentUser && 
      <>
        <p>{`Welcome Back ${currentUser.name.split(' ')[0]}!`}</p>
        <p>{`You've spent $${getTotalRoomCost()} on bookings.`}</p>
      </>
      }
    </>
  );
}

export default App;
