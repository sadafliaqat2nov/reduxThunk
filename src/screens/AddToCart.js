import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
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

  constructor(props) {
    super(props);
  }

  removeFromCartRequest = (key) => {
    const {removeFromCart, cartItems} = this.props;
    let cartRestArray = cartItems.filter((products) => {
      if (products.key !== key) {
        return products;
      }
    });
    if (cartRestArray) {
      removeFromCart(cartRestArray);
      alert('Product removed from cart');
    } else {
      alert('Product failed to remove from cart');
    }
  };

  render() {
    const {cartItems} = this.props;
    const renderItem = ({item, index}) => (
      <View
        style={[
          styles.listView,
          {flexDirection: 'column', backgroundColor: utils.COLOR_LIGHT_PURPLE},
        ]}>
        <View
          style={[
            styles.listView,
            {
              borderWidth: 0,
              backgroundColor: utils.COLOR_LIGHT_PURPLE,
            },
          ]}>
          <View>
            <Text
              style={[styles.text, {color: utils.BLACK, textAlign: 'right'}]}>
              Name: {item.name}
            </Text>
            <Text style={[styles.text, {color: utils.BLACK}]}>
              Price: {item.price}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, {color: utils.BLACK}]}>
              Quantity: {item.qty}
            </Text>
            <Text style={[styles.text, {color: utils.BLACK}]}>
              Product ID: {item.key}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.removeFromCartRequest(item.key)}>
            <Text style={[styles.textHeading, {color: utils.WHITE}]}>
              Remove From Cart{' '}
              <Icon name="trash" size={22} color={utils.COLOR_LIGHT_PURPLE} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.textHeading, {color: utils.BLACK}]}>
          Add To Cart
        </Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer.users,
    productList: state.productReducer.products,
    cartItems: state.productReducer.cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(TASKS.login(params)),
    addNewUser: (params) => dispatch(TASKS.addNewUser(params)),
    addToCartMethod: (params) => dispatch(TASKS.addToCartMethod(params)),
    removeFromCart: (params) => dispatch(TASKS.removeFromCart(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartScreen);
