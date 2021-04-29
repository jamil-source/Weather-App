import React, { useState } from "react";
import "./style.css";
import { Row, Col, FormControl, Button } from "react-bootstrap";

const LocationSelector = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(city);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1 style={{ marginTop: "70px", color: "#4247" }}>Search a city</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <FormControl
            placeholder="Enter city.."
            onChange={(event) => setCity(event.target.value)}
            value={city}
            onKeyDown={onKeyDown}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => onSearch(city)}
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            Check Weather
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default LocationSelector;
