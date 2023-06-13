const mongoose = require("mongoose");

const favoriteQuoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  quote: { type: String, required: true },
  author: { type: String, required: true },
});

const FavoriteQuote = mongoose.model("FavoriteQuote", favoriteQuoteSchema);
module.exports = FavoriteQuote;
