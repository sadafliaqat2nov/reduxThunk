import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppContext from './context';
import AppContainer from './navigation';
import * as util from './utilities';

class Decider extends React.Component {
  render() {
    return (
      <AppContext.Provider>
        <AppContainer
          ref={(navigatorRef) => {
            util.setTopLevelNavigator(navigatorRef);
          }}
        />
      </AppContext.Provider>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Decider);
