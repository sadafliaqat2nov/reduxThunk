import React from 'react';
import {SkypeIndicator, DotIndicator} from 'react-native-indicators';
export const validateEmail = (val) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val,
  );
};

export const Loader = (props) => {
  const {style, color, size, lumper} = props;
  return lumper === true ? (
    <SkypeIndicator style={style} color={color} size={size} />
  ) : (
    <DotIndicator color="black" size={10} />
  );
};
