import { useEffect, useState } from "react";
import axios from "axios";
import "./quotes.css";

function QuotesPage() {
  type Quote = {
    id: number;
    author: string;
    content: string;
  };
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    async function quatesFeatch() {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/quotes",
      );
      setQuotes(res.data.data.data);
    }
    quatesFeatch();
  }, []);
  return (
    <div className="wrappper">
      <h1>Quotes :</h1>
      <div className="container">
        {quotes.map((quote) => (
          <div className="card" key={quote.id}>
            <p>{quote.author}</p>
            <p>{quote.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuotesPage;
