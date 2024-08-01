import React from "react";
import styled from "@emotion/styled";

import { IoHomeOutline } from "react-icons/io5";
import { RxComponent1 } from "react-icons/rx";
import { MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { greenishblue, greenishwhite } from "../../config";
import Items from "./Items";
import { Button } from "@mui/material";

// Sidebar container

const LeftSidebar = () => {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("username");
    sessionStorage.removeItem("i_token");
    navigate("/login");
  };


  return (
    <SidebarContainer>
      <SectionTitle>Menu Bar</SectionTitle>

      <Items />
      <Devider />
      <Section>
        {/* <SectionTitle>Authentication</SectionTitle> */}
        <br />
        <Button color="error" variant="outlined" fullWidth onClick={HandleLogout} endIcon={<LogoutIcon />}>Logout</Button>
      </Section>
    </SidebarContainer>
  );
};

export default LeftSidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #fff;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0px 20px -7px rgba(189, 189, 189, 1);
`;

// Individual sections
const Section = styled.div`
  margin-bottom: 20px;
`;

// Section title
const SectionTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

// Links within sections
const SectionLink = styled.a`
  a {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #555;
    text-decoration: none;
    margin: 5px 0;
    gap: 5px;
  }
`;

const Devider = styled.hr`
  border: 0;
  height: 1px;
  background: #dcdcdc;
  margin: 20px 0;
`;
