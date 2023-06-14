import { useState, useEffect } from "react";
import {saveData, fetchData } from "../components/utils/apiUtils";
import Timer from "../components/utils/messageTimeout";

const QuoteGenerator = () => {
  const url = "http://localhost:3500/quote";
  const [quoteData, setQuoteData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

 const fetchDataAndUpdate = () => {
  setIsLoading(true);
  fetchData(selectedOption, url)
    .then((data) => {
      setQuoteData(data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, [url]);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { author, quote } = quoteData && quoteData.length > 0 ? quoteData[0] : {};

  const handleSave = () => {
    saveData(quoteData, url)
      .then((responseMessage) => {
        setMessage(responseMessage);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <button onClick={handleSave}>save</button>
          </>
        )}
      </div>
      <button onClick={fetchDataAndUpdate}>Next</button>
      {message && (
          <>
          <p>{message}</p>
          <Timer message={message} setMessage={setMessage} />
          </>
      )}
    </>
  );
};

export default QuoteGenerator;