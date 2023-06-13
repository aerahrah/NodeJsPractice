const FavoriteQuote = require("../model/favoriteQuote");

// const deleteById = async (req, res) => {
//   try {
//   } catch (error) {}
// };
const getAllQuotes = async (req, res) => {
  try {
    const allQuotes = await FavoriteQuote.find({});
    if (allQuotes) {
      const allQuotesMap = allQuotes.map((quotes) => ({
        Quote: quotes.author,
        Author: quotes.quote,
      }));
      return res.status(200).json(allQuotesMap);
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving list of quotes" });
  }
};

const addQuotes = async (req, res) => {
  try {
    const { quoteData, authorData } = req.query;
    const getId = req.user;
    if (getId) {
      const createQuote = new FavoriteQuote({
        user: getId,
        quote: quoteData,
        author: authorData,
      });
      const response = await createQuote.save();
      res.json(response);
    } else {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding quote" });
  }
};

module.exports = {
  getAllQuotes,
  addQuotes,
};
