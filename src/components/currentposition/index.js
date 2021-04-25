import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap';
import sunriseImg from '../../icons/sunrise.png'
import sunsetImg from '../../icons/sunset.png'


const CurrentPosition = () => {
    const [data, setData] = useState(null);
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [humidity, setHumidity] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [time, setTime] = useState('');





    const [toggle, setToggle] = useState(true);


    const toggler = () =>{
        toggle ? setToggle(false) : setToggle(true);
    }


    // const savePositionInState = (position) => {
    //     setLatitude(position.coords.latitude);
    //     setLongitude(position.coords.longitude);
    // }
    
     useEffect(() => {

        navigator.geolocation.getCurrentPosition((position)=>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Fetch from openweather api
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=dc6b63228195dc787438b6747ec72813`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(data.name);
                setTemperature(data.main.temp)
                setWindSpeed(data.wind.speed)
                setHumidity(data.main.humidity)
                setWeather(data.weather[0].main)

                
            })
            .catch((error) => {
                alert(error)
            });

            // Fetch from sunrise-sunset api
            fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setSunrise(data.results.sunrise);
                setSunset(data.results.sunset)
            })
        })


    }, []);


    setInterval(() => {
            let date = new Date();
            setTime(date.toLocaleTimeString())
            
    }, 1000)



    return (
        <Card>
            <h1>Current position</h1>
            <Card.Img
            />
            
            <Card.Body>
              <Card.Title>{data}</Card.Title>
              <Card.Title>{weather}</Card.Title>
              <p>Degrees: {toggle ? Math.round(temperature) + '°C' : Math.round((temperature) + 32) + '°F'} <button onClick ={toggler}>{toggle ? 'Fahrenheit': 'Celsius'}</button></p>
              <p>Wind speed: {windSpeed}</p>
              <p>Humidity: {humidity}</p>
              <p>Sunrise: {sunrise} <img src={sunriseImg} alt="sunrise"/></p>
              <p>Sunset: {sunset} <img src={sunsetImg} alt="sunset"/></p>


              <p>Current time: {time}</p>

            </Card.Body>
        </Card>
      
    )
}

export default CurrentPosition;
