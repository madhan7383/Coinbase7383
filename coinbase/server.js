const CoinbasePro = require('coinbase-pro');
require('dotenv').config()

const {Server} = require("socket.io"),server = new Server(8000);

let data = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    data.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
      data.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    coinbaseWs = new CoinbasePro.WebsocketClient(
      ['BTC-USD' , 'ETH-USD', 'LTC-USD'],
      'wss://ws-feed.pro.coinbase.com',
      {
          key: process.env.KEY,
          secret: process.env.SECRET,
          passphrase: process.env.PASSPHRASE,
      },
      { channels: ['level2','matches'] }
   );

    coinbaseWs.on('message',  data => {

      socket.emit('data', data);

    });

    coinbaseWs.on('error', err => {
      console.log(err)
    });

    coinbaseWs.on('close', () => {
      console.error("Connection with Coinbase websocket closed!");
  });
});


