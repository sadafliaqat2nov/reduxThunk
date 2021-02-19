import * as TYPES from '../types';

export const addNewUser = (payload) => {
  return {
    type: TYPES.ADD_USER,
    payload: payload.usersArray,
    increment: payload.userID + 1,
  };
};

const filterUser = (userID, userList) => {
  const newUsers = userList.filter((user) => user.userID !== userID);
  return newUsers;
};

export const removeUser = (payload) => {
  console.log(payload);
  const users = filterUser(payload.userID, payload.userList);
  return {
    type: TYPES.REMOVE_USER,
    payload: users,
  };
};

const updateUserInfo = (userID, userList, username, password) => {
  const userInfo = userList.map((user) => {
    if (user.userID === userID) {
      (user.username = username) && (user.password = password);
    }
    console.log(user);
    return user;
  });
  return userInfo;
};

export const updateUser = (payload) => {
  const userUpdatedinfo = updateUserInfo(
    payload.userID,
    payload.userList,
    payload.username,
    payload.password,
  );
  return {
    type: TYPES.UPDATE_USER,
    payload: userUpdatedinfo,
  };
};
