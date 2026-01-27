// Import the 'express' module
import express, { type Request, type Response }  from "express";
import decks from "./routes/decks.js"
import cards from "./routes/cards.js"

// Create an Express application
const app = express();

// Set the port number for the server
const port = 5000;

app.use("/decks", decks);
app.use("/cards", cards);

// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.status(200).json({message: 'Hello, TypeScript + Node.js + Express!'});
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});