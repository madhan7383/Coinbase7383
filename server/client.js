const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8001");

ioClient.on("data", (msg) => console.info(new Date(), msg));