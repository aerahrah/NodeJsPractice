import { useState, useEffect } from "react";
import Axios from "axios"
const QuoteGenerator = () =>{
    const url ="http://localhost:3500/quote/generate";
    const [quoteData, setQuoteData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(url);
        setQuoteData(response.data);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchData();
  }, []);


  return <>
    {console.log(quoteData)}
  </>; 
};

export default QuoteGenerator;