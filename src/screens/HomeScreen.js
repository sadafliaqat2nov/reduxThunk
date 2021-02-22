import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as utils from '../utilities/index';
import styles from '../styles/login';
import * as TASKS from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-uuid';

class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: () => {
      return <Icon name="home" color={utils.COLOR_PURPLE} size={30} />;
    },
    tabBarOptions: {
      activeTintColor: utils.COLOR_PURPLE,
      inactiveTintColor: utils.COLOR_LIGHT_PURPLE,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      product_price: '',
      quantity: '',
      modalVisible: false,
      getAllProducts: this.props.productList,
    };
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };

  onProductSave = (name, price, qty) => {
    const {product_name, product_price, quantity} = this.state;
    const {addNewProduct, productList} = this.props;
    let productsArray = [...productList];
    if (product_name == '' || product_price == '' || quantity == '') {
      alert('Please enter product info');
    } else {
      let product = {name, price, qty, key: uuid()};
      productsArray.push(product);
      addNewProduct(productsArray);
      alert('Product has been created');
      this.setState({
        modalVisible: false,
        product_name: '',
        product_price: '',
        quantity: '',
      });
    }
  };

  requestForAddToCart = (product_ID) => {
    const {addToCartMethod, cartItems} = this.props;
    const {getAllProducts} = this.state;
    let cartArray = [...cartItems];
    let addedProduct = getAllProducts.find((product) => {
      if (product.key == product_ID) {
        return true;
      }
    });
    if (addedProduct) {
      cartArray.push(addedProduct);
      addToCartMethod(cartArray);
      alert('Product added in cart');
    } else {
      alert('Product failed to add in cart');
    }
  };

  render() {
    const {modalVisible, product_name, product_price, quantity} = this.state;
    const {productList, productID} = this.props;
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
            {/* <Text style={[styles.text, {color: utils.BLACK}]}>
              Product ID: {item.key}
            </Text> */}
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.requestForAddToCart(item.key)}>
            <Text style={[styles.textHeading, {color: utils.WHITE}]}>
              Add To Cart{' '}
              <Icon
                name="cart-plus"
                size={22}
                color={utils.COLOR_LIGHT_PURPLE}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.textHeading}>All Products</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => this.setModalVisible(true)}>
          <Text style={[styles.textHeading, {color: utils.WHITE}]}>
            Create Products{' '}
            <Icon
              name="plus-square"
              size={20}
              color={utils.COLOR_LIGHT_PURPLE}
            />
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textHeading}>Product Information</Text>
              <TextInput
                placeholder="Product Name"
                placeholderTextColor={utils.BLACK}
                style={[styles.textInput, {width: '90%'}]}
                value={product_name}
                onChangeText={(product_name) => this.setState({product_name})}
              />
              <TextInput
                placeholder="Product Price"
                placeholderTextColor={utils.BLACK}
                style={[styles.textInput, {width: '90%'}]}
                value={product_price}
                onChangeText={(product_price) => this.setState({product_price})}
              />
              <TextInput
                placeholder="Quantity"
                placeholderTextColor={utils.BLACK}
                style={[styles.textInput, {width: '90%'}]}
                value={quantity}
                onChangeText={(quantity) => this.setState({quantity})}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[styles.button, {marginRight: 5}]}
                  onPress={() =>
                    this.onProductSave(product_name, product_price, quantity)
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
        <FlatList
          data={productList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.productReducer.products,
    productID: state.productReducer.productID,
    cartItems: state.productReducer.cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewProduct: (params) => dispatch(TASKS.addNewProduct(params)),
    addToCartMethod: (params) => dispatch(TASKS.addToCartMethod(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
