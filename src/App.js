import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {STORE, PERSISTOR} from './store/storeConfig';
import Decider from './decider';
import * as utils from './utilities/index';
import {StatusBar} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <Provider store={STORE}>
        <PersistGate persistor={PERSISTOR}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={utils.WHITE}
            translucent={true}
          />
          <Decider />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
