import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Display from './Components/Display/Display';
import Header from './Components/Header/Header';
import { ICustomerData, IBookingData, IRoomData } from './Types/OverlookTypes'

function App() {

  const [currentUser, setCurrentUser] = useState<ICustomerData>()
  const [customers, setAllCustomers] = useState([])
  const [rooms, setAllRooms] = useState([])
  const [bookings, setAllBookings] = useState([])
  const [userBookings, setUserBookings] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [chosenDate, setChosenDate] = useState('')

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
    let idArray = customers.map((customer: ICustomerData) => customer.id)
    if (idArray.includes(id) && password === 'overlook2021') {
      getCurrentUser(id)
      setErrorMessage('')
    } else {
    setErrorMessage('Please enter a valid username and password')
    }
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

  const getAvailableRooms = (date: string) => {
    var bookingsForDay = 
      bookings.filter((booking: IBookingData) => booking.date === date)
      .reduce((acc: any, curr: IBookingData) => {
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

  return (
    <>
      <Header user={currentUser} roomCost={getTotalRoomCost()} setShowAdd={setShowAdd} showAdd={showAdd} setDate={setChosenDate}/>
      {!currentUser ? <Login handleUserInput={checkLoginInput}/> : 
      <>
        <Display  userBookings={userBookings} rooms={rooms} showAdd={showAdd} chosenDate={chosenDate} allBookings={bookings}/>
      </>}
      {errorMessage && errorMessage}
    </>
  );
}

export default App;
