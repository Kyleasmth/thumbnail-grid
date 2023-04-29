import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import UnsplashApi from "./UnspashApi";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export interface Image {
  id: string;
  urls: {
    small: string;
  };
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string>("");
  const [orientationFilter, setOrientationFilter] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleLoadMore = () => {
    if (loading || !searchTerm || error) return;
    setPage((prevPage) => prevPage + 1);
  };

  const fetchImages = useCallback(async () => {
    if (error) return;

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

      const response = await UnsplashApi.get("/search/photos", {
        params,
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setError(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, colorFilter, orientationFilter, error]);

  useEffect(() => {
    if (!searchTerm || error) return;
    fetchImages();
  }, [searchTerm, page, fetchImages, error]);

  const handleSearch = (inputValue: string) => {
    setSearchTerm(inputValue);
    setImages([]);
    setPage(1);
    setError(false);
  };

  return (
    <>
      <TextField
        fullWidth
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label="Search for images..."
        variant="outlined"
        style={{ marginTop: "16px" }}
      />
      <FormControl variant="outlined" style={{ marginTop: "16px" }}>
        <InputLabel id="color-filter-label">Color</InputLabel>
        <Select
          labelId="color-filter-label"
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value as string)}
          label="Color"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="black_and_white">Black and White</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="magenta">Magenta</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="teal">Teal</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ marginTop: "16px" }}>
        <InputLabel id="orientation-filter-label">Orientation</InputLabel>
        <Select
          labelId="orientation-filter-label"
          value={orientationFilter}
          onChange={(e) => setOrientationFilter(e.target.value as string)}
          label="Orientation"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="landscape">Landscape</MenuItem>
          <MenuItem value="portrait">Portrait</MenuItem>
          <MenuItem value="squarish">Squarish</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => handleSearch(inputValue)}
        style={{ marginTop: "16px" }}
      >
        Search
      </Button>
      <InfiniteScroll hasMore={!loading} loadMore={handleLoadMore}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gridGap: "1rem",
            marginTop: "1rem",
          }}
        >
          {images.map((image) => (
            <Link key={image.id} to={`/photo/${image.id}`}>
              <img src={image.urls.small} alt="" />
            </Link>
          ))}
        </Box>
      </InfiniteScroll>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Home;
