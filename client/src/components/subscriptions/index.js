import React from 'react'
import {
  CheckBox, Text, StyleSheet, View,
} from 'react-native'

import products from '../../config/products'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
  },
})

const selectedProducts = []

products.forEach((element) => {
  selectedProducts.push({ key: element, value: true })
})

const handleChange = (item) => {
  const index = selectedProducts.findIndex((el) => el.key === item)
  const match = selectedProducts.find((el) => el.key === item)

  if (match.value === true) { selectedProducts[index].value = false } else { selectedProducts[index].value = true }
}

const SubscriptionView = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Subscriptions</Text>
    <View style={styles.checkboxContainer}>

      {products.map((item) => (
        <><CheckBox
          value={selectedProducts.find((el) => el.key === item).value}
          // eslint-disable-next-line no-unused-vars
          onClick={(evt) => handleChange(item)}
          style={styles.checkbox}
        /><Text style={styles.label}>{item}</Text>
        </>
      ))}

    </View>
  </View>
)

export default SubscriptionView
