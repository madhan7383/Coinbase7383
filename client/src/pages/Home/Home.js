import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, StatusBar, Text
} from 'react-native'

import { colors } from 'theme'

import SubscriptionView from '../../components/subscriptions'
import MatchView from '../../components/match'
import L2View from '../../components/l2'


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Home = () => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />

    <SubscriptionView />
    <MatchView />  
    <L2View />  


  </View>
)

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
