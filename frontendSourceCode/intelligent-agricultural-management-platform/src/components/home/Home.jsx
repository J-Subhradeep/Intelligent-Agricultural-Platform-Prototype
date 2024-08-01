import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Leftsidebar from "../leftsidebar/Leftsidebar";

const Home = () => {
  const navigator = useNavigate();
  useEffect(() => {
    const user = sessionStorage.getItem("i_token");
    if (!user) {
      navigator("/login");
    }
  }, []);

  return (
    <Contianer>
      <Leftsidebar />
      <Dashboard />
    </Contianer>
  );
};

export default Home;

const Contianer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #f5f6fa;
  overflow: hidden;
`;
