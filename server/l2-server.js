//Coinbase NPM package
const CoinbasePro = require('coinbase-pro');
// Env Variables
require('dotenv').config()

// Local websocket server creation
const {Server} = require("socket.io"),server = new Server(8002);

//map() function lets you manipulate the items in an array by iterating and accessing
// creating hash obj in userdata
let userdata = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    userdata.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
      userdata.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    // Subscribe Coinbase pro websocket  thru authentication
    coinbaseWs = new CoinbasePro.WebsocketClient(
      ['BTC-USD' , 'ETH-USD', 'LTC-USD'],
      'wss://ws-feed.pro.coinbase.com',
      {
          key: process.env.KEY,
          secret: process.env.SECRET,
          passphrase: process.env.PASSPHRASE,
      },
      { channels: ['level2'] }
   );
    
    coinbaseWs.on('message',  data => {

      //filter only l2 data
      if(data.type === "l2update" ){
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


