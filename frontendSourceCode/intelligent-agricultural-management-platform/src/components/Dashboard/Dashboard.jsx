import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Chart from "react-apexcharts";
import uniqueVisitorChart from "../chart/analytics-unique-visitor-chart";
import customerChart from "../chart/analytics-cuatomer-chart";
import customerChart1 from "../chart/analytics-cuatomer-chart-1";
import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import WeatherCard from "./WeatherCard";

const Dashboard = () => {

  const API_KEY = '******'; // Replace with your API key

  const [weatherData, setWeatherData] = useState({
    main: { temp: "", feels_like: "", humidity: "", temp_max: "", temp_min: "" },
    weather: [{ main: "", description: "" }],
    wind: { speed: "" },
    sys: { country: "" }
  })

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${API_KEY}`);
      setWeatherData(response.data);
      console.log(response.data);
      return response.data;
    }
    catch
    (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {

    fetchWeather();

    return () => {

    }
  }, [])


  return (
    <Container>
      <Wrapper ht="250px">
        <CardDashboard
          color="linear-gradient(45deg, #4099ff, #73b4ff)"
          h6title="Total Registered Farms"
          value="2"
          height="160px"
          text1="Farm Management"
          text2="View Details"
          mxwidth="15rem"
        />
        <CardDashboard
          color="linear-gradient(45deg, #772be8, #ab73ff)"
          h6title="Total Registered Zones"
          value="20"
          height="160px"
          text1="Zone Management"
          text2="View Details"
          mxwidth="15rem"
        />
        <CardDashboard
          color="linear-gradient(45deg, #0fb882, #08d0d0)"
          h6title="Total Farm Workers"
          value="100"
          height="160px"
          text1="10 New Workers Joined"
          text2="View Details"
          mxwidth="15rem"
        />
        <CardDashboard
          color="linear-gradient(45deg, #ee3b3b, #f87660)"
          h6title="Total Number of Sesnsor"
          value="25"
          height="160px"
          text1="Soil Sensor Details"
          text2="View Details"
          mxwidth="15rem"
        />
      </Wrapper >

      <Wrapper ht="250px">
        <Typography variant="body1" textAlign="center" paddingX={4}>
          Temperature, humidity, wind speed, and other weather conditions are crucial for farm managers to optimize crop growth, prevent losses, and make informed decisions about irrigation, pest control, and harvesting.
        </Typography>
        <WeatherCard weatherData={weatherData}></WeatherCard>
      </Wrapper>
    </Container>
  );
};

const CardDashboard = ({
  h6title,
  value,
  color,
  icon,
  text1,
  text2,
  mxwidth,
  height,
}) => {
  return (
    <Card background={color} mxwidth={mxwidth} ht={height}>
      <Texth6 className="text-white">{h6title}</Texth6>
      <Texth2>
        <i className="feather icon-repeat" />
        <span>{value}</span>
      </Texth2>
      <Text className="mb-0">
        {text1}
        <Button variant="contained" color="info" onClick={(e) => alert(`Currently the cards contain dummy data, we will update it soon with real-time data, Thank You !!!`)}>Details</Button>
      </Text>
    </Card>
  );
};

export default Dashboard;

const Container = styled.div`
  /* background: red; */
  height:100%;
  width: 100%;
  padding:10px;
  position: relative;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  min-height: ${(props) => props.ht};
  /* background-color:white; */
  width:100%;
  position: relative;
`;
const Card = styled.div`
  background: ${(props) => props.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;

  max-width: ${(props) => props.mxwidth};
  height: ${(props) => props.ht};

  :hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.4);
  }
`;

const Texth6 = styled.h6`
  font-size: 16px;
  color: #fff;
  margin-bottom: 1rem;
`;
const Texth2 = styled.h2`
  font-size: 24px;
  color: #fff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  color: #fff;
  margin-bottom: 1rem;
`;

const Textspan = styled.span`
  font-size: 16px;
  color: #fff;
`;

const Col = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  max-width: 100%;
`;

const CardGraph = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardBody = styled.div`
  padding: 1rem;
`;
