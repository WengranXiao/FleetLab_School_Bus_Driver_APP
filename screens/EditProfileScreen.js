import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  Avatar,
  Button
} from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import PhotoUpload from "./PhotoUpload";

const demoData = {
  profile: {
    userName: 'John',
    address: '500 S State St, Ann Arbor, MI 48109',
    phone: '6081234567',
    email: 'john@gmail.com'
  }
}

function EditProfileScreen({ navigation }) {

  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/4.jpg');

  const [profile, setProfile] = useState({
    userName: '',
    address: '',
    phone: '',
    email: ''
  });

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
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          rounded
          source={{ uri: avatar }}
        >
          <View style={styles.uploadIcon}>
            <PhotoUpload
              setPicUrl={(uri) => {
                setAvatar(uri)
                // save uploaded profile pic to backend here
              }}
              borderStyle={{ backgroundColor: 'transparent' }}
              iconName='camera'
              iconSize={22}
              iconType='font-awesome-5'
            />
          </View>
        </Avatar>
        <Text style={styles.avatarText}>{demoData.profile.userName}</Text>
      </View>
      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Full Name</Text>
        <TextInput
          dense
          value={profile.userName}
          placeholder={demoData.profile.userName}
          mode="outlined"
          onChangeText={text => setProfile({
            ...profile,
            userName: text
          })}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          outlineStyle={{ borderRadius: 12 }}
        />
        <Text style={styles.inputTitle}>Address</Text>
        <TextInput
          dense
          value={profile.address}
          placeholder={demoData.profile.address}
          mode="outlined"
          onChangeText={text => setProfile({
            ...profile,
            address: text
          })}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          outlineStyle={{ borderRadius: 12 }}
        />
        <Text style={styles.inputTitle}>Phone Number</Text>
        <TextInput
          dense
          value={profile.phone}
          placeholder={demoData.profile.phone}
          mode="outlined"
          onChangeText={text => setProfile({
            ...profile,
            phone: text
          })}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          outlineStyle={{ borderRadius: 12 }}
        />
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          dense
          value={profile.email}
          placeholder={demoData.profile.email}
          mode="outlined"
          onChangeText={text => {
            setProfile({
              ...profile,
              email: text
            })
          }}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          outlineStyle={{ borderRadius: 12 }}
        />
      </View>
      <Button
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          console.log('Save Success!')
        }}
      >
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  avatarContainer: {
    flex: 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: "center"
  },
  uploadIcon: {
    position: 'absolute',
    bottom: '0%',
    right: '0%'
  },
  avatarText: {
    marginTop: '2%',
    fontSize: 24,
    fontWeight: '700'
  },
  inputListContainer: {
    flex: 0.7,
    width: '85%',
  },
  inputContainer: {
    marginBottom: '2%',
    backgroundColor: 'white'
  },
  inputTitle: {
    marginVertical: '2%',
    fontSize: 16,
    fontWeight: '500'
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    width: '85%',
    bottom: '5%',
  },
  button: {
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    borderRadius: 20
  }
});

export default EditProfileScreen;
