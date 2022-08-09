//Coinbase pro library
const CoinbasePro = require('coinbase-pro');
// Env Variable
require('dotenv').config()

//Server creation
const {Server} = require("socket.io"),server = new Server(8001);

//map() function lets you manipulate the items in an array by iterating and accessing
// creating hash obj in userdata
let userdata = new Map();

// event fired every time a new client connects: Initilize
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    userdata.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
      userdata.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });


    // Consume coinbase pro sub
    coinbaseWs = new CoinbasePro.WebsocketClient(
      ['BTC-USD' , 'ETH-USD', 'LTC-USD'],
      'wss://ws-feed.pro.coinbase.com',
      {
          key: process.env.KEY,
          secret: process.env.SECRET,
          passphrase: process.env.PASSPHRASE,
      },
      { channels: ['matches'] }
   );
    
   // when msg received on coinbaseWS
    coinbaseWs.on('message',  data => {

      if(data.type === "match" ){
        socket.emit('data', data);
      }

    });

    coinbaseWs.on('error', err => {
      console.log(err)
    });

    coinbaseWs.on('close', () => {
      console.error("Connection with Coinbase websocket closed!");
  });
});


