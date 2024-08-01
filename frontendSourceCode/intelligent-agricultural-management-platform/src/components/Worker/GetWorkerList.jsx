import react, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { greenishblue, greenishwhite } from "../../config";
import { MdAppRegistration } from "react-icons/md";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useNavigate } from "react-router-dom";

import axios from "axios";

const GetWorkerList = () => {
  const navigator = useNavigate();

  const [farms, setFarms] = useState([]);
  const [zones, setZones] = useState([]);
  const [token, setToken] = useState("");
  const [workers, setWorkers] = useState([]);

  const [details, setDetails] = useState({
    farmId: "",
    zoneId: "",
  });
  useEffect(() => {
    if (token) getTheFarms(localStorage.getItem("username"));
  }, [token]);

  useEffect(() => {
    const token = sessionStorage.getItem("i_token");
    if (token) setToken(token);
    else navigator("/login");
  }, []);

  const getTheFarms = async (username) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/farms/get-farms?managerId=${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFarms(res.data);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchZones = async (farmId) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/zones/get-zones?farmId=${farmId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setZones(res.data);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getWorkerList = async () => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/farms/get-workers?farmId=${details.farmId}&zoneId=${details.zoneId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setWorkers(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListItems>
      <label htmlFor="zone">Get The Details Of Workers</label>
      <Formitem>
        <FormControl style={{ width: "30rem" }}>
          <InputLabel id="demo-simple-select-label">
            Select Farm Name
          </InputLabel>
          <Select
            labelId="select-zone-id-label"
            id="select-zone-id"
            value={details.farmId}
            label="Select Zone Name"
            onChange={(e) => {
              fetchZones(e.target.value);
              setDetails({ ...details, farmId: e.target.value });
            }}
          >
            {farms.map((farm) => (
              <MenuItem value={farm.id} key={farm.id}>
                {farm.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: "30rem" }}>
          <InputLabel id="demo-simple-select-label">
            Select Zone Name
          </InputLabel>
          <Select
            labelId="select-zone-id-label"
            id="select-zone-id"
            value={details.zoneId}
            label="Select Zone Name"
            onChange={(e) => {
              setDetails({ ...details, zoneId: e.target.value });
            }}
          >
            {zones.map((zone) => (
              <MenuItem key={zone.id} value={zone.id}>
                {zone.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Formitem>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<FormatListNumberedIcon />}
        style={{ margin: "10px" }}
        onClick={getWorkerList}
      >
        Get Worker List
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Worker Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.username}</td>
              <td>{worker.name}</td>
              <td>{worker.mobile}</td>
              <td>{worker.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ListItems>
  );
};

export default GetWorkerList;

const ListItems = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;
const Formitem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  width: 100%;
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
