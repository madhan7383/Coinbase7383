import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  logo: {
    width: 2000,
    height: 32,
    marginBottom: 10,
    fontSize: 40,
    alignItems: 'center',
    color: 'white',
  },
})

const HeaderTitle = () => <Text style={styles.logo}>Edgewater  CoinbasePro Integration - Done by Madhan Kumar - Front end engineer interview</Text>

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
