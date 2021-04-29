import React, { useState } from "react";
import { Card } from "react-bootstrap";
import rain from "../../images/rain.png";
import drizzle from "../../images/drizzle.png";
import clouds from "../../images/clouds.png";
import snow from "../../images/snow.png";
import sunny from "../../images/sunny.png";
import thunderstorm from "../../images/thunderstorm.png";

const WeatherCardDaily = ({ dt, temp_max, main, sunset, sunrise, windspeed, humidity }) => {
  const [toggle, setToggle] = useState(true);

  let date = new Date(0);
  date.setUTCSeconds(dt);
  
  
  let sunsetDate = new Date(0);
  sunsetDate.setUTCSeconds(sunset);

  let sunriseDate = new Date(0);
 sunriseDate.setUTCSeconds(sunrise);


  const imgChange = () => {
    if (main === "Rain") return rain;
    else if (main === "Clouds") return clouds;
    else if (main === "Thunderstorm") return thunderstorm;
    else if (main === "Drizzle") return drizzle;
    else if (main === "Snow") return snow;
    else if (main === "Clear") return sunny;
    else return "http://simpleicon.com/wp-content/uploads/haze_1.png";
  };

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <Card
      style={{
        padding: "20px",
        textAlign: "left",
        boxShadow: "grey 3px 6px 11px -4px",
        border: "0px",
        borderRadius: "6px",
      }}
    >
      <Card.Title
        style={{
          fontWeight: "bold",
          color: "rgb(150 150 150)",
        }}
      >
        {main}
      </Card.Title>
      <p>
        {date.toDateString()}
      </p>
      <div className="CardHeader">
        <div
          className="temperatureHeader"
          style={{
            display: "flex",
          }}
        >
          <p style={{ fontSize: "50px", marginBottom: "0", color: "#969aa4" }}>
            {toggle
              ? Math.round(temp_max) + "°C"
              : Math.round(temp_max * 1.8 + 32) + "°F"}
          </p>
          <button
            style={{
              display: "block",
              alignSelf: "center",
              marginLeft: "auto",
              backgroundColor: "transparent",
              border: "1px solid lightgray",
              boxShadow: "4px 4px 6px 0px rgb(150 154 164) ",
            }}
            onClick={toggler}
          >
            {toggle ? "°F" : "°C"}
          </button>
        </div>

        <Card.Img
          style={{
            width: "150px",
            margin: "0px auto 20px auto",
            display: "block",
          }}
          variant="top"
          src={imgChange()}
        />
      </div>

      <Card.Body
        style={{
          padding: "0",
          borderTop: "1px solid #969aa4",
          marginTop: "17px",
          paddingTop: "37px",
        }}
      >
        <p style={{ marginBottom: "0" }}>
          <span style={{ fontWeight: "bold", color: "rgb(150 150 150)"}}>Windspeed:</span> {windspeed}{" "}
          km/h
        </p>
        <p>
          <span style={{ fontWeight: "bold", color: "rgb(150 150 150)" }}>Humidity:</span> {humidity}%
        </p>
        <p>
          <span style={{ fontWeight: "bold", color: "rgb(150 150 150)" }}>Sunrise:</span> {sunriseDate.toLocaleTimeString()}
        </p>
        <p>
          <span style={{ fontWeight: "bold", color: "rgb(150 150 150)" }}>Sunset:</span> {sunsetDate.toLocaleTimeString()}
        </p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCardDaily;
