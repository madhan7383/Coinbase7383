import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Table from 'react-native-simple-table'

import socketIOClient from 'socket.io-client'

const ENDPOINT = 'ws://localhost:8000'

const socket = socketIOClient(ENDPOINT, { transports: ['websocket'] })

const [data, setData] = useState([])

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    width: 200,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 200,
  },
  {
    title: 'Min',
    dataIndex: 'min',
    width: 200,
  },
  {
    title: 'Max',
    dataIndex: 'max',
    width: 200,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 300,
  },

]

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {},
    }),
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    padding: 10,
    textAlign: 'center',
  },
})

const tempData = []

useEffect(() => {

  socket.on('data', (msg) => {
    if (msg.type === 'l2update') {
      tempData.push({
        product: msg.product_id,
        type: msg.changes[0][0],
        min: msg.changes[0][1],
        max: msg.changes[0][2],
        time: msg.time,
      })

      tempData.slice(Math.max(tempData.length - 5, 0))

      setData(tempData)
    }
  })
}, [])


const L2View = () => (

  <View style={styles.container}>
    <Text style={styles.title}>L2 Update View</Text>
    <Table height={320} columnWidth={60} columns={columns} dataSource={data} />
  </View>
)

export default L2View
