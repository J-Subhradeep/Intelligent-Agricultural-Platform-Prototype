import React, { useState, useEffect } from "react";
import LeftSidebar from "../leftsidebar/Leftsidebar";
import { greenishblue, greenishwhite } from "../../config";
import GetWorkerList from "../Worker/GetWorkerList";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import styled from "@emotion/styled";
import { MdAppRegistration, MdKeyboardArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Zonemangement = () => {
  const navigator = useNavigate();
  const [zone, setZone] = useState({
    farmId: "",
    zone: "",
  });

  let [farms, setFarms] = useState([]);
  const [zoneName, setZoneName] = useState("");

  const [token, setToken] = useState("");

  const [zones, setZones] = useState([]);

  const handleZoneCreation = async (e) => {
    e.preventDefault();
    console.log("Zone created");
    try {
      await axios
        .post(
          "https://api.web-project.in/agriculture/zones/create-zone",
          {
            farmId: zone.farmId,
            name: zone.zone,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch the farm id from the database and display it in the select option

  const fetchFarmByManagerId = async (id, authtoken) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/farms/get-farms?managerId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setFarms(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getZoneByFarmId = async (id, token, farmName) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/zones/get-zones?farmId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setZones(res.data.map((zone) => ({ ...zone, farmName: farmName })));
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const localToken = sessionStorage.getItem("i_token");
    if (!localToken) {
      window.location.href = "/login";
    }
    setToken(localToken);
    fetchFarmByManagerId(localStorage.getItem("username"), localToken);
  }, []);

  useEffect(() => {
    console.log(zones);
  }, [zones]);

  return (
    <Contianer>
      <LeftSidebar title="Zone" />
      <Zonecontainer>
        <NavigateList>
          <Link to="/">
            <li>Home</li>
          </Link>

          <MdKeyboardArrowRight />
          <li>Zone</li>
        </NavigateList>

        <Wrapper>
          <Additem>
            <MainForm onSubmit={handleZoneCreation}>
              <Part1>
                {/* add a select option */}
                <Formitem>
                  <label htmlFor="zone">Farm ID</label>
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
                </Formitem>
                <Formitem>
                  <label htmlFor="zone">Zone</label>
                  <input
                    type="text"
                    placeholder="Add Zone"
                    onChange={(e) =>
                      setZone({
                        ...zone,
                        zone: e.target.value,
                      })
                    }
                  />
                </Formitem>
              </Part1>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  // justifyContent: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  endIcon={<MdAppRegistration />}
                >
                  Register Zone
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<PersonAddAltIcon />}
                  onClick={() => {
                    navigator("/create-worker");
                  }}
                >
                  Register Worker
                </Button>
              </div>
            </MainForm>
          </Additem>
          <ListItems>
            <Formitem>
              <label htmlFor="zone">Get Zone Details</label>
              <FormControl style={{ width: "30rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Farm Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={zoneName}
                  label="Select Farm Name"
                  onChange={(e) => {
                    getZoneByFarmId(
                      e.target.value,
                      token,
                      "e.target.value.name"
                    );
                    setZoneName(e.target.value);
                  }}
                >
                  {farms.map((farm) => (
                    <MenuItem key={farm.id} value={farm.id}>
                      {farm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Formitem>
            {zones.length != 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Zone Name</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone) => (
                    <tr key={zone.id}>
                      <td>{zone.name}</td>
                      <td>
                        <Link to={`/zone-sensor-action?zone=${zone.id}`}>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Zone Dashboard &nbsp; <OpenInNewIcon />
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </ListItems>

          <GetWorkerList />
        </Wrapper>
      </Zonecontainer>
    </Contianer>
  );
};
const Contianer = styled.div`
  display: flex;
  flex-direction: row;
  //   justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 100vh;
  background-color: #f5f6fa;
`;

const Zonecontainer = styled.div`
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
    color: white;
    width: 20rem;
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

export default Zonemangement;
