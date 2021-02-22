import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';

class SignupScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  requestForLogin = () => {
    const {username, password, email} = this.state;
    const {signup, userList, addNewUser, userID} = this.props;
    if (username == '' || email == '' || password == '') {
      alert('Please enter credentials.');
    } else if (!utils.validateEmail(email)) {
      alert('Please enter valid email.');
    } else {
      let user = {
        username,
        password,
        email,
        userID,
      };
      let usersArray = [...userList];
      const userExist = usersArray.find((userNew) => userNew.email === email);
      if (userExist) {
        alert('User already exist.');
      } else {
        signup({user, usersArray});
        addNewUser({usersArray, userID});
        usersArray.push(user);
        utils.navigate('Login');
        alert('User created');
      }
    }
  };
  render() {
    const {username, email, password} = this.state;
    return (
      <View style={[styles.sectionContainer, {justifyContent: 'center'}]}>
        <Image
          style={styles.tinyLogo}
          source={{uri: 'https://cdn.auth0.com/blog/react-redux/logo.png'}}
        />
        <TextInput
          placeholder="Enter Name"
          placeholderTextColor={utils.BLACK}
          style={styles.textInput}
          autoCapitalize="none"
          value={username}
          onChangeText={(username) => this.setState({username})}
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
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => utils.navigate('Login')}>
          <Text style={[styles.text, {fontSize: 10, color: utils.BLACK}]}>
            Already have an account? Login
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (params) => dispatch(TASKS.signup(params)),
    addNewUser: (params) => dispatch(TASKS.addNewUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
