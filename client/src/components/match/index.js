import React , {useState,useEffect} from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import socketIOClient from 'socket.io-client'

const MATCH_ENDPOINT = 'ws://localhost:8001'


const match_socket = socketIOClient(MATCH_ENDPOINT, { transports: ['websocket'] })


const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    margin: 20,
    textAlign: 'center',
  },
  details:{
    fontSize: 15,
    margin: 5,
    fontStyle: 'italic'
  }
})



function MatchView() {

  const [match_data, setMatchData] = useState({});
//event trigger
  match_socket.on('data', (msg) => {
    if (msg.type === 'match') {
      setMatchData({tradeid: msg.trade_id,makerorderid: msg.maker_order_id,takerorderid: msg.taker_order_id,side: msg.side,size: msg.size,price: msg.price,product: msg.product_id,sequence: msg.sequence,time: msg.time});
    }
  })




  return (
    <View>
      <Text style={styles.title}>Match View</Text>

      <Text style={styles.details}>Trade ID : {match_data.tradeid}</Text>
      <Text style={styles.details}>Maker Order ID : {match_data.makerorderid}</Text>
      <Text style={styles.details}>Taker Order ID : {match_data.takerorderid}</Text>
      <Text style={styles.details}>Side : {match_data.side}</Text>
      <Text style={styles.details}>Size : {match_data.size}</Text>
      <Text style={styles.details}>Price : {match_data.price}</Text>
      <Text style={styles.details}>Product : {match_data.product}</Text>
      <Text style={styles.details}>Sequence : {match_data.sequence}</Text>
      <Text style={styles.details}>Time : {match_data.time}</Text>


    </View>
    




  );
}

export default MatchView

