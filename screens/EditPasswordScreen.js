import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View
} from "react-native";

import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';

function EditPasswordScreen({ navigation }) {

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [viewNewPassword, setViewNewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)


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
      <View style={styles.inputListContainer}>
      <Text style={styles.inputTitle}>Old Password</Text>
        <TextInput
          dense
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          secureTextEntry={!viewPassword}
          right={
            <TextInput.Icon
              icon={viewPassword ? 'eye-off' : 'eye'}
              onPress={() => setViewPassword(!viewPassword)}
            />
          }
          outlineStyle={{borderRadius: 12}}
        />
        <Text style={styles.inputTitle}>New Password</Text>
        <TextInput
          dense
          value={newPassword}
          mode="outlined"
          onChangeText={text => setNewPassword(text)}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          secureTextEntry={!viewNewPassword}
          right={
            <TextInput.Icon
              icon={viewNewPassword ? 'eye-off' : 'eye'}
              onPress={() => setViewNewPassword(!viewNewPassword)}
            />
          }
          outlineStyle={{borderRadius: 12}}
        />
        <Text style={styles.inputTitle}>Confirm Password</Text>
        <TextInput
          dense
          value={confirmPassword}
          mode="outlined"
          onChangeText={text => setConfirmPassword(text)}
          style={styles.inputContainer}
          outlineColor="#2474b3"
          activeOutlineColor="#2474b3"
          secureTextEntry={!viewConfirmPassword}
          right={
            <TextInput.Icon
              icon={viewConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setViewConfirmPassword(!viewConfirmPassword)}
            />
          }
          error={newPassword !== confirmPassword}
          outlineStyle={{borderRadius: 12}}
        />
      </View>
      <Button
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        disabled={newPassword !== confirmPassword || newPassword.length === 0}
        onPress={() => {
          console.log('Save Success!')
        }}
      >
        Set Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputListContainer: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: '5%',
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
    width: '80%',
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

export default EditPasswordScreen;
