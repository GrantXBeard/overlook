import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [customers, setCustomers] = useState()
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

console.log(customers)
  return (
    <div>APP</div>
  );
}

export default App;
