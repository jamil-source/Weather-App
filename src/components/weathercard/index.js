import React, {useState} from 'react';
import {Card} from 'react-bootstrap';

const WeatherCard = ({dt, temp_max, main, icon, windspeed, humidity}) => {
  const date = new Date(dt); 
  const [toggle, setToggle] = useState(true);



  
  const imgChange = () => {
    if(main === 'Rain') return "http://simpleicon.com/wp-content/uploads/rain.png";
    else if(main ==="Clouds") return  "http://simpleicon.com/wp-content/uploads/cloud.png";
    else if(main === "Thunderstorm") return "http://simpleicon.com/wp-content/uploads/tstorm.png";
    else if(main === "Drizzle") return "http://simpleicon.com/wp-content/uploads/light_rain.png";
    else if(main === "Snow") return "http://simpleicon.com/wp-content/uploads/snow_6.png";
    else if(main === "Clear") return "http://simpleicon.com/wp-content/uploads/haze.png";
    else return "http://simpleicon.com/wp-content/uploads/haze_1.png";
  }

  const toggler = () =>{
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <Card>
      <Card.Img 
      variant="top"
      src = {imgChange()}
      />
      
      <Card.Body>
        <Card.Title>{main}</Card.Title>
        <p>{date.toLocaleDateString()} - {date.toLocaleTimeString()}</p>
        <p>Degrees: {toggle ? Math.round(temp_max) + '°C' : Math.round((temp_max * 1.8) + 32) + '°F'} <button onClick ={toggler}>{toggle ? 'Fahrenheit': 'Celsius'}</button></p>
        <p>Windspeed: {windspeed}</p>
        <p>Humidity: {humidity}</p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;