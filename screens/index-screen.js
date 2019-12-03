import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { facebookLogin } from '../actions';

export class IndexScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem('fbToken').then(token => {
      if (token) {
        // si token aller vers search
        this.goToSearch();
      } else {
        // pas de token , connexion facebook
        this.props.facebookLogin(this.goToSearch);
      }
    });
  }

  goToSearch = () => {
    this.props.navigation.push('Search');
  };

  render() {
    return <View></View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  facebookLogin
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(IndexScreen)
);
