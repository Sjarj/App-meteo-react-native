import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getForecastWeatherByCity } from '../actions';

export class AdvancedDetailScreen extends Component {
  componentDidMount() {
    const city = this.props.navigation.getParam('city');
    this.props.getForecastWeatherByCity(city);
    console.log(this.props);
  }

  render() {
    return <View></View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getForecastWeatherByCity
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedDetailScreen)
);
