import React, { useState, useEffect, useCallback } from "react";
import UnsplashApi from "./UnspashApi";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./PhotoDetails";
import Home from "./Home";
import "./App.css";

export interface Image {
  id: string;
  urls: {
    small: string;
  };
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string>("");
  const [orientationFilter, setOrientationFilter] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetImages, setResetImages] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleLoadMore = () => {
    if (loading || !searchTerm) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (resetImages) {
      setImages([]);
      setResetImages(false);
    }
  }, [resetImages]);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        query: searchTerm,
        page,
      };

      if (colorFilter) {
        params.color = colorFilter;
      }

      if (orientationFilter) {
        params.orientation = orientationFilter;
      }
      console.log("params", params);
      const response = await UnsplashApi.get("/search/photos", {
        params,
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, colorFilter, orientationFilter]);

  // Trigger resetImages when any of the parameters change
  useEffect(() => {
    setResetImages(true);
  }, [searchTerm, colorFilter, orientationFilter]);

  useEffect(() => {
    if (!searchTerm) return;
    setImages([]);
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) return;
    fetchImages();
  }, [searchTerm, page, fetchImages]);

  const handleSearch = (inputValue: string) => {
    setSearchTerm(inputValue);
  };

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
          <Route
            path="/"
            element={
              <Home
                colorFilter={colorFilter}
                setColorFilter={setColorFilter}
                orientationFilter={orientationFilter}
                setOrientationFilter={setOrientationFilter}
                handleSearch={handleSearch}
                loading={loading}
                handleLoadMore={handleLoadMore}
                images={images}
                searchTerm={searchTerm}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            }
          />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </CustomContainer>
    </Router>
  );
};

export default App;
