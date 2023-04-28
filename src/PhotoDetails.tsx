import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnsplashApi from "./UnspashApi";

interface Photo {
  id: string;
  urls: {
    full: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
  tags: {
    title: string;
  }[];
}

const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await UnsplashApi.get(`/photos/${id}`);
        setPhoto(response.data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [id]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={photo.urls.regular} alt="" />
      <p>Username: {photo.user.name}</p>
      <p>Likes: {photo.likes}</p>
      <div>
        <h3>Tags:</h3>
        {photo.tags.map((tag, index) => (
          <span key={index}>{tag.title}, </span>
        ))}
      </div>
    </div>
  );
};

export default PhotoDetails;
