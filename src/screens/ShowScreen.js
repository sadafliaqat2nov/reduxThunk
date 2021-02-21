import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ShowScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: () => {
      return <Icon name="account-cog" color={utils.COLOR_PURPLE} size={30} />;
    },
    tabBarOptions: {
      activeTintColor: utils.COLOR_PURPLE,
      inactiveTintColor: utils.COLOR_LIGHT_PURPLE,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: '',
      password: '',
      stateEmail: '',
      searchText: '',
      allUsers: this.props.userList,
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

  // onSearch = (searchText, allUsers) => {
  //   let searchedUser = allUsers.find((obj) => {
  //     if (
  //       obj.email.toLowerCase() === searchText.toLowerCase() ||
  //       obj.username.toLowerCase() === searchText.toLowerCase()
  //     ) {
  //       return obj;
  //     }
  //     this.setState({
  //       allUsers: searchedUser,
  //     });
  //   });
  //   return searchedUser;
  // };

  _searchTextInputChanged = async (text) => {
    const {allUsers} = this.state;
    this.setState({searchText: text});
    const newData = await allUsers.filter(
      (user) =>
        user.username.toLowerCase() === text.toLowerCase() ||
        user.email.toLowerCase() === text.toLowerCase(),
    );
    //change your logic as per your requirement
    if (newData.length > 0) {
      this.setState({allUsers: newData});
    } else {
      this.setState({allUsers: this.props.userList});
    }
  };

  render() {
    const {userList, removeUser} = this.props;
    const {
      modalVisible,
      username,
      password,
      stateEmail,
      searchText,
      allUsers,
    } = this.state;
    const renderItem = ({item, index}) => (
      <View style={styles.listView}>
        <View>
          <Text style={[styles.text, {color: utils.BLACK}]}>
            {item.username}
          </Text>
          <Text style={[styles.text, {color: utils.BLACK}]}>{item.email}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
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

    const searchFilterFunction = (searchText) => {
      const {allUsers} = this.state;
      this.setState({searchText});
      if (searchText) {
        const newData = allUsers.filter(function (item) {
          const itemData = item.username
            ? item.username.toUpperCase()
            : ''.toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({allUsers: newData});
        if (searchText === '') {
          this.setState({allUsers});
        }
      } else if (this.state.searchText == null) {
        this.setState({allUsers});
      }
    };

    const renderSearch = () => {
      return (
        <SearchBar
          placeholder="Search Here..."
          round
          returnKeyType="search"
          containerStyle={{
            backgroundColor: utils.WHITE,
          }}
          autoFocus={true}
          placeholderTextColor={utils.BLACK}
          color={utils.BLACK}
          inputContainerStyle={styles.searchContainer}
          value={searchText}
          clearButtonMode="none"
          onChangeText={(searchText) => searchFilterFunction(searchText)}
          onClear={() => this.setState({allUsers: userList})}
        />
      );
    };

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>List of All Users</Text>
        <FlatList
          data={allUsers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={renderSearch}
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
