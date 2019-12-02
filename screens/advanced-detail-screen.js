import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

export class advancedDetailScreen extends Component {
  render() {
    return <View></View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(advancedDetailScreen);
