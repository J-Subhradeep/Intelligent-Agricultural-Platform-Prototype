import React, { useState, useEffect } from "react";
import LeftSidebar from "../leftsidebar/Leftsidebar";
import { greenishblue, greenishwhite } from "../../config";

import styled from "@emotion/styled";
import { MdAppRegistration, MdKeyboardArrowRight } from "react-icons/md";
// react icon user icon
import { FaUser } from "react-icons/fa";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CreateWorker = () => {
  const navigator = useNavigate();
  const [worker, setWorker] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    address: "",
    farmId: "",
    zoneId: "",
  });

  const [farms, setFarms] = useState([]);
  const [zones, setZones] = useState([]);
  const [token, setToken] = useState("");

  const handleWorkerCreation = async (e) => {
    e.preventDefault();
    console.log("Worker created");
    try {
      await axios
        .post(
          "https://api.web-project.in/agriculture/farms/add-worker",
          {
            name: worker.name,
            role: worker.role,
            username: worker.username,
            password: worker.password,
            email: worker.email,
            mobile: worker.mobile,
            address: worker.address,
            farmId: worker.farmId,
            zoneId: worker.zoneId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
  useEffect(() => {
    if (token) getTheFarms(localStorage.getItem("username"));
  }, [token]);

  useEffect(() => {
    const token = sessionStorage.getItem("i_token");
    if (token) setToken(token);
    else navigator("/login");
  }, []);

  useEffect(() => {
    console.log(worker);
  }, [worker]);

  return (
    <Contianer>
      <LeftSidebar title="Zone" />
      <Zonecontainer>
        <NavigateList>
          <Link to="/">
            <li>Home</li>
          </Link>

          <MdKeyboardArrowRight />
          <Link to="/zone-management">
            <li>Zone</li>
          </Link>

          <MdKeyboardArrowRight />
          <li>Create Worker</li>
        </NavigateList>
        <Wrapper>
          <Additem>
            <MainForm onSubmit={handleWorkerCreation}>
              <Part1>
                <Formitem>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={worker.name}
                    onChange={(e) =>
                      setWorker({ ...worker, name: e.target.value })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    id="role"
                    value={worker.role}
                    onChange={(e) =>
                      setWorker({ ...worker, role: e.target.value })
                    }
                  >
                    <option value="">Select Role</option>
                    <option value="WORKER">Worker</option>
                  </select>
                </Formitem>
              </Part1>
              <Part1>
                <Formitem>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={worker.username}
                    onChange={(e) =>
                      setWorker({ ...worker, username: e.target.value })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={worker.password}
                    onChange={(e) =>
                      setWorker({ ...worker, password: e.target.value })
                    }
                  />
                </Formitem>
              </Part1>
              <Part1>
                <Formitem>
                  <label htmlFor="email">Email</label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={worker.email}
                    onChange={(e) =>
                      setWorker({ ...worker, email: e.target.value })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={worker.mobile}
                    onChange={(e) =>
                      setWorker({ ...worker, mobile: e.target.value })
                    }
                  />
                </Formitem>
              </Part1>
              <Part1>
                <Formitem>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={worker.address}
                    onChange={(e) =>
                      setWorker({ ...worker, address: e.target.value })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="farmId">Farm ID</label>
                  <select
                    name="farmId"
                    id="farmId"
                    value={worker.farmId}
                    onChange={(e) => {
                      setWorker({ ...worker, farmId: e.target.value });
                      fetchZones(e.target.value);
                    }}
                  >
                    <option value="">Select Farm ID</option>
                    {farms.map((farm) => (
                      <option key={farm.id} value={farm.id}>
                        {farm.name}
                      </option>
                    ))}
                  </select>
                </Formitem>
              </Part1>
              <Part1>
                <Formitem>
                  <label htmlFor="zoneId">Zone ID</label>
                  <select
                    name="zoneId"
                    id="zoneId"
                    value={worker.zoneId}
                    onChange={(e) =>
                      setWorker({ ...worker, zoneId: e.target.value })
                    }
                  >
                    <option value="">Select Zone ID</option>
                    {zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </Formitem>
              </Part1>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  endIcon={<MdAppRegistration />}
                >
                  Register Worker
                </Button>
              </div>
            </MainForm>
          </Additem>
        </Wrapper>
      </Zonecontainer>
    </Contianer>
  );
};

export default CreateWorker;

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

const Zonecontainer = styled.div`
  width: 90%;
  padding: 10px;
  overflow-y: scroll;
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
