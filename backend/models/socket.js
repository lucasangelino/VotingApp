const BandList = require("./bandList");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }
  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected");
      socket.emit("bandList", this.bandList.getBands());
    });
  }
}

module.exports = Sockets;
