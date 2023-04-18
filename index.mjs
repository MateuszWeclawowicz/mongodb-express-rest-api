import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Set CORS options
const corsOptions = {
  origin: "http://carsales-nosql.s3-website-eu-west-1.amazonaws.com", // Set the allowed origin
  methods: "GET, POST, PUT, DELETE, OPTIONS", // Set the allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Set the allowed headers
  credentials: true // Set the credentials flag to true
};

app.use(cors(corsOptions));

app.use(express.json());

// Load the /posts routes
app.use("/cars", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
