import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddToCartScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: () => {
      return <Icon name="opencart" color={utils.COLOR_PURPLE} size={25} />;
    },
    tabBarOptions: {
      activeTintColor: utils.COLOR_PURPLE,
      inactiveTintColor: utils.COLOR_LIGHT_PURPLE,
    },
  });

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.textHeading, {color: utils.BLACK}]}>
          Add To Cart
        </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartScreen);
