import { useState, useEffect } from "react";
import Axios from "axios";

const QuoteGenerator = () => {
  const url = "http://localhost:3500/quote/generate";
  const [quoteData, setQuoteData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
      try {
      setIsLoading(true);
        const response = await Axios.get(url, {
        params: {
          selectedValue: selectedOption
        }
      });
        setQuoteData(response.data);

      } catch (error) {
        console.error("Request failed:", error);
      }
      setIsLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  const { author, quote } = quoteData && quoteData.length > 0 ? quoteData[0] : {};

  return (
    <>
      <div>
      <label htmlFor="selectInput">Select an option:</label>
      <select id="selectInput" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select...</option>
        <option value="happiness">Happy</option>
        <option value="anger">Anger</option>
        <option value="courage">Courage</option>
        <option value="fitness">Fitness</option>
        <option value="love">Love</option>
        <option value="history">History</option>
      </select>
    </div>
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {author && <p>Author: {author}</p>}
          {quote && <p>Quote: {quote}</p>}
        </>
      )}
    </div>
      <button onClick={fetchData}>Next</button>
    </>
  );
};

export default QuoteGenerator;