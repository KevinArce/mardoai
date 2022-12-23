// Import the express module
import express from "express";
// Import the dotenv module
import * as dotenv from "dotenv";
// Import the cors module
import cors from "cors";
// Import the Configuration and OpenAIApi classes from the OpenAI SDK
import { Configuration, OpenAIApi } from "openai";
// Load the environment variables from the .env file
dotenv.config();
// Create an instance of the Configuration class with the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAIApi class with the configuration
const openai = new OpenAIApi(configuration);
// Create an instance of the express app
const app = express();
// Enable CORS
app.use(cors());
// Enable parsing of JSON bodies
app.use(express.json());
// Create a POST route for the /completions endpoint
app.post("/api/completions", async (req, res) => {
  try {
    // Get the prompt from the request body
    const prompt = req.body.prompt;
    // If no prompt exists, return an error
    if (!prompt) {
      res.status(400).send({ error: "Please provide a prompt" });
      return;
    }
    // Call the OpenAI API to generate a response
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    // Return the response to the client
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
