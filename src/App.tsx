import React, { useState, useEffect, useCallback } from "react";
import UnsplashApi from "./UnspashApi";
import InfiniteScroll from "./InfiniteScroll";
import "./App.css";

interface Image {
  id: string;
  urls: {
    small: string;
  };
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadMore = () => {
    if (loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UnsplashApi.get("/search/photos", {
        params: { query, page },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (!query) return;
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page, fetchImages]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
      />
      <InfiniteScroll hasMore={!loading} loadMore={handleLoadMore}>
        <div className="grid">
          {images.map((image) => (
            <img key={image.id} src={image.urls.small} alt="" />
          ))}
        </div>
      </InfiniteScroll>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
