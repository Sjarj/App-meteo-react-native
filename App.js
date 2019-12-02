import React, { Component } from 'react';
import SearchScreen from './screens/search-screen';
import store from './store';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AdvancedDetailScreen from './screens/advanced-detail-screen';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Detail: AdvancedDetailScreen
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
);

const Routes = createAppContainer(StackNavigator);
