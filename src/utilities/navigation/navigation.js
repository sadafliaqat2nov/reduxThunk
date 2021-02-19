import {NavigationActions} from 'react-navigation';
//  memory leak here
let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  navigator.dispatch(NavigationActions.back());
}

export {navigate, back, setTopLevelNavigator};
