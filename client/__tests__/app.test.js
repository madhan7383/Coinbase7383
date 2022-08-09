import 'react-native'
import renderer from 'react-test-renderer'
import App from '../App'

//expect().tobe();
it('renders correctly', () => {
  renderer.create(App)
})
