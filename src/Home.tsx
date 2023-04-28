import React, { useState, Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import { Image } from "./App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
interface HomeProps {
  handleSearch: (inputValue: string) => void;
  loading: boolean;
  handleLoadMore: () => void;
  colorFilter: string;
  setColorFilter: Dispatch<SetStateAction<string>>;
  orientationFilter: string;
  setOrientationFilter: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  images: Image[];
}

const Home: React.FC<HomeProps> = ({
  handleSearch,
  loading,
  handleLoadMore,
  images,
  colorFilter,
  setColorFilter,
  setOrientationFilter,
  orientationFilter,
  searchTerm,
  inputValue,
  setInputValue,
}) => {
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
