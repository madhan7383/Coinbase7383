import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, StatusBar,
} from 'react-native'

import { colors } from 'theme'

import BidsView from '../../components/bids'
import SubscriptionView from '../../components/subscriptions'
import L2View from '../../components/l2update'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 60,
  },
})

const Home = () => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />

    <SubscriptionView />
    <BidsView />
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
