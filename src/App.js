import React, { useState, useEffect } from 'react';
import logo from './sun.svg';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false)
  const [errmessage, setErrmessage] = useState("")

  console.log("key:", process.env.REACT_APP_KEY)

    const fetchData = () => {
    fetch(`https:/api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9ea0aeab738bca025e8368d4febab564&units=metric`)
      // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_KEY}&units=metric`)
      .then(res => res.json())
      .then(res1 => {
       
        console.log(res1)
         if(!Object.keys(res1).includes("main")){
           
          setErrmessage(res1.message);
            setErr(true);
            setLoading(false)  
            console.log("here")
            console.log(err,errmessage)
       
         }else{
          setData(res1);
          setLoading(true)
          setErr(false);
         }
      })
  };


  const getData = (e) => {
    e.preventDefault();
    console.log(city);
    fetchData();
  }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Weather App</h1>
      </header>

      <form onSubmit={getData}>
        <input type="text" onChange={e => setCity(e.target.value)} />
        <button type="submit">search</button>
      </form>

      <div className="weather-content">

        {err ? errmessage : (<><h2>City: {city} </h2>
          <p>Current temperature: {loading ? data.main.temp : null} °C</p>
          <p>Max temperature: {loading ? data.main.temp_max : null} °C</p>
          <p>Min temperature: {loading ? data.main.temp_min : null} °C</p>
          <p>Humidity: {loading ? data.main.humidity : null} %</p>
          <p>Weather description: {loading ? data.weather[0].description : null} </p>
          <p>Wind deg: {loading ? data.wind.deg : null} </p>
          <p>Wind speed: {loading ? data.wind.speed : null} </p>
          : null
          </>)
        }

      </div>
    </div>
  );
}

export default App;
