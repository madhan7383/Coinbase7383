//inherit react from react package
import React from 'react'
import {
  CheckBox, Text, StyleSheet, View,
} from 'react-native'

import products from '../../config/products'

const styles = StyleSheet.create({
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

// Empty Array
const selectedProducts = []

// Products are pushed to array
products.forEach((element) => {
// Initially true for all products. Checkbox is checked for all the products.
  selectedProducts.push({ key: element, value: true })
})

// check and uncheckbox
const handleChange = (item) => {
  const index = selectedProducts.findIndex((el) => el.key === item)
  const match = selectedProducts.find((el) => el.key === item)

  if (match.value === true) { selectedProducts[index].value = false } else { selectedProducts[index].value = true }
}

const SubscriptionView = () => (
  <View>
    <Text style={styles.title}>Subscriptions</Text>
    <View style={styles.checkboxContainer}>

      {products.map((item) => (
        <><CheckBox
          value={selectedProducts.find((el) => el.key === item).value}
          // eslint-disable-next-line no-unused-vars
          // handling the checkbox action
          onClick={(evt) => handleChange(item)}
          style={styles.checkbox}
        /><Text style={styles.label}>{item}</Text>
        </>
      ))}

    </View>
  </View>
)

export default SubscriptionView
