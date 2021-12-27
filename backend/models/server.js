const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./socket");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http Server
    this.server = http.createServer(this.app);

    // Socket config
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  config() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.config();
    // init server
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
