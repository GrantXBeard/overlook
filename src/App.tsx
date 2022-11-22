import React, {useState, useEffect} from 'react';
import './App.css';
import { ICustomerData } from './Types/Customers'

function App() {

  const [currentUser, setCurrentUser] = useState()
  const [customers, setCustomers] = useState([])
  const [rooms, setRooms] = useState()
  const [bookings, setBookings] = useState()

  


  const fetchData = (dataSet: string) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`).then((res) => res.json())
  }

  const fetchAll = () => {
   let apiCustomersData = fetchData('customers')
   let apiRoomsData = fetchData('rooms')
   let apiBookingsData =fetchData('bookings')
   return Promise.all([apiCustomersData, apiRoomsData, apiBookingsData])
  }

  useEffect(() => {
    fetchAll().then((data) => {
      setCustomers(data[0].customers)
      setRooms(data[1].rooms)
      setBookings(data[2].bookings)
    })
  }, []);

  const getCurrentUser = (id: number) => {
   const user =  customers.find((customer: ICustomerData) => customer.id === id)
   setCurrentUser(user)
  }
console.log(currentUser)
  return (
    <div onClick={() => getCurrentUser(1) }>APP</div>
  );
}

export default App;
