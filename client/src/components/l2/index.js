import React , {useState,useEffect} from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import socketIOClient from 'socket.io-client'

const L2_ENDPOINT = 'ws://localhost:8002'

const l2_socket = socketIOClient(L2_ENDPOINT, { transports: ['websocket'] })

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



function L2View() {

  const [l2_data, setL2Data] = useState({});




  l2_socket.on('data', (msg) => {
    if (msg.type === 'l2update') {
      setL2Data({product: msg.product_id,type: msg.changes[0][0],min: msg.changes[0][1],max: msg.changes[0][2],time: msg.time});
    }
  })
  

  return (
    <View>

      <Text style={styles.title}>L2 Update View</Text>



      <Text style={styles.details}>Product : {l2_data.product}</Text>
      <Text style={styles.details}>Type : {l2_data.type}</Text>
      <Text style={styles.details}>Min : {l2_data.min}</Text>
      <Text style={styles.details}>Max : {l2_data.max}</Text>
      <Text style={styles.details}>Time : {l2_data.time}</Text>


    </View>
    




  );
}

export default L2View

