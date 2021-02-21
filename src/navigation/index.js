import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';
import Home from '../screens/HomeScreen';
import Show from '../screens/ShowScreen';
import API from '../screens/APIScreen';
import Profile from '../screens/ProfileScreen';
const loginStack = createStackNavigator({
  Login,
  Signup,
});
// Add all screens for Home Stack
// const homeStack = createStackNavigator({
//   Home,
//   Show,
//   API,
// });

const MainTab = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Show: {
    screen: Show,
  },
  Response: {
    screen: API,
  },
  Profile: {
    screen: Profile,
  },
});

const SwitchNav = createSwitchNavigator({
  login: loginStack,
  app: MainTab,
});
const AppContainer = createAppContainer(SwitchNav);
export default AppContainer;
