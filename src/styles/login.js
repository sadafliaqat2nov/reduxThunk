import {StyleSheet} from 'react-native';
import * as utils from '../utilities/index';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: utils.WHITE,
    paddingHorizontal: 15,
    paddingTop: 35,
  },
  button: {
    backgroundColor: utils.COLOR_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
    marginBottom: 5,
  },
  tinyLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: utils.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: utils.WHITE,
    height: 45,
  },
  listView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: utils.COLOR_PURPLE,
    borderWidth: 2,
    backgroundColor: utils.WHITE,
  },
  text: {
    color: utils.WHITE,
    fontWeight: 'bold',
    letterSpacing: 2,
    paddingHorizontal: 5,
    fontSize: 12,
  },
  searchContainer: {
    backgroundColor: utils.WHITE,
    borderBottomWidth: 2,
    height: 50,
    borderColor: utils.COLOR_PURPLE,
    borderWidth: 2,
  },
  textHeading: {
    margin: 25,
    color: utils.BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
