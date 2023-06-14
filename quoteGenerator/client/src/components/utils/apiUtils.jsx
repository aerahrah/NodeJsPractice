import Axios from './axiosUtils'

export const saveData = async (quoteData, url) => {
  try {
    const response = await Axios.post(`${url}/add`, {
      quoteData: quoteData[0].quote,
      authorData: quoteData[0].author,
    });
    return response.data.message;
  } catch (error) {
    throw new Error("Request failed:", error.message);
  }
};

export const fetchData = async (selectedOption, url) => {
  try {
    const response = await Axios.get(`${url}/generate`, {
      params: {
        selectedValue: selectedOption,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Request failed:", error);
  }
};