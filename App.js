import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Location } from 'expo';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // function getCurrentLocation() {
  //   const timeout = 10000;
  //   return new Promise(async (resolve, reject) => {
  //     setTimeout(() => { reject(new Error(`Error getting gps location after ${(timeout * 2) / 1000} s`)) }, timeout * 2);
  //     setTimeout(async () => { resolve(await Location.getLastKnownPositionAsync()) }, timeout);
  //     resolve(await Location.getCurrentPositionAsync());
  //   });
  // }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log("status", status);

      // // currentLocation = 
      // // await getCurrentLocation()
      // // await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      // setLocation(await getCurrentLocation()
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000
      });
      console.log({ location }) 
      setLocation(location);
    });
  });

  let text = ' ..waiting';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude.toFixed(6)}, Longitude: ${location.coords.longitude.toFixed(6)}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {location ? <Text>latitude = {location.coords.latitude}</Text> : null}
    {location ? <Text>longitude = {location.coords.longitude}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})