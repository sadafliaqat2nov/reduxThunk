import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';

class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
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
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>Hello !!!</Text>
        <Text
          style={[
            styles.textHeading,
            {textTransform: 'none', color: utils.BLACK},
          ]}>
          Name: {currentUser.obj.username}
        </Text>
        <Text
          style={[
            styles.textHeading,
            {textTransform: 'none', color: utils.BLACK},
          ]}>
          Email: {currentUser.obj.email}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => utils.navigate('Show')}>
          <View style={styles.button}>
            <Text style={styles.text}>Show All Accounts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => utils.navigate('API')}>
          <View style={styles.button}>
            <Text style={styles.text}>Go To API response</Text>
          </View>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
