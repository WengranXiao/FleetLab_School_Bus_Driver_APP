import { useEffect, useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import {
  Button,
  TextInput
} from 'react-native-paper';

import { delay } from '../util';


function SignInScreen({ navigation, setIsSignedIn, setLoading }) {

  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {

  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <View style={styles.headlineContainer}>
        <Text style={styles.headlineText}>Log in</Text>
        <Text style={styles.headlineText}>your account</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginPanel}>
          <View style={styles.inputPanel}>
            <Text style={styles.inputTitle}>Email / Phone Number</Text>
            <TextInput
              mode='outlined'
              value={emailPhone}
              onChangeText={text => setEmailPhone(text)}
              style={styles.inputContainer}
              outlineColor="#2474b3"
              activeOutlineColor="#2474b3"
              outlineStyle={{ borderRadius: 12 }}
            />
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              mode='outlined'
              value={password}
              secureTextEntry={!viewPassword}
              onChangeText={text => setPassword(text)}
              style={styles.inputContainer}
              outlineColor="#2474b3"
              activeOutlineColor="#2474b3"
              outlineStyle={{ borderRadius: 12 }}
              right={
                <TextInput.Icon
                  icon={viewPassword ? 'eye-off' : 'eye'}
                  onPress={() => setViewPassword(!viewPassword)}
                />
              }
            />
            <View style={styles.passwordFootline}>
              <CheckBox
                title='Remember me'
                checked={rememberMe}
                textStyle={styles.rememberMeText}
                containerStyle={styles.rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              />
              <TouchableOpacity>
                <Text style={styles.forgetPasswordText}>Forget Password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={styles.buttonContainer}
            contentStyle={styles.button}
            labelStyle={styles.buttonText}
            buttonColor='#288cdc'
            mode='contained'
            type='solid'
            loading={buttonLoading}
            disabled={buttonLoading}
            onPress={async () => {
              if (emailPhone === '' || password === '') {
                Alert.alert("Empty Input", 'please fill in all fields', [{ text: "OK" }])
                return
              }
              try {
                setButtonLoading(true)
                // authenticate with backend here
                await delay(1000)
                // show loading page here after success authentication
                setIsSignedIn(true)
                setLoading(true)
                // comfort user with fake loading page
                await delay(1800)
                setLoading(false)
                // the acutally data can be grabbed on main screen load
                // or we can use redux/states to handle data storage accross multiple screens
                // but currently update data on each screen navigation to make life easier
              } catch (error) {
                Alert.alert("Sign In Error", error.message, [{ text: "OK" }])
              }
              setButtonLoading(false)
            }}
          >
            {buttonLoading ? 'Authenticating' : 'Sign In'}
          </Button>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.signInFooter}>
        <Text style={styles.signInFooterText}>By logging in, you agree to App’s </Text>
        <Text>
          <Text style={styles.signInFooterLink}>Terms & Conditions</Text>
          <Text style={styles.signInFooterText}> and </Text>
          <Text style={styles.signInFooterLink}>Privacy Policy.</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headlineContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: '5%',
    width: '80%',
  },
  headlineText: {
    fontSize: 34,
    fontWeight: '700',
  },
  inputContainer: {
    height: 50,
    marginBottom: '5%',
    backgroundColor: 'white',
  },
  loginPanel: {
    flex: 1,
    paddingHorizontal: '6%',
  },
  inputPanel: {
    flex: 0.3,
    justifyContent: 'space-between'
  },
  inputTitle: {
    marginVertical: '2%',
    fontSize: 16,
    fontWeight: '500'
  },
  loginButton: {
    marginBottom: '3%',
  },
  animation: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '20%',
    alignSelf: 'center',
  },
  button: {
    height: 50,
  },
  buttonText: {
    padding: '2.5%',
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'center'
  },
  passwordFootline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: '-5%',
    paddingRight: '0.5%'
  },
  rememberMe: {
    marginLeft: '-2%'
  },
  rememberMeText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'grey',
    marginLeft: '1%',
    color: 'black'
  },
  forgetPasswordText: {
    fontSize: 15,
    color: 'grey',
    fontStyle: 'italic'
  },
  signInFooter: {
    width: '100%',
    position: 'absolute',
    bottom: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInFooterText: {
    color: 'grey',
    fontSize: 11,
    lineHeight: 16,
  },
  signInFooterLink: {
    color: '#2474b3',
    fontSize: 11,
    lineHeight: 16,
    textDecorationLine: 'underline'
  }
});

export default SignInScreen;