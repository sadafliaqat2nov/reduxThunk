import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import stylesProfile from '../styles/profile';
import * as TASKS from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-paper';

class ProfileScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: () => {
      return <Icon name="house-user" color={utils.COLOR_PURPLE} size={20} />;
    },
    tabBarOptions: {
      activeTintColor: utils.COLOR_PURPLE,
      inactiveTintColor: utils.COLOR_LIGHT_PURPLE,
    },
  });

  requestForLogout = () => {
    const {logoutUser} = this.props;
    logoutUser(null);
    alert('Session Logout');
    utils.navigate('Login');
  };

  render() {
    const {currentUser} = this.props;
    return (
      <View style={[styles.sectionContainer, {justifyContent: 'center'}]}>
        <View style={stylesProfile.avatar}>
          <Avatar.Image
            size={120}
            source={require('../../assets/profile.jpeg')}
          />
        </View>
        <Text style={[styles.text, {alignSelf: 'center', color: utils.BLACK}]}>
          {currentUser.obj.username}
        </Text>
        <Text style={[styles.text, {alignSelf: 'center', color: utils.BLACK}]}>
          {currentUser.obj.email}
        </Text>

        <View style={stylesProfile.Bio}>
          <Text>🔹Combo of Humor & Aggression 🎃</Text>
          <Text>🔹November 02 is my Day🎈 </Text>
          <Text>🔹Javascript Stack Developer 👩🏻‍💻 </Text>
          <Text>🔹Connoisseur ☕ </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.requestForLogout()}>
          <View style={styles.button}>
            <Text style={styles.text}>LOGOUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer.users,
    currentUser: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(TASKS.login(params)),
    addNewUser: (params) => dispatch(TASKS.addNewUser(params)),
    logoutUser: (params) => dispatch(TASKS.logoutUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
