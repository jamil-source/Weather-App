import React from "react";
import { Col, Row } from "react-bootstrap";
import WeatherCardHourly from "../hourly_weathercard";
import WeatherCardDaily from "../daily_weathercard";


const WeatherList = ({ weathersHourly, weathersDaily }) => {
  console.log(weathersHourly);

  const weatherHourly = weathersHourly.map((item) => ({
    date: item.dt_txt,
    type: item.weather[0].main,
    temp: item.main.temp_max,
    windspeed: item.wind.speed,
    humidity: item.main.humidity,
  }));

  const weatherDaily = weathersDaily.map(item => ({
    temperature: item.temp.max,
    date: item.dt,
    type: item.weather[0].main,
    sunrise: item.sunrise,
    sunset: item.sunset,
    humidity: item.humidity,
    windspeed: item.speed
 }));

  return (
    <>
    <h1>Hourly</h1>
    <Row>
      {weatherHourly.map((item) => (
        <Col
          md={3}
          key={item.date}
          style={{
            marginBottom: "30px",
          }}
        >
          <WeatherCardHourly
            temp_max={item.temp}
            dt={item.date}
            main={item.type}
            windspeed={item.windspeed}
            humidity={item.humidity}
          />
        </Col>
      ))}
    </Row>
    <h1>Daily</h1>
    <Row>
      {weatherDaily.map((item) => (
        <Col
          md={3}
          key={item.date}
          style={{
            marginBottom: "30px",
          }}
        >
          <WeatherCardDaily
            temp_max={item.temperature}
            dt={item.date}
            main={item.type}
            sunset={item.sunset}
            sunrise={item.sunrise}
            windspeed={item.windspeed}
            humidity={item.humidity}
          />
        </Col>
      ))}
    </Row>
    </>
  );
};

export default WeatherList;
