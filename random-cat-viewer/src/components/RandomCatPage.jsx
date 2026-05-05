import React, { useEffect, useState } from "react";
import axios from "axios";

function RandomCatPage() {
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/cats/cat/random",
      );
      setCat(res.data.data);
      console.log(res.data.data);
    };
    fetchCat();
  }, []);

  if (!cat) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <img
          src={cat.image}
          alt={cat.name}
          style={{ width: "100%", borderRadius: "12px" }}
        />

        <h2>{cat.name}</h2>
        <p>
          <b>Origin:</b> {cat.origin}
        </p>
        <p>
          <b>Temperament:</b> {cat.temperament}
        </p>
        <p>
          <b>Life Span:</b> {cat.life_span} years
        </p>
        <p>{cat.description}</p>

        <a href={cat.wikipedia_url} target="_blank" rel="noreferrer">
          More Info
        </a>
      </div>
    </div>
  );
}

export default RandomCatPage;
