const express = require("express");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");
const authRouter = require("./routes/AuthenticationRoute");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connectDb");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());
app.use("/auth", authRouter);

const generateSeoKeywords = require("./routes/GenerateSeoKeywordsRoutes");
const generateMediaPostUser = require("./routes/GenerateMediaPostRoutes");
const generateAcquisitionUser = require("./routes/UserAcquisitionRoute");
const customerReviewInsightUser = require("./routes/CustomerReviewInsightRoute");
const getConversationRoute = require("./routes/GetConversationRoute");
const generateRevenueActivityInsight = require("./routes/RevenueActivityInsight");
const categorize_review_message = require("./routes/categorize-review-message");
const generateProductRecommendation = require("./routes/productCopyRecommendationRoute");
const categorize_review_csv = require("./routes/categorize-review-csvfile");
const productFeatureSuggestion = require("./routes/productFeatureSuggestionRoute.js");

app.use("/prompt", require("./routes/PromptRoute"));
app.use("/product-copy-recommendation", generateProductRecommendation);
app.use("/getConversation", getConversationRoute);
app.use("/generate-seo-keywords", generateSeoKeywords);
app.use("/generate-media-post", generateMediaPostUser);
app.use("/generate-user-acquisition", generateAcquisitionUser);
app.use("/generate-revenue-activity-insight", generateRevenueActivityInsight);
app.use("/generate-customer-review-csv", customerReviewInsightUser);
app.use("/", categorize_review_message);
app.use("/", categorize_review_csv);
app.use("/product-feature-suggestion", productFeatureSuggestion);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
