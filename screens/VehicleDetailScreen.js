import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { Icon } from 'react-native-elements';

import {
  Avatar,
  Divider,
  ListItem
} from '@rneui/themed';

function VehicleDetailScreen({ navigation }) {

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoContainer}>
          <View style={styles.vehicleNameContainer}>
            <Text style={{ fontSize: 28, textAlign: "center", color: "white", fontWeight: "bold" }}>EQX8608</Text>
            <Text style={{ fontSize: 18, textAlign: "center", color: "#FBC335", marginTop: '3%' }}>Ford Transit 2023</Text>
          </View>
          <TouchableOpacity style={styles.statusButton}>
            <Icon name="hand-heart" type="material-community" color="white" size={35} />
            <Text style={{ fontSize: 16, textAlign: "center", margin: '6%', color: 'white' }}>In Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.dataContainer}>
            <Icon name="gas-station" type="material-community" color="white" />
            <Text style={{ fontSize: 18, textAlign: "center", color: "white", marginLeft: '3%' }}>42%</Text>
          </View>
          <View style={styles.dataContainer}>
            <Icon name="map-marker-path" type="material-community" color="white" />
            <Text style={{ fontSize: 18, textAlign: "center", color: "white", marginLeft: '3%' }}>200 miles</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={{ width: "85%", height: "60%", borderRadius: 20 }} source={require('../assets/Ford_Transit.jpg')} />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.reportDamageButton}
        onPress={() => navigation.navigate("DamageReport")}>
        <Text style={{ fontSize: 20, color: "white", fontWeight: "500" }}>Report Damage</Text>
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
  header: {
    flex: 0.3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2474b3',
    borderEndEndRadius: 20,
    borderBottomStartRadius: 20,
    gap: "20%"
  },
  imageContainer: {
    flex: 0.6,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  statusContainer: {
    flex: 0.15,
    width: "88%",
    flexDirection: "row",
    gap: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  statusButton: {
    width: "23%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: '1%'
  },
  listContainer: {
    flex: 0.38,
    width: '88%',
    shadowRadius: '12',
    borderRadius: '16',
    backgroundColor: 'white',
    shadowColor: '#5c5c5c',
    shadowRadius: '3',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 3
    },
    paddingHorizontal: '3%',
    marginBottom: '5%',
  },
  listItem: {
    height: "20%",
  },
  divider: {
    alignSelf: 'flex-end',
    width: '85%',
  },
  reportDamageButton: {
    position: 'absolute',
    bottom: '4%',
    height: '6%',
    fontWeight: 'bold',
    backgroundColor: '#2474b3',
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "2%",
    gap: "60%"
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  vehicleNameContainer: {
    width: "40%",
    margin: "2%",
    justifyContent: "center",
    alignItems: "left",
  },
  subtitle: {
    fontSize: 17
  },
  iconContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  }
});

export default VehicleDetailScreen;
