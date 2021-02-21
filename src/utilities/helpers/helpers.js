import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';
import {SkypeIndicator, DotIndicator} from 'react-native-indicators';
import Toast from 'react-native-root-toast';

export const INTERNET_CONNECTION_ERROR =
  'Please check your internet connection and try again !';

export const validateEmail = (val) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val,
  );
};

export const isOnline = (success, reject) => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected) {
      success(true);
    } else reject(false);
  });
};

export const showToast = (message) => {
  if (Platform.OS === 'ios') {
    Toast.show(message, Toast.durations.SHORT, Toast.positions.BOTTOM);
  } else {
    Toast.show(message, Toast.durations.LONG, Toast.positions.BOTTOM);
  }
};

export const isIOS = () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  return false;
};

export const Loader = (props) => {
  const {style, color, size, lumper} = props;
  return lumper === true ? (
    <SkypeIndicator style={style} color={color} size={size} />
  ) : (
    <DotIndicator color="black" size={10} />
  );
};
