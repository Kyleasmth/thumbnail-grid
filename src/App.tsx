import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./PhotoDetails";
import Home from "./Home";
import "./App.css";

const App: React.FC = () => {
  const CustomContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  `;

  return (
    <Router>
      <CssBaseline />
      <CustomContainer maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </CustomContainer>
    </Router>
  );
};

export default App;
