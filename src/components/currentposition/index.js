import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Row, Container, Col } from "react-bootstrap";
import sunriseImg from "../../images/sunri.png";
import sunsetImg from "../../images/sunse.png";
import rain from "../../images/rain.png";
import drizzle from "../../images/drizzle.png";
import clouds from "../../images/clouds.png";
import snow from "../../images/snow.png";
import sunny from "../../images/sunny.png";
import thunderstorm from "../../images/thunderstorm.png";
import moon from "../../images/moon.png";
import day from "../../images/mor.png";
import night from "../../images/nig.png";
import pin from "../../images/loc.png";

const CurrentPosition = () => {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [time, setTime] = useState("");

  const [toggle, setToggle] = useState(true);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  // const savePositionInState = (position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  // }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Fetch from openweather api
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data.name);
          setTemperature(data.main.temp);
          setWindSpeed(data.wind.speed);
          setHumidity(data.main.humidity);
          setWeather(data.weather[0].main);
        })
        .catch((error) => {
          alert(error);
        });

      // Fetch from sunrise-sunset api
      fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSunrise(data.results.sunrise);
          setSunset(data.results.sunset);
        });
    });
  }, []);

  setInterval(() => {
    let date = new Date();
    setTime(date.toLocaleTimeString());
  }, 1000);

  const picChanger = () => {
    let today = new Date().getHours();
    if (today >= 7 && today <= 19) {
      return day;
    } else {
      return night;
    }
  };

  const imgChange = () => {
    let today = new Date().getHours();
    if (weather === "Rain") return rain;
    else if (weather === "Clouds") return clouds;
    else if (weather === "Thunderstorm") return thunderstorm;
    else if (weather === "Drizzle") return drizzle;
    else if (weather === "Snow") return snow;
    else if (weather === "Clear" && today >= 7 && today <= 19) {
      return sunny;
    } else if (weather === "Clear") {
      return moon;
    } else return "http://simpleicon.com/wp-content/uploads/haze_1.png";
  };

  return (
    <Card
      className="mainCard"
      style={{
        background: "url(" + picChanger() + ")",
      }}
    >
      <Container fluid>
        <Row>
          <Col
            xl={6}
            style={{ borderRight: "2px solid white", color: "white" }}
          >
            <Card.Title className="currentLocTitle">
              <img
                src={pin}
                alt="pin"
                style={{ width: "20px", marginRight: "5px" }}
              />{" "}
              {data}
            </Card.Title>

            <div className="imgTemp d-flex">
              <Card.Img variant="top" src={imgChange()} />

              <p style={{ fontSize: "60px", display: "flex" }}>
                <span
                  style={{
                    width: "193px",
                    display: "inline-block",
                    alignSelf: "center",
                  }}
                >
                  {toggle
                    ? Math.round(temperature) + "°C"
                    : Math.round(temperature + 32) + "°F"}{" "}
                </span>

                <button className="toggler" onClick={toggler}>
                  {toggle ? "°F" : "°C"}
                </button>
              </p>
            </div>

            <div className="flex-resp d-flex">
              <Card.Title
                style={{
                  textAlign: "left",
                  color: "white",
                  marginLeft: "46px",
                  fontSize: "26px",
                }}
              >
                {weather}
              </Card.Title>
              <p style={{ fontSize: "19px" }}>
                <span style={{ fontWeight: "bold", marginLeft: "120px" }}>
                  Current time:
                </span>{" "}
                {time}
              </p>
            </div>
          </Col>
          <Col xl={6} style={{ textAlign: "left", color: "white" }}>
            <p className="currentDetails" style={{ marginBottom: "0" }}>
              <span style={{ fontWeight: "bold" }}>Wind speed:</span>{" "}
              {windSpeed} km/h
            </p>
            <p
              className="currentDetails"
              style={{ marginBottom: "17px", marginTop: "18px" }}
            >
              <span style={{ fontWeight: "bold" }}>Humidity:</span> {humidity}%
            </p>
            <p className="currentDetails">
              <span style={{ fontWeight: "bold" }}>Sunrise:</span> {sunrise}{" "}
              <img
                src={sunriseImg}
                alt="sunrise"
                className="sunImg"
                style={{ width: "80px", marginBottom: "30px" }}
              />
            </p>
            <p className="currentDetails">
              <span>
                <span style={{ fontWeight: "bold" }}>Sunset:</span> {sunset}{" "}
              </span>

              <img
                src={sunsetImg}
                alt="sunset"
                className="sunImg"
                style={{ width: "57px", marginBottom: "8px" }}
              />
            </p>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CurrentPosition;
