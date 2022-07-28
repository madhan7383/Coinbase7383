import React, { useState,useEffect } from "react";
import './App.css';
import { io } from "socket.io-client";

export default function App() {

  const [rows_l2, setRows_l2] = useState([{}]);
  const [rows_match, setRows_match] = useState([{}]);

  const [btc_usd, set_btc_usd] =  useState(true)
  const [eth_usd, set_eth_usd] =  useState(true)
  const [ltc_usd, set_ltc_usd] =  useState(true)

  const socket = io('ws://localhost:8000', {transports: ['websocket']});

  const manageProducts = (event) => {

    if(event.target.value === "BTC-USD") if(btc_usd === true) {  set_btc_usd(false) } else{ set_btc_usd(true) }
    if(event.target.value === "ETH-USD") if(eth_usd === true) {  set_eth_usd(false) } else{ set_eth_usd(true) }
    if(event.target.value === "LTC-USD") if(ltc_usd === true) {  set_ltc_usd(false) } else{ set_ltc_usd(true) }

  };

  useEffect(() => {
    const l2_array = [ ]
    const match_array = [ ]

    setInterval(() => {

      socket.on("data", (msg) => {

        if(msg.type === "l2update"){
        
          // Based on msg.product_id and checkbox variables we can manage subscriptions


            l2_array.push({
              Product: msg.product_id,
              Type: msg.changes[0][0],
              Min: msg.changes[0][1],
              Max: msg.changes[0][2],
              Time: msg.time,
            })

            setRows_l2(l2_array.slice(Math.max(l2_array.length - 5, 0)))

        }

        else if (msg.type === "match"){

          // Based on msg.product_id and checkbox variables we can manage subscriptions



          match_array.push({
            TradeID: msg.trade_id,
            MakerOrderID: msg.maker_order_id,
            TakerOrderID: msg.taker_order_id,
            Side: msg.side,
            Size: msg.size,
            Price: msg.price,
            Product: msg.product_id,
            Sequence: msg.sequence,
            Time: msg.time,

          })


          setRows_match(match_array.slice(Math.max(match_array.length - 5, 0)))

        }
      });

    }, 10000);

    //Above time limit can also be managed from UI

    }, [btc_usd, eth_usd, ltc_usd, rows_l2, rows_match, socket]);

  return (
    <div className="App">
      <header className="App-header">
        Edgewater - Coinbase Integration (ReactJS)
      </header>

      <div className='subscription'>
          <div><h2>Subscriptions</h2></div>
          <div><input type="checkbox"  value={"BTC-USD"} checked = {btc_usd} onChange={(e) => manageProducts(e)}  /> <label>{"BTC-USD"}</label></div>
          <div><input type="checkbox"  value={"ETH-USD"} checked = {eth_usd} onChange={(e) => manageProducts(e)} /> <label>{"ETH-USD"}</label></div>
          <div><input type="checkbox"  value={"LTC-USD"} checked = {ltc_usd} onChange={(e) => manageProducts(e)} /> <label>{"LTC-USD"}</label></div>
      </div>


      <div className='price-view'>

      <div><h2>L2update</h2></div>

      <table>
        
        <thead>
        <tr>
          <th>Product</th>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Time</th>

        </tr>
        </thead>

      <tbody>
        {rows_l2.map((item, index) => (
           <tr>
                 <td>{item.Product}</td>
                 <td>{item.Type === "buy" && <span className="red">Buy</span>} {item.Type === "sell" && <span className="green">Sell</span>}</td>
                 <td>{item.Min}</td>
                 <td>{item.Max}</td>
                 <td>{item.Time}</td>
              </tr>
            ))}

    </tbody>
        </table>

      </div>

      <div className='match-view'>

      <div><h2>Bids</h2></div>

      <table>
      <thead>
         <tr>
          <th>Trade ID</th>
          <th>Maker Order ID</th>
          <th>Taker Order ID</th>
          <th>Side</th>
          <th>Size</th>
          <th>Price</th>
          <th>Product</th>
          <th>Sequence</th>
          <th>Time</th>

        </tr>
        </thead>
        
        <tbody>

        {rows_match.map((item, index) => (
           <tr>
                 <td>{item.TradeID}</td>
                 <td>{item.MakerOrderID}</td>
                 <td>{item.TakerOrderID}</td>
                 <td>{item.Side}</td>
                 <td>{item.Size}</td>
                 <td>{item.Price}</td>
                 <td>{item.Product}</td>
                 <td>{item.Sequence}</td>
                 <td>{item.Time}</td>
              </tr>
            ))}

        </tbody>
      </table>

      </div>
    </div>
  );
}





