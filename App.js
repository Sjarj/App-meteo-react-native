import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const DEFAUT_COORD = {
  lat: 48.859268,
  lng: 2.34706
};

export default function App() {
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
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
