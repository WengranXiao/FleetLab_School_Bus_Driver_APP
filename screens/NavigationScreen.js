import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View
} from "react-native";
import MapView, {
  Circle,
  Marker,
  Polyline,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import { FontAwesome6 } from '@expo/vector-icons';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const mapRegionDelta = {
  latitudeDelta: 0.055,
  longitudeDelta: 0.025,
}

const demoData = {
  mapRegionDelta: mapRegionDelta
}


function NavigationScreen({ navigation, route }) {

  const { routeDetail } = route?.params
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // get permission to access current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // set current location on screen first load
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // regist monitor current location to task manager
      TaskManager.defineTask('Monitor Current Location', ({ data: { locations }, error }) => {
        if (error) {
          console.error(error.message)
          return;
        }
        if (locations) {
          console.log('Received new locations', locations);
          setLocation(locations[0]);
        }
      });
      Location.startLocationUpdatesAsync('Monitor Current Location')
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])


  let locationText = 'Waiting..';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location &&
        <MapView
          ref={(ref) => this.mapViewRef = ref}
          style={{ alignSelf: 'stretch', height: '100%' }}
          camera={{
            center: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            pitch: 60,
            heading: location.coords.heading,
            zoom: 16
          }}
          showsTraffic
          followsUserLocation
          provider={PROVIDER_GOOGLE}
        >
          {/* <Marker
            coordinate={location.coords}
          /> */}
          <Circle
            center={location.coords}
            radius={26}
            fillColor="white"
            strokeColor="blue"
            strokeWidth={8}
            zIndex={10}
          />
          <Polyline
            coordinates={routeDetail.navigationCoords}
            strokeColor="#2474b3"
            strokeWidth={10}
          />
          {routeDetail.stopPoints.map((point) =>
            <View key={point.id}>
              <Circle
                center={point}
                radius={8}
                fillColor="white"
                strokeColor="black"
                strokeWidth={4}
              />
              <Marker
                coordinate={point}
                title={point.title}
                description={point.name}
                onSelect={() => {
                  setStop(point)
                  this.mapViewRef.animateToRegion({
                    latitude: point.latitude - 0.008,
                    longitude: point.longitude,
                    latitudeDelta: 0.035,
                    longitudeDelta: 0.035,
                  })
                  bottomSheetModalRef.current?.present();
                }}
              >
                <View />
              </Marker>
            </View>
          )}
        </MapView>
      }
      {location &&
        <View style={{ position: 'absolute', bottom: '5%', left: '2%', width: '60%' }}>
          <Text>{Date(location.timestamp).toString()}</Text>
          <Text>Altitude: {location.coords.altitude}</Text>
          <Text>Heading: {location.coords.heading}</Text>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Text>Speed (mph): {2.23694 * location.coords.speed}</Text>
        </View>
      }
      <View style={styles.routeDetailContainer}>
        <View style={styles.routeDetailIcon}>
          <FontAwesome6 name="arrows-split-up-and-left" size={32} color="black" />
        </View>
        <View style={styles.routeDetailPrompt}>
          <Text style={styles.routeDetailText}>16.7 mile left on I-280</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PostCheck')} style={{ position: 'absolute', bottom: '0%', right: '0%' }}>
        <Text style={{ color: 'blue' }}>End Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  routeDetailContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '3%',
    shadowColor: '#5c5c5c',
    shadowRadius: '12',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 6,
      height: -2
    },
    opacity: 0.92,
    backgroundColor: '#d0dfea',
    width: '90%',
    height: '10%',
    borderRadius: '16',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  routeDetailIcon: {
    position: 'absolute',
    left: '8%'
  },
  routeDetailPrompt: {
    position: 'absolute',
    left: '22%'
  },
  routeDetailText: {
    fontSize: 26,
    fontWeight: '700'
  }
});

export default NavigationScreen;
