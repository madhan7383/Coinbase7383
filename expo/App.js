import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from "react";
 
import { StyleSheet, Text, View, CheckBox} from 'react-native';
import { DataTable } from 'react-native-paper';
import { io } from "socket.io-client";


export default function App() {

  const socket = io('ws://localhost:8000', {transports: ['websocket']});


  const [data_l2, setData_l2] = useState([{}]);
  const [data_match, setData_match] = useState([{}]);


  const l2_array = [ ]
  const match_array = [ ]

  useEffect(() => {

    setInterval(() => {
    socket.on("data", (msg) => {
      
      // Based on msg.product_id and checkbox variables we can manage subscriptions or we can manage with database actions

      if(msg.type === "l2update"){
        
        l2_array.push({
          Product: msg.product_id,
          Type: msg.changes[0][0],
          Min: msg.changes[0][1],
          Max: msg.changes[0][2],
          Time: msg.time,
        })
        setData_l2(l2_array.slice(Math.max(l2_array.length - 5, 0)))

      }

      else if (msg.type === "match"){

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

        setData_match(match_array.slice(Math.max(match_array.length - 5, 0)))

      }
    });

    }, 10000);

    //Above time limit can also be managed from UI


    

  }, []);

  return (
    <View style={styles.container}>
      <Text style = {styles.header}>Edgewater - Coinbase Integration (React Native and Expo)</Text>
      <StatusBar style="auto" />

      <Text style = {styles.header1}>Subscriptions</Text>

      <View style={styles.checkboxContainer}>
      <CheckBox
          value={"BTC-USD"}
          onValueChange={true}
          style={styles.checkbox}
        />
        <Text style = {styles.label}>BTC-USD</Text>

        <CheckBox
          value={"ETH-USD"}
          onValueChange={true}
          style={styles.checkbox}
        />
        <Text style = {styles.label}>ETH-USD</Text>

        <CheckBox
          value={"LTC-USD"}
          onValueChange={true}
          style={styles.checkbox}
        />
        <Text style = {styles.label}>LTC-USD</Text>
        </View>

      <Text style = {styles.header1}>L2update</Text>
      <DataTable  style = {styles.table}>
        <DataTable.Header>
          <DataTable.Title>Product</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Min</DataTable.Title>
          <DataTable.Title>Max</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>

        </DataTable.Header>


        {data_l2.map((item,index)=>{
          return <DataTable.Row>
          <DataTable.Cell>{item.Product}</DataTable.Cell>
          <DataTable.Cell>{item.Type}</DataTable.Cell>
          <DataTable.Cell>{item.Min}</DataTable.Cell>
          <DataTable.Cell>{item.Max}</DataTable.Cell>
          <DataTable.Cell>{item.Time}</DataTable.Cell>
          </DataTable.Row>
         })}

      </DataTable>

      <Text style = {styles.header1}>Bids</Text>
      <DataTable style = {styles.table}>
        <DataTable.Header>
        <DataTable.Title>Trade ID</DataTable.Title>
          <DataTable.Title>Maker Order ID</DataTable.Title>
          <DataTable.Title>Taker Order ID</DataTable.Title>
          <DataTable.Title>Side</DataTable.Title>
          <DataTable.Title>Size</DataTable.Title>
          <DataTable.Title>Price</DataTable.Title>
          <DataTable.Title>Product</DataTable.Title>
          <DataTable.Title>Sequence</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>
          
        </DataTable.Header>

        {data_match.map((item,index)=>{
          return <DataTable.Row>
          <DataTable.Cell>{item.TradeID}</DataTable.Cell>
          <DataTable.Cell>{item.MakerOrderID}</DataTable.Cell>
          <DataTable.Cell>{item.TakerOrderID}</DataTable.Cell>
          <DataTable.Cell>{item.Side}</DataTable.Cell>
          <DataTable.Cell>{item.Size}</DataTable.Cell>
          <DataTable.Cell>{item.Price}</DataTable.Cell>
          <DataTable.Cell>{item.Product}</DataTable.Cell>
          <DataTable.Cell>{item.Sequence}</DataTable.Cell>
          <DataTable.Cell>{item.Time}</DataTable.Cell>
          </DataTable.Row>
         })}

      </DataTable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#376ad1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  header:{
    fontSize: 75,
    color: "white"
  },

  header1:{
    fontSize: 50,
    color: "white",
    margin: 10,
  },

  table:{
    backgroundColor: "#FFFFFF",
    margin: 50,
    padding: 5
  },
  checkbox: {
    alignSelf: "center",
    color: "#FFFFFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
    color: "#FFFFFF",
  },
});
