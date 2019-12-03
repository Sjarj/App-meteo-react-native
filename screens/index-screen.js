import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

export class IndexScreen extends Component {
  componentDidMount() {
    // pas de token , connexion facebook
    // reussi emmener vers search
    // si token aller vers search
  }
  render() {
    return <View></View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);
