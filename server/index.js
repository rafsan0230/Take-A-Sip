const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

// env variables
require('dotenv').config();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGOOSE_URI;

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  exposedHeaders: 'Authorization',
};

const io = new Server(server, { cors: corsOptions });
io.on('connection', (socket) => {
  socket.on('gotNewOrder', () => {
    socket.to('kitchen').emit('kitchen_refresh');
  });
  socket.on('join_room', () => {
    socket.join('kitchen');
  })
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

(async function bootstrap() {
  try {
    await mongoose.connect(DB_URI);
    server.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
  }
})();
