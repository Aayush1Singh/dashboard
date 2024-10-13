const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { io: ClientIo } = require("socket.io-client");

const app = express();
const PORT = 3000;

app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server);

let latestRandomNumber = { number: null };

const externalSocket = ClientIo("https://data.gdscnsut.com");

externalSocket.on("connect", () => {
  externalSocket.on("random_number", (data) => {
    console.log("random number:", data.number);

    latestRandomNumber = {
      number: data.number,
    };

    io.emit("random_number", latestRandomNumber);
  });
});

app.get("/api/v1/random-number", (req, res) => {
  res.json(latestRandomNumber);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
