import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';

class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
  });
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    if (this.props.loginStatus !== null) {
      this.props.navigation.navigate('Home');
    }
  }

  requestForLogin = () => {
    const {email, password} = this.state;
    const {login, userList, userID, currentUser} = this.props;
    if (email == '' || password == '') {
      alert('Please enter credentials');
    } else if (!utils.validateEmail(email)) {
      alert('Please enter valid email.');
    } else {
      let checkUser = {
        email,
        password,
        userID,
      };
      let usersArray = [...userList];
      let userCredentials = usersArray.find((obj) => {
        if (
          obj.email === checkUser.email &&
          obj.password === checkUser.password
        ) {
          login({email, password});
          currentUser({obj});
          utils.navigate('Home');
          return true;
        }
      });
      if (userCredentials !== undefined) {
        alert('Success');
      } else {
        alert('Wrong Credentials');
      }
    }
  };
  render() {
    const {email, password} = this.state;
    return (
      <View style={styles.sectionContainer}>
        <Image
          style={styles.tinyLogo}
          source={{uri: 'https://cdn.auth0.com/blog/react-redux/logo.png'}}
        />
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor={utils.BLACK}
          style={styles.textInput}
          autoCapitalize="none"
          value={email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={utils.BLACK}
          style={styles.textInput}
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={this.requestForLogin}>
          <View style={styles.button}>
            <Text
              style={[styles.text, {fontSize: 13, textTransform: 'uppercase'}]}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => utils.navigate('Signup')}>
          <Text style={[styles.text, {fontSize: 10, color: utils.BLACK}]}>
            Create Account{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer.users,
    userID: state.usersReducer.userID,
    loginStatus: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(TASKS.login(params)),
    addNewUser: (params) => dispatch(TASKS.addNewUser(params)),
    currentUser: (params) => dispatch(TASKS.currentUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
