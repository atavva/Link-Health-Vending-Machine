// Imports
const dotenv = require("dotenv");
const app = require('./app');

// Handling for server errors and exiting the server as a response
process.on("unhandledRejection", (err) => {
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  process.exit(1);
});

// Allows the config.env file to act as environment variables in development mode
dotenv.config({ path: './config.env' });

// Start the server running on port 3000 or the environment variable port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

