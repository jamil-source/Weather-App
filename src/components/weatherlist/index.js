import React from 'react'
import {Col, Row} from 'react-bootstrap';
import WeatherCard from '../weathercard';


const WeatherList = ({weathers}) => {

    console.log(weathers)

     const weather = weathers.map(item => ({
        date: item.dt_txt,
        type: item.weather[0].main,
        temp: item.main.temp_max,
        windspeed: item.wind.speed,
        humidity: item.main.humidity
     }));




    return (
        <Row>
            {weather.map((item) => (
            
                <Col key={item.date}>
                    <WeatherCard 
                    temp_max={item.temp}
                    dt={item.date}
                    main={item.type}
                    windspeed = {item.windspeed}
                    humidity = {item.humidity}
                    />
                </Col>
            ))} 
        </Row>
    )
}

export default WeatherList;
