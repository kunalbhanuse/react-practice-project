import React, { useEffect, useState } from "react";
import axios from "axios";
import "./youtube.css";

function YouTubePage() {
  type Video = {
    items: {
      id: string;
      snippet: {
        title: string;
        channelTitle: string;
        thumbnails: {
          medium: {
            url: string;
          };
        };
      };
      statistics: {
        likeCount: string;
        viewCount: string;
        commentCount: string;
      };
    };
  };
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const featchVideo = async () => {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/youtube/videos",
      );
      setVideos(res.data.data.data);
    };
    featchVideo();
  }, []);

  return (
    <div className="wrapper ">
      <h1>YouTube Videos Listing</h1>
      <div className="container">
        {videos.map((video) => (
          <div className="card" key={video.items.id}>
            <div className="photo">
              <img src={video.items.snippet.thumbnails.medium.url} alt="" />
            </div>
            <div className="content">
              <h2>{video.items.snippet.title}</h2>
            </div>
            <div className="content">{video.items.snippet.channelTitle}</div>
            <div className="stats">
              <p>Like:{video.items.statistics.likeCount}</p>
              <p>View:{video.items.statistics.viewCount}</p>
              <p>Comment:{video.items.statistics.commentCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubePage;
