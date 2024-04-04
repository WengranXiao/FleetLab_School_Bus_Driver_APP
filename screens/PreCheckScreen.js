import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import {
  AppState,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const demoData = {
  demoChecklist: [
    'Arrive 10 min before pickup time',
    'Lights check',
    'Tire pressure',
    'Windshield washer fluid',
    'Windows are clean',
    'Mirrors are clean',
    'Check safety and cleanup kit',
    'Address maintenance issues'
  ]
}

function PreCheckScreen({ navigation, route }) {

  const { routeDetail } = route?.params

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const t = Array(demoData.demoChecklist.length).fill(false)
  const [checkList, setCheckList] = useState(t);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        // app return to foreground
        navigation.navigate('PostCheck', {
          routeDetail: routeDetail
        })
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, [])

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Button
        mode="contained"
        disabled={checkList.some((e) => e === false)}
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={handlePress}
      // onPress={() => {
      //   navigation.navigate('Navigation', {
      //     routeDetail: routeDetail
      //   })
      // }}
      >
        Start Trip
      </Button>
    )
  };

  return (
    <View style={styles.container}>
      {/* TODO: replace hard coding 8 times with FlatList (currently just for demo) */}
      <View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[0] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[0] = !newCheckList[0]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="clock-outline" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[0]}</Text>
            {checkList[0] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[1] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[1] = !newCheckList[1]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[1]}</Text>
            {checkList[1] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[2] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[2] = !newCheckList[2]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="speedometer" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[2]}</Text>
            {checkList[2] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[3] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[3] = !newCheckList[3]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="car-brake-fluid-level" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[3]}</Text>
            {checkList[3] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[4] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[4] = !newCheckList[4]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="car-door" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[4]}</Text>
            {checkList[4] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[5] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[5] = !newCheckList[5]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="mirror" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[5]}</Text>
            {checkList[5] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[6] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[6] = !newCheckList[6]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="toolbox-outline" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[6]}</Text>
            {checkList[6] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemCol, borderWidth: 4, borderColor: checkList[7] ? '#2474b3' : '#e3ecf2' }}
            onPress={() => {
              const newCheckList = [...checkList]
              newCheckList[7] = !newCheckList[7]
              setCheckList(newCheckList)
            }}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name="tools" size={46} color={'#2474b3'} />
            </View>
            <Text style={styles.itemText}>{demoData.demoChecklist[7]}</Text>
            {checkList[7] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <OpenURLButton url={'https://www.google.com/maps/dir/?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=Driving'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '6%',
    width: '100%',
    alignSelf: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    flex: 0.235,
  },
  itemCol: {
    flex: 0.46,
    flexDirection: 'column',
    backgroundColor: 'yellow',
    marginHorizontal: '2%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3ecf2',
    borderRadius: 14,
    paddingHorizontal: '2%',
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: '5%'
  },
  buttonsContainer: {
    width: '90%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '4%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.92,
  },
  button: {
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 22,
    borderRadius: 20
  },
  checkedIcon: {
    position: 'absolute',
    top: '4%',
    right: '3%'
  }
});

export default PreCheckScreen;
