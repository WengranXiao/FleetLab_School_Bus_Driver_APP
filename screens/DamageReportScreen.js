import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { Dropdown } from 'react-native-element-dropdown';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Secrets";
import PhotoUpload from "./PhotoUpload";

function DamageReportScreen({ navigation }) {

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  const [time, setTime] = useState(new Date().toString());
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState("");
  const [level, setLevel] = useState("");
  const [isLevelFocus, setIsLevelFocus] = useState(false);
  const [description, setDescription] = useState("");
  const [picList, setPicList] = useState([]);

  const levelData = [
    { label: 'Safe to Drive', value: 1 },
    { label: 'Do Not Drive - Needs Service', value: 2 },
    { label: 'Do Not Drive - Critical Damage', value: 3 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Date and Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />
        <Text style={styles.title}>Location</Text>
        <GooglePlacesAutocomplete
          styles={{
            textInputContainer: {
              backgroundColor: "#fff",
              width: "100%",
              height: "10%",
              borderRadius: 10,
            },
            textInput: {
              fontSize: 16,
              height: "100%",
              borderRadius: 10,
            },
            container: {
              marginBottom: '-80%'
            }
          }}
          placeholder={location ? location : "Current Location"}
          onPress={(data) => {
            setLocation(data.description);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
        />
        <Text style={styles.title}>Damage Area</Text>
        <TextInput
          style={styles.input}
          value={area}
          onChangeText={setArea}
        />
        <Text style={styles.title}>Severity Level</Text>
        <Dropdown
          style={styles.dropDown}
          data={levelData}
          value={level}
          onChange={item => {
            setLevel(item.label);
            setIsLevelFocus(false);
          }}
          onFocus={() => setIsLevelFocus(true)}
          onBlur={() => setIsLevelFocus(false)}
          placeholder={level}
          labelField="label"
        />
        <Text style={styles.title}>Photos</Text>
        <View style={styles.photoContainer}>
          {picList.map((picUrl, index) => (
            <Image
              key={index}
              source={{ uri: picUrl }}
              style={{ width: "25%", height: "100%", borderRadius: 10 }}
            />
          ))}
          <PhotoUpload
            setPicUrl={(uri) => setPicList((prev) => [...prev, uri])}
            borderStyle={{ width: "25%", height: "100%", borderRadius: 10 }}
          />
        </View>
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.inputLong}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonCancel}
          onPress={() => navigation.navigate("VehicleDetail")}>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "500" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={() => { console.log(time, location, area, level, description); navigation.navigate("VehicleDetail") }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "500" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: "2%"
  },
  input: {
    height: "6%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: '3%',
  },
  inputLong: {
    height: "15%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: '3%',
  },
  inputContainer: {
    flex: 0.9,
    width: "90%",
    alignItems: "left",
    justifyContent: "center",
    marginTop: '3%'
  },
  dropDown: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: '3%',
    paddingRight: '1%',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 0.07,
  },
  button: {
    width: "40%",
    height: "85%",
    fontWeight: 'bold',
    backgroundColor: '#2474b3',
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "2%",
    marginVertical: '4%',
    borderColor: '#2474b3',
    borderWidth: 2
  },
  buttonCancel: {
    width: "40%",
    height: "85%",
    fontWeight: 'bold',
    backgroundColor: '#f8f4f4',
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "2%",
    marginVertical: '4%',
    borderColor: 'red',
    borderWidth: 2
  },
  photoContainer: {
    flexDirection: "row",
    flex: 0.5,
    justifyContent: "space-around",
    alignItems: "center",
    gap: "10%",
  },
});

export default DamageReportScreen;
