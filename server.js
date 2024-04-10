const express = require("express");
const dotenv = require("dotenv");
// require("dotenv").config();
// const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const {
  AssistantsClient,
  AzureKeyCredential,
} = require("@azure/openai-assistants");
const { AZURE_ENDPOINT, API_KEY } = process.env;

// Setup Express
const app = express();

const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

// Setting up config.env file variables
dotenv.config({ path: ".env" });

app.use(express.json()); // Middleware to parse JSON bodies
// Middkeware to handle errors

// https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai-assistants

//=========================================================
//============== ROUTE SERVER =============================
//=========================================================
const assistant = require("./routes/assistant");
const thread = require("./routes/thread");
const message = require("./routes/message");

app.use("/api", assistant);
app.use("/api", thread);
app.use("/api", message);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
