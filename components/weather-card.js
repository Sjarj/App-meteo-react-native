import React, { Component } from 'react';
import { View, Animated, PanResponder, Text, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { kelvinToCelsius } from '../services/temperature';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const CARD_INITIAL_POSITION_Y = hp('80%');
const CARD_INITIAL_POSITION_X = wp('5%');
const TRESHOLD_TO_TOP = hp('75%');
const TRESHOLD_TO_BOTTOM = hp('70%');
const CARD_OPEN_POSITION = hp('45%');
const MAX_DRAG_ZONE_WHEN_OPEN = hp('65%');
const ICON_URI = 'http://openweathermap.org/img/w/';

class WeatherCard extends Component {
  state = {
    panResponder: undefined,
    isOpen: false
  };

  componentDidMount = () => {
    this.onFocusListener = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.resetOpenPosition(() => this.setState({ isOpen: false }));
      }
    );
    this.position = new Animated.ValueXY();
    this.position.setValue({
      x: CARD_INITIAL_POSITION_X,
      y: CARD_INITIAL_POSITION_Y
    });
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        if (!(this.state.isOpen && gesture.y0 > MAX_DRAG_ZONE_WHEN_OPEN)) {
          this.position.setValue({
            x: CARD_INITIAL_POSITION_X,
            y: gesture.moveY
          });
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (!this.state.isOpen) {
          if (gesture.moveY <= TRESHOLD_TO_TOP) {
            this.setOpenPosition(() => this.setState({ isOpen: true }));
          } else {
            this.resetOpenPosition();
          }
        } else {
          if (gesture.moveY <= TRESHOLD_TO_BOTTOM) {
            this.setOpenPosition();
          } else {
            if (gesture.y0 < MAX_DRAG_ZONE_WHEN_OPEN) {
              this.resetOpenPosition(() => this.setState({ isOpen: false }));
            }
          }
        }
      }
    });
    this.setState({ panResponder });
  };

  setOpenPosition = done => {
    Animated.spring(this.position, {
      toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_OPEN_POSITION }
    }).start(() => done && done());
  };

  resetOpenPosition = done => {
    Animated.spring(this.position, {
      toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y }
    }).start(() => done && done());
  };

  getCardStyle = () => {
    return {
      width: wp('90%'),
      height: hp('110%'),
      borderRadius: 10,
      zIndex: 2,

      backgroundColor: 'white',
      elevation: 1,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: { height: 2, width: 2 },
      position: 'absolute',
      left: CARD_INITIAL_POSITION_X,
      paddingTop: hp('2%'),
      ...this.position.getLayout()
    };
  };

  renderHeader = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, marginTop: hp('1%') }}>
          {this.props.currentWeather.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: hp('1%'), fontSize: 35 }}>
            {kelvinToCelsius(this.props.currentWeather.main.temp) + 'C°'}
          </Text>
          <Image
            style={{ height: 60, width: 60 }}
            source={{
              uri: `${ICON_URI}${this.props.currentWeather.weather[0].icon}.png`
            }}
          />
        </View>
        {this.state.isOpen && this.renderMoreDetail()}
      </View>
    );
  };

  goToDetail = () => {
    this.props.navigation.push('Detail', {
      city: this.props.currentWeather.name
    });
  };

  renderMoreDetail = () => {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Text>Humidity : {this.props.currentWeather.main.humidity} %</Text>
          <Text> Pressue : {this.props.currentWeather.main.pressure} hpa </Text>
          <Text>
            Max temperature :{' '}
            {kelvinToCelsius(this.props.currentWeather.main.temp_max)}
          </Text>
          <Text>
            Min temperature :{' '}
            {kelvinToCelsius(this.props.currentWeather.main.temp_min)}
          </Text>
          <Text>Wind speed : {this.props.currentWeather.wind.speed} km/h</Text>
        </View>
        <Button
          containerStyle={{ marginTop: hp('3%'), width: wp('80%') }}
          onPress={this.goToDetail}
          title='See 5 days forecast'
        />
      </View>
    );
  };

  render() {
    return this.state.panResponder ? (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.getCardStyle()}
      >
        {this.renderHeader()}
      </Animated.View>
    ) : (
      <View />
    );
  }
}

export default withNavigation(WeatherCard);
