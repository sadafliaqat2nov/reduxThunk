import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
// import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';

class ShowScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
  });
  constructor(props) {
    super(props);
    this.state = {apiRes: {}, modalVisible: false};
  }
  render() {
    const {userID, userList, removeUser} = this.props;
    const renderItem = ({item, index}) => (
      <View style={styles.listView}>
        <View>
          <Text style={[styles.text, {color: utils.BLACK}]} key={index}>
            {item.username}
          </Text>
          <Text style={[styles.text, {color: utils.BLACK}]} key={index}>
            {item.email}
          </Text>
        </View>
        <View key={index} style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity>
            <View
              style={[styles.button, {paddingHorizontal: 5, marginRight: 5}]}>
              <Text style={styles.text}>Edit</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            key={index}
            onPress={() => removeUser({userID: item.id, userList})}>
            <View style={[styles.button, {paddingHorizontal: 5}]}>
              <Text style={styles.text}>Remove</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>List of All Users</Text>
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
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
    login: (params) => dispatch(TASKS.login(params)),
    addNewUser: (params) => dispatch(TASKS.addNewUser(params)),
    removeUser: (params) => dispatch(TASKS.removeUser(params)),
    getAPIData: () => dispatch(TASKS.getAPIData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowScreen);
