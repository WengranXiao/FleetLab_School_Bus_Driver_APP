import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Avatar,
  // Button,
  Divider,
  Icon,
  ListItem,
  Switch
} from '@rneui/themed';
import { Button } from "react-native-paper";

import { delay } from "../util";

const demoData = {
  profile: {
    userName: 'John',
    pushNotification: true,
  }
}

function ProfileScreen({ navigation, setIsSignedIn }) {

  const [buttonLoading, setButtonLoading] = useState(false)
  const [profile, setProfile] = useState(demoData.profile)

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
          source={{ uri: "https://randomuser.me/api/portraits/men/4.jpg" }}
        />
        <Text style={styles.avatarText}>{demoData.profile.userName}</Text>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('EditProfile')
          }}
        >
          <ListItem>
            <Icon name="account-circle-outline" type="material-community" color="grey" />
            <ListItem.Content>
              <ListItem.Title>Edit Profile</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
        <Divider style={styles.divider} inset insetType="left" />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('EditAvailability')
          }}
        >
          <ListItem>
            <Icon name="event-available" type="materialIcons" color="grey" />
            <ListItem.Content>
              <ListItem.Title>Edit Availability</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
        <Divider style={styles.divider} inset insetType="left" />
        <ListItem>
          <Icon name="notifications" type="materialIcons" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={profile.pushNotification}
              onValueChange={() => setProfile({
              ...profile,
              pushNotification: !profile.pushNotification
            })}
          />
        </ListItem>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode='text'
          textColor='red'
          size='sm'
          labelStyle={styles.buttonText}
          contentStyle={styles.button}
          loading={buttonLoading}
          disabled={buttonLoading}
          loadingProps={{ color: 'red' }}
          onPress={async () => {
            setButtonLoading(true)
            await delay(1000)
            setIsSignedIn(false)
            setButtonLoading(false)
          }}
        >
          Log Out
        </Button>
      </View>
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
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: "center"
  },
  avatarText: {
    marginTop: '2%',
    fontSize: 24,
    fontWeight: '700'
  },
  listContainer: {
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
    paddingVertical: '3%',
    paddingHorizontal: '3%'
  },
  divider: {
    alignSelf: 'flex-end',
    width: '85%',
  },
  buttonContainer: {
    width: '36%',
    position: 'absolute',
    bottom: '4%',
  },
  button: {
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 18,
    color: 'red'
  },
});

export default ProfileScreen;
