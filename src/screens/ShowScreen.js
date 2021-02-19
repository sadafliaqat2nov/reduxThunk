import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
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
    this.state = {
      modalVisible: false,
      username: '',
      password: '',
      stateEmail: '',
    };
  }
  setModalVisible = (visible, email, username, password) => {
    this.setState({
      modalVisible: visible,
      stateEmail: email,
      username,
      password,
    });
  };
  onUpdateUser = (stateEmail, userList, username, password) => {
    this.props.updateUser({stateEmail, userList, username, password});
    this.setState({modalVisible: false});
  };
  render() {
    const {userID, userList, removeUser} = this.props;
    const {modalVisible, username, password, stateEmail} = this.state;
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
          <TouchableOpacity
            onPress={() =>
              this.setModalVisible(
                true,
                item.email,
                item.username,
                item.password,
              )
            }>
            <View
              style={[styles.button, {paddingHorizontal: 5, marginRight: 5}]}>
              <Text style={styles.text}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={index}
            onPress={() => removeUser({userEmail: item.email, userList})}>
            <View style={[styles.button, {paddingHorizontal: 5}]}>
              <Text style={styles.text}>Remove</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit User</Text>
              <TextInput
                placeholder="Enter Username"
                placeholderTextColor={utils.BLACK}
                style={styles.textInput}
                autoCapitalize="none"
                value={username}
                onChangeText={(username) => this.setState({username})}
              />
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor={utils.BLACK}
                style={styles.textInput}
                autoCapitalize="none"
                value={password}
                onChangeText={(password) => this.setState({password})}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[styles.button, {marginRight: 5}]}
                  onPress={() =>
                    this.onUpdateUser(stateEmail, userList, username, password)
                  }>
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Text style={styles.text}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>List of All Users</Text>
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
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
    updateUser: (params) => dispatch(TASKS.updateUser(params)),
    getAPIData: () => dispatch(TASKS.getAPIData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowScreen);
