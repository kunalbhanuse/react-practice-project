import { useEffect, useState } from "react";
import axios from "axios";
import "./JokePage.css";

function JokePage() {
  type Joke = {
    id: number;
    content: string;
    categories: string[];
  };

  const [jokes, setJokes] = useState<Joke[]>([]);
  useEffect(() => {
    const featchJokes = async () => {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomjokes",
      );
      setJokes(res.data.data.data);
      console.log("resr", res);
    };
    featchJokes();
  }, []);
  return (
    <div className="Container ">
      Joke Page Loaded
      <div className="joke">
        {jokes.map((joke) => (
          <div className="card" key={joke.id}>
            {joke.categories ? <p>{joke.categories[0]}</p> : " "}
            <p>{joke.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JokePage;
