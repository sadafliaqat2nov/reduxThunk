import React from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
// import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class APIScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: () => {
      return <Icon name="account-group" color={utils.COLOR_PURPLE} size={30} />;
    },
    tabBarOptions: {
      activeTintColor: utils.COLOR_PURPLE,
      inactiveTintColor: utils.COLOR_LIGHT_PURPLE,
    },
  });
  constructor(props) {
    super(props);
    this.state = {apiRes: {}, modalVisible: false};
  }
  componentDidMount = async () => {
    this.props.getAPIData();
  };
  render() {
    const {apiData, isLoading, getAPIData} = this.props;
    const renderItem = ({item, index}) => (
      <View style={styles.listView}>
        <Avatar.Image size={35} source={{uri: item.avatar}} />
        <View>
          <Text style={[styles.text, {color: utils.BLACK, textAlign: 'right'}]}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={[styles.text, {color: utils.BLACK}]}>{item.email}</Text>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>API Response</Text>
        {isLoading &&
          utils.Loader({color: utils.COLOR_PURPLE, size: 30, lumper: true})}
        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          refreshControl={
            <RefreshControl
              colors={[utils.COLOR_PURPLE, utils.COLOR_LIGHT_PURPLE]}
              refreshing={isLoading}
              onRefresh={() => getAPIData()}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer.users,
    userID: state.usersReducer.userID,
    apiData: state.apiReducer.apiData,
    isLoading: state.loaderReducer.isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(APIScreen);
