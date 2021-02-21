import * as TYPES from '../types';

export const addNewProduct = (payload) => {
  return {
    type: TYPES.ADD_PRODUCT,
    payload: payload.product,
  };
};

const filterProduct = (prod_id, productList) => {
  const newProduct = productList.filter((product) => product.id !== prod_id);
  return newProduct;
};

export const removeProduct = (payload) => {
  const prod = filterProduct(payload.id, payload.productList);
  return {
    type: TYPES.REMOVE_PRODUCT,
    payload: prod,
  };
};

const updateProductInfo = (id, productList, quantity) => {
  const prodInfo = productList.map((product) => {
    if (product.id === id) {
      product.quantity = quantity;
    }
    return product;
  });
  return prodInfo;
};

export const updateProduct = (payload) => {
  const updateUserInfo = updateProductInfo(
    payload.id,
    payload.productList,
    payload.quantity,
  );
  return {
    type: TYPES.UPDATE_PRODUCT,
    payload: updateUserInfo,
  };
};
