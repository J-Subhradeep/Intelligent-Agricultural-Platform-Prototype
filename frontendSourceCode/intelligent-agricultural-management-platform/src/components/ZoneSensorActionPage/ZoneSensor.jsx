import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import LeftSidebar from "../leftsidebar/Leftsidebar";
import uniqueVisitorChart from "../chart/analytics-unique-visitor-chart";
import { greenishblue, greenishwhite } from "../../config";
import moment from "moment-timezone";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from "@emotion/styled";
import { MdKeyboardArrowRight } from "react-icons/md";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, colors, IconButton } from "@mui/material";

const ZoneSensor = () => {
  const navigate = useNavigate();
  const [zone, setZone] = useState({
    zoneId: new URLSearchParams(window.location.search).get("zone"),
    sensorName: "",
  });

  const [moisture, setMoisture] = useState(uniqueVisitorChart);
  const [farms, setFarms] = useState([]);
  const [sensors, setSensors] = useState([]);

  const [token, setToken] = useState("");

  const [selectedSensors, setSelectedSensors] = useState({
    sensorId: [],
    startDate: "",
    endDate: "",
    showGraph: false,
  });

  const handleZoneCreation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api.web-project.in/agriculture/zones/create-sensor",
        {
          sensorName: zone.sensorName,
          zoneId: zone.zoneId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSensorsByZoneID(
        localStorage.getItem("username"),
        token,
        new URLSearchParams(window.location.search).get("zone")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSensorsByZoneID = async (username, token, zoneId) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/zones/get-sensors?zoneId=${zoneId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setSensors(res.data);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getTheAnlysisWithTheIDandDate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.web-project.in/search-n-analytics/sensor-data/analytics",
        {
          ids: selectedSensors.sensorId,
          startDate: selectedSensors.startDate,
          endDate: selectedSensors.endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      const series = [];
      response.data.forEach((data) => {
        // check if the sensor name is already in the series array
        const index = series.findIndex((item) => item.name === data.sensorName);

        if (index !== -1) {
          series[index].data.push([
            convertTimestamp(data.timestamp),
            data.moistureLevel,
          ]);
        } else {
          series.push({
            name: data.sensorName,
            data: [[convertTimestamp(data.timestamp), data.moistureLevel]],
          });
        }
      });

      // change xaixs categories
      // const categories = response.data.map((data) =>
      //   convertTimestamp(data.timestamp)
      // );

      // sort the data

      setMoisture({
        ...moisture,
        series: series,
      });

      setSelectedSensors({
        ...selectedSensors,
        showGraph: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addSensorIdToArray = (sensorId) => {
    if (selectedSensors.sensorId.includes(sensorId)) {
      setSelectedSensors({
        ...selectedSensors,
        sensorId: selectedSensors.sensorId.filter((id) => id !== sensorId),
      });
    } else {
      setSelectedSensors({
        ...selectedSensors,
        sensorId: [...selectedSensors.sensorId, sensorId],
      });
    }
  };

  const convertTimestamp = (timestamp) => {
    // Parse the timestamp and convert it to the desired time zone
    const date = moment(timestamp).tz("Asia/Kolkata");
    return date.format("YYYY-MM-DDTHH:mm:ss");
  };

  // const convertTimestamp = (timestamp) => {
  //   // 2024-07-28T19:42:11+05:30 to 2024-07-28T00:42:11 means add 5:30 hours to the timestamp

  //   const date = new Date(timestamp);

  //   // add 5:30 hours to the timestamp
  //   date.setHours(date.getHours() + 5);
  //   date.setMinutes(date.getMinutes() + 30);

  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const seconds = date.getSeconds();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   const year = date.getFullYear();
  //   return `${year}-${month < 10 ? `0${month}` : month}-${
  //     day < 10 ? `0${day}` : day
  //   }T${hours < 10 ? `0${hours}` : hours}:${
  //     minutes < 10 ? `0${minutes}` : minutes
  //   }:${seconds < 10 ? `0${seconds}` : seconds}`;
  // };

  useEffect(() => {
    const localToken = sessionStorage.getItem("i_token");
    if (!localToken) {
      window.location.href = "/login";
    }
    setToken(localToken);
    const zoneId = new URLSearchParams(window.location.search).get("zone");
    if (zoneId) {
      fetchSensorsByZoneID(
        localStorage.getItem("username"),
        localToken,
        zoneId
      );
    } else {
      navigate("/zone-management");
    }
  }, []);

  useEffect(() => {
    console.log(moisture);
  }, [moisture, selectedSensors]);

  return (
    <Contianer>
      <LeftSidebar title="Zone" />
      <ZoneSensorContainer>
        <NavigateList>
          <Link to="/">
            <li>Home</li>
          </Link>
          <MdKeyboardArrowRight />
          <Link to="/zone-management">
            <li>Zone</li>
          </Link>

          <MdKeyboardArrowRight />
          <li>Zone wise sensor</li>
        </NavigateList>
        <Wrapper>
          <Additem>
            <MainForm onSubmit={handleZoneCreation}>
              <h3 style={{ marginLeft: "10px" }}>Add Sensor</h3>
              <Part1>
                {/* add a select option */}
                {/* <Formitem>
                  <label htmlFor="zone">Sensor Type</label>
                  <select
                    name="zone"
                    id="zone"
                    onChange={(e) =>
                      setZone({
                        ...zone,
                        farmId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Farm ID</option>
                    {farms.map((farm) => (
                      <option key={farm.id} value={farm.id}>
                        {farm.name}
                      </option>
                    ))}
                  </select>
                </Formitem> */}
                <Formitem>
                  <label htmlFor="zone">Sensor Name</label>
                  <input
                    type="text"
                    placeholder="Give a name to the sensor"
                    onChange={(e) =>
                      setZone({
                        ...zone,
                        sensorName: e.target.value,
                      })
                    }
                  />
                </Formitem>
              </Part1>
              <button type="submit">Add</button>
            </MainForm>
          </Additem>
          <ListItems>
            {sensors.length != 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Sensor Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors &&
                    sensors.map((sensor) => (
                      <tr key={sensor.sensorId}>
                        <td>{sensor.sensorName} &nbsp; <Button aria-label="delete" style={{ height: 25, width: 70, fontSize: 9, fontWeight: 600 }} variant="outlined" id="copy-button" onClick={(e) => alert(
                          `This feature is coming soon... 
By using the sensor IDs the actual sensors(hardware) will be mapped to the cloud database in future.
                          `)}>
                          Copy ID
                        </Button></td>

                        <td>
                          {/* add a check box */}
                          <input
                            type="checkbox"
                            // here on change store the sensor id in the selected sensor array
                            onChange={(e) =>
                              addSensorIdToArray(sensor.sensorId)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}

            <MainForm onSubmit={getTheAnlysisWithTheIDandDate}>
              <Part1>
                {/* date input field */}
                <Formitem>
                  <label htmlFor="zone">Start Date</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setSelectedSensors({
                        ...selectedSensors,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="zone">End Date</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setSelectedSensors({
                        ...selectedSensors,
                        endDate: e.target.value,
                      })
                    }
                  />
                </Formitem>
              </Part1>
              <button type="submit">Submit</button>
            </MainForm>
          </ListItems>

          {selectedSensors.showGraph && (
            <CardGraph>
              <CardHeader>
                <h5>Real Time Sensor Data</h5>
              </CardHeader>
              <CardBody className="ps-4 pt-4 pb-0">
                <Chart {...moisture} />
              </CardBody>
            </CardGraph>
          )}
        </Wrapper>
      </ZoneSensorContainer>
    </Contianer>
  );
};

export default ZoneSensor;

const Contianer = styled.div`
  display: flex;
  flex-direction: row;
  //   justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 100vh;
  background-color: #f5f6fa;
  overflow: hidden;


`;
const ZoneSensorContainer = styled.div`
  width: 90%;
  padding: 10px;
  overflow: scroll;
`;
const NavigateList = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  li {
    list-style: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
  }
  svg {
    font-size: 1.2rem;
    color: #333;
  }

  li:not(:last-child) {
    color: gray;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;
const Additem = styled.div`
  padding: 10px;
  background-color: white;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  label {
    font-size: 1rem;
    color: #333;
  }
  input {
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
  }
  select {
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 100%;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${greenishblue};
    color: white;
    width: 10%;
    // place-self: flex-end;
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Formitem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100%;
`;

const ListItems = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  /* button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${greenishblue};
    color: white;
    width: 10%;
    place-self: flex-end;

    margin-right: 10px;
    cursor: pointer;
  } */
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;

  border-collapse: collapse;
  th {
    background-color: ${greenishblue};
    color: white;
    padding: 10px;

    border-right: 1px solid ${greenishwhite};
  }

  td {
    padding: 10px;
    border-bottom: 1px solid ${greenishwhite};
    text-align: center;

    a {
      text-decoration: none;
      color: ${greenishblue};
    }
  }
`;

const CardGraph = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
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
