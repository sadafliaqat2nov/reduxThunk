import {StyleSheet} from 'react-native';
import * as utils from '../utilities/index';

const stylesProfile = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    margin: 20,
    borderColor: utils.COLOR_PURPLE,
    borderWidth: 3,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Bio: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: utils.COLOR_PURPLE,
    backgroundColor: utils.COLOR_LIGHT_PURPLE,
    padding: 10,
    paddingVertical: 20,
  },
});

export default stylesProfile;
