import * as TYPES from '../types';

export const addNewUser = (payload) => {
  return {
    type: TYPES.ADD_USER,
    payload: payload.usersArray,
    increment: payload.userID + 1,
  };
};

const filterUser = (userEmail, userList) => {
  const newUsers = userList.filter((user) => user.email !== userEmail);
  return newUsers;
};

export const removeUser = (payload) => {
  const users = filterUser(payload.userEmail, payload.userList);
  return {
    type: TYPES.REMOVE_USER,
    payload: users,
  };
};

const updateUserInfo = (stateEmail, userList, username, password) => {
  const userInfo = userList.map((user) => {
    if (user.email === stateEmail) {
      (user.username = username) && (user.password = password);
    }
    console.log(user);
    return user;
  });
  return userInfo;
};

export const updateUser = (payload) => {
  const userUpdatedInfo = updateUserInfo(
    payload.stateEmail,
    payload.userList,
    payload.username,
    payload.password,
  );
  return {
    type: TYPES.UPDATE_USER,
    payload: userUpdatedInfo,
  };
};
