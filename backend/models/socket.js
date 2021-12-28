const BandList = require("./bandList");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }
  socketEvents() {
    this.io.on("connection", (socket) => {
      // emit
      socket.emit("bandList", this.bandList.getBands());

      // on
      socket.on("vote", (id) => {
        this.bandList.vote(id);
        this.io.emit("bandList", this.bandList.getBands());
      });
      socket.on("removeBand", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("bandList", this.bandList.getBands());
      });

      socket.on("changeName", (data) => {
        this.bandList.changeBandName(data.id, data.name);
        this.io.emit("bandList", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
