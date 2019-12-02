import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

export class AdvancedDetailScreen extends Component {
  render() {
    return <View></View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedDetailScreen);
