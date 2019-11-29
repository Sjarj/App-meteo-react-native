import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

CARD_INITIAL_POSITION_Y = hp('80%');
CARD_INITIAL_POSITION_X = wp('5%');

class WeatherCard extends Component {
  state = {
    panResponder: undefined
  };

  componentDidMount = () => {
    this.position = new Animated.ValueXY();
    this.position.setValue({
      x: CARD_INITIAL_POSITION_X,
      y: CARD_INITIAL_POSITION_Y
    });
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        this.position.setValue({
          x: CARD_INITIAL_POSITION_X,
          y: gesture.moveY
        });
      }
    });
    this.setState({ panResponder });
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

  render() {
    return this.state.panResponder ? (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.getCardStyle()}
      />
    ) : (
      <View />
    );
  }
}

export default WeatherCard;
