import React from 'react';
import './App.css';

function App() {

  const fetchData = (dataSet: string) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`).then((res) => res.json())
  }


  return (
    <div>APP</div>
  );
}

export default App;
