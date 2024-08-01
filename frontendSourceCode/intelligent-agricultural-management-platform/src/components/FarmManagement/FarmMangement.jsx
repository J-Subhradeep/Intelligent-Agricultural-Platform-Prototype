import React, { useState, useEffect } from "react";
import LeftSidebar from "../leftsidebar/Leftsidebar";
import { greenishblue, greenishwhite } from "../../config";

import styled from "@emotion/styled";
import { MdKeyboardArrowRight } from "react-icons/md";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const FarmMangement = () => {
  const [farm, setFarm] = useState({
    name: "",
    contactNumber: "",
    managerId: localStorage.getItem("username"),
    address: "",
  });
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("i_token");
    if (!token) {
      navigate("/login");
    }
    setToken(token);

    getTheFarm(localStorage.getItem("username"), token);
  }, []);

  const getTheFarm = async (id, token) => {
    try {
      await axios
        .get(
          `https://api.web-project.in/agriculture/farms/get-farms?managerId=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setFarms(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handlefarmCreation = async (e) => {
    e.preventDefault();
    console.log("farm created");
    try {
      await axios
        .post(
          "https://api.web-project.in/agriculture/farms/create-farm",
          {
            name: farm.name,
            contactNumber: farm.contactNumber,
            managerId: farm.managerId,
            address: farm.address,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Contianer>
      <LeftSidebar title="farm" />
      <Zonecontainer>
        <NavigateList>
          <Link to="/">
            <li>Home</li>
          </Link>

          <MdKeyboardArrowRight />
          <li>Farm</li>
        </NavigateList>

        <Wrapper>
          <Additem>
            <MainForm onSubmit={handlefarmCreation}>
              <Part1>
                {/* add a select option */}
                <Formitem>
                  <label htmlFor="farm">Farm Name</label>
                  <input
                    type="text"
                    placeholder="Add Farm Name"
                    onChange={(e) =>
                      setFarm({
                        ...farm,
                        name: e.target.value,
                      })
                    }
                  />
                </Formitem>
                <Formitem>
                  <label htmlFor="zone">Contact Number</label>
                  <input
                    type="number"
                    placeholder="Add Contact Number"
                    onChange={(e) =>
                      setFarm({
                        ...farm,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </Formitem>
              </Part1>
              <Formitem>
                <label htmlFor="zone">Address</label>
                <input
                  type="text"
                  placeholder="Add Address"
                  onChange={(e) =>
                    setFarm({
                      ...farm,
                      address: e.target.value,
                    })
                  }
                />
              </Formitem>
              <Button color="primary" variant="contained" type="submit" endIcon={<AppRegistrationIcon />}>
                Register
              </Button>
            </MainForm>
          </Additem>
          <ListItems>
            <Table>
              <thead>
                <tr>
                  <th>Farm Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {farms &&
                  farms.map((farm) => (
                    <tr key={farm._id}>
                      <td>{farm.name}</td>
                      <td>{farm.contactNumber}</td>
                      <td>{farm.address}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListItems>
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
  overflow: hidden;
`;

const Zonecontainer = styled.div`
  width: 90%;
  padding: 10px;
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
  }
`;
export default FarmMangement;
