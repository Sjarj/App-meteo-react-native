import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { getCurrentWeatherByCity } from '../actions';

const DEFAUT_COORD = {
  lat: 48.859268,
  lng: 2.34706
};

class SearchScreen extends React.Component {
  state = { search: '' };

  updateSearch = search => {
    this.setState({ search });
  };

  submitSearch = () => {
    this.props.getCurrentWeatherByCity(this.state.search);
  };

  render() {
    console.log(this.props.currentWeather);
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: DEFAUT_COORD.lat,
            longitude: DEFAUT_COORD.lng,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1
          }}
          scrollEnabled={false}
          liteMode={true}
        />
        <SearchBar
          lightTheme
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={this.submitSearch}
          placeholder='type your city...'
          containerStyle={{
            position: 'absolute',
            bottom: hp('50%'),
            left: wp('5%'),
            width: wp('90%')
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  currentWeather: state.weather.data
});

const mapDispatchToProps = {
  getCurrentWeatherByCity
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
