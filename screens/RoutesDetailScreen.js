import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import {
  Avatar,
  Button
} from '@rneui/themed';
import MapView, {
  Circle,
  Marker,
  Polyline
} from 'react-native-maps';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const mapRegion = {
  latitude: 37.772,
  longitude: -122.44,
  latitudeDelta: 0.05,
  longitudeDelta: 0.055,
}

const stopPoints = [
  {
    id: 0,
    title: 'Start',
    name: 'California St',
    address: '909 S University Ave, Ann Arbor, MI 48109',
    image: 'https://picsum.photos/id/348/1000/500',
    latitude: 37.7896386,
    longitude: -122.421646
  },
  {
    id: 1,
    title: 'Stop 1',
    name: 'Alamo Square Residental',
    address: '615 S State St, Ann Arbor, MI 48106',
    image: 'https://picsum.photos/id/350/1000/500',
    latitude: 37.7774153,
    longitude: -122.4347787,
  },
  {
    id: 2,
    title: 'Stop 2',
    name: 'Golden Gate Park',
    address: '2650 Lancashire Dr, Ann Arbor, MI 48107',
    image: 'https://picsum.photos/id/372/1000/500',
    latitude: 37.7744153,
    longitude: -122.4577787
  },
  {
    id: 3,
    title: 'Stop 3',
    name: 'Presidio Gold Course',
    address: '868 Western Dr, Ann Arbor, MI 48112',
    image: 'https://picsum.photos/id/376/1000/500',
    latitude: 37.78825,
    longitude: -122.4592,
  },
  {
    id: 4,
    title: 'Stop 4',
    name: 'Palace of Fine Arts',
    address: '770 Rainbow Ln, Ann Arbor, MI 48160',
    image: 'https://picsum.photos/id/392/1000/500',
    latitude: 37.79655,
    longitude: -122.4452,
  },
  {
    id: 5,
    title: 'End',
    name: 'Aquatic Cove',
    address: '5 President St, Ann Arbor, MI 48666',
    image: 'https://picsum.photos/id/364/1000/500',
    latitude: 37.7990259,
    longitude: -122.4241431,
  },
]

const demoRouteDetail = {
  mapRegion: mapRegion,
  stopPoints: stopPoints,
  navigationCoords: [
    { latitude: 37.7896386, longitude: -122.421646 },
    { latitude: 37.7792248, longitude: -122.4194628 },
    { latitude: 37.7744153, longitude: -122.4577787 },
    { latitude: 37.7948605, longitude: -122.4596065 },
    { latitude: 37.7990259, longitude: -122.4241431 },
  ]
}

function RoutesDetailScreen({ navigation, route }) {

  // data passed from RouteScreen
  // TODO: map data should come from RouteScreen
  const { agenda } = route?.params

  const bottomSheetModalRef = useRef();
  const [stop, setStop] = useState({})

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MapView
          ref={(ref) => this.mapViewRef = ref}
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={demoRouteDetail.mapRegion}
          showsTraffic
          followsUserLocation
        >
          <Polyline
            coordinates={demoRouteDetail.navigationCoords}
            strokeColor="#2474b3"
            strokeWidth={5}
          />
          {demoRouteDetail.stopPoints.map((point) =>
            <View key={point.id}>
              <Circle
                center={point}
                radius={80}
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.goBackButtonContainer}
          onPress={() => {
            this.mapViewRef.animateToRegion(demoRouteDetail.mapRegion)
          }}
        >
          <Avatar
            size={40}
            rounded
            icon={{ name: "location-arrow", type: "font-awesome" }}
            containerStyle={styles.goBackButton}
          />
        </TouchableOpacity>
        <View style={styles.routeDetailContainer}>
          <View style={styles.routeDetailHeader}>
            <Text style={styles.headerText}>{agenda.vehicle}</Text>
            <Text style={styles.headerText}>{agenda.time}</Text>
          </View>
          <View style={styles.routeDetail}>
            <View style={styles.routeDetailTab}><MaterialCommunityIcons name="check-circle-outline" size={50} color={'#2474b3'} /></View>
            <View style={styles.routeDetailTab}><MaterialCommunityIcons name="account-outline" size={50} color={'#2474b3'} /></View>
            <View style={styles.routeDetailTab}><MaterialIcons name="accessibility-new" size={50} color='#2474b3' /></View>
            <View style={styles.routeDetailTab}><MaterialCommunityIcons name="clock-outline" size={50} color={'#2474b3'} /></View>
          </View>
          <View style={styles.routeDetail}>
            <View style={styles.routeDetailTab}><Text style={styles.iconText}>Precheck</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.iconText}>Students</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.iconText}>Needs</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.iconText}>Duration</Text></View>
          </View>
          <View style={styles.routeDetail}>
            <View style={styles.routeDetailTab}><Text style={styles.routeDetailText}>{agenda.time}</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.routeDetailText}>12</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.routeDetailText}>Wheelchair</Text></View>
            <View style={styles.routeDetailTab}><Text style={styles.routeDetailText}>{agenda.duration}</Text></View>
          </View>
          <Button
            mode="contained"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('PreCheck', { routeDetail: demoRouteDetail })
            }}
          >
            Start pre check
          </Button>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['43%', '70%']}
          backgroundStyle={styles.stopModel}
        >
          <View style={styles.stopContainer}>
            <View style={styles.stopDetailHeader}>
              <Text style={styles.stopDetailHeaderText}>{stop.title}</Text>
              <Text style={styles.stopDetailHeaderText}>{agenda.time}</Text>
            </View>
            <View style={styles.stopDetailLocation}>
              <Text style={styles.stopTitleText}>{stop.name}</Text>
              <Text style={styles.addressText}>{stop.address}</Text>
            </View>
            <View style={styles.stopDetailInfoContainer}>
              <Card mode='contained' style={styles.stopImageContainer}>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle"/> */}
                {/* <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content> */}
                <Card.Cover source={{ uri: stop.image }} />
              </Card>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  goBackButtonContainer: {
    position: 'absolute',
    bottom: '46%',
    right: '5%'
  },
  goBackButton: {
    shadowColor: '#5c5c5c',
    shadowRadius: '6',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 2,
      height: -1
    },
    opacity: 0.92,
    backgroundColor: "#2f90dc",
  },
  routeDetailContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
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
    height: '38%',
    borderRadius: '16'
  },
  routeDetailHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    marginBottom: '2%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  routeDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1%'
  },
  routeDetailTab: {
    flex: 0.23,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
  },
  routeDetailText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: '8%'
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '10%',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 30,
  },
  buttonText: {
    width: '90%',
    fontSize: 20,
    borderRadius: 20
  },
  stopModel: {
    backgroundColor: '#e3ecf2',
    borderRadius: 20,
    shadowColor: '#5c5c5c',
    shadowRadius: '12',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: -4
    },
    opacity: 0.97,
  },
  stopContainer: {
    width: '100%',
  },
  stopDetailHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '5%',
    marginBottom: '3%',
    marginTop: '-1%'
  },
  stopDetailHeaderText: {
    fontSize: 18,
    fontWeight: '500',
  },
  stopDetailLocation: {
    paddingHorizontal: '5%',
  },
  stopTitleText: {
    fontSize: 22,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: '1%'
  },
  stopDetailInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    marginHorizontal: '5%',
  },
  stopImageContainer: {
    flex: 1
  },
});

export default RoutesDetailScreen;
