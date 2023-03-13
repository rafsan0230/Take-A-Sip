const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");
const app = express();

// env variables
require('dotenv').config();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGOOSE_URI;

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

(async function bootstrap() {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
  }
})();
