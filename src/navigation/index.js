import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';
import Home from '../screens/HomeScreen';
import Show from '../screens/ShowScreen';
import API from '../screens/APIScreen';
const loginStack = createStackNavigator({
  Login,
  Signup,
});
// Add all screens for Home Stack
const homeStack = createStackNavigator({
  Home,
  Show,
  API,
});

const SwitNav = createSwitchNavigator({
  login: loginStack,
  app: homeStack,
});
const AppContainer = createAppContainer(SwitNav);
export default AppContainer;
