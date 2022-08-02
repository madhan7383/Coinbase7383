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
    title: 'Trade ID',
    dataIndex: 'tradeid',
    width: 200,
  },
  {
    title: 'Maker Order ID',
    dataIndex: 'makerorderid',
    width: 300,
  },
  {
    title: 'Taker Order ID',
    dataIndex: 'takerorderid',
    width: 300,
  },
  {
    title: 'Side',
    dataIndex: 'side',
    width: 50,
  },
  {
    title: 'Size',
    dataIndex: 'size',
    width: 100,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    width: 200,
  },
  {
    title: 'Sequence',
    dataIndex: 'sequence',
    width: 200,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 300,
  },

]

const tempData = []

useEffect(() => {

  socket.on('data', (msg) => {
    if (msg.type === 'match') {
      tempData.push({
        tradeid: msg.trade_id,
        makerorderid: msg.maker_order_id,
        takerorderid: msg.taker_order_id,
        side: msg.side,
        size: msg.size,
        price: msg.price,
        product: msg.product_id,
        sequence: msg.sequence,
        time: msg.time,
      })

      tempData.slice(Math.max(tempData.length - 5, 0))

      setData(tempData)
    }
  })
}, [])


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
    textAlign: 'center',
  },
})

const BidsView = () => (

  <View style={styles.container}>
    <Text style={styles.title}>Bids View</Text>
    <Table height={320} columnWidth={60} columns={columns} dataSource={data} />
  </View>
)

export default BidsView
