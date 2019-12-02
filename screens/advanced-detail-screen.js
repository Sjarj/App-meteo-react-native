import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getForecastWeatherByCity } from '../actions';
import { LineChart } from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export class AdvancedDetailScreen extends Component {
  componentDidMount() {
    const city = this.props.navigation.getParam('city');
    this.props.getForecastWeatherByCity(city);
  }

  renderChart = data => {
    return (
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={wp('90%')} // from react-native
        height={hp('30%')}
        yAxisLabel={'$'}
        yAxisSuffix={'k'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {this.props.forecastWeather ? (
          this.renderChart()
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  forecastWeather: state.weather.forecastWeather
});

const mapDispatchToProps = {
  getForecastWeatherByCity
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedDetailScreen)
);
