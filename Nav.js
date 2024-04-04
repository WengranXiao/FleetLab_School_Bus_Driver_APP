import { useEffect, useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import LoadingScreen from './screens/LoadingScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditAvailabilityScreen from './screens/EditAvailabilityScreen';
import EditPasswordScreen from './screens/EditPasswordScreen';
import RoutesScreen from './screens/RoutesScreen';
import RoutesDetailScreen from './screens/RoutesDetailScreen';
import PreCheckScreen from './screens/PreCheckScreen';
import NavigationScreen from './screens/NavigationScreen';
import PostCheckScreen from './screens/PostCheckScreen';
import VehicleDetailScreen from './screens/VehicleDetailScreen';
import DamageReportScreen from './screens/DamageReportScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LoginTabStack({ setIsSignedIn, setLoading }) {
  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen
        name="SignIn"
        children={() => <SignInScreen setIsSignedIn={setIsSignedIn} setLoading={setLoading} />}
        options={{
          ...styles.header,
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function LoadingScreenStack() {
  return (
    <Stack.Navigator initialRouteName='Loading'
      screenOptions={{
        contentStyle: {
          backgroundColor: '#2474b3'
        }
      }}
    >
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{
          ...styles.header,
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileTabStack({ navigation, setIsSignedIn }) {
  return (
    <Stack.Navigator initialRoutesName='Profile'
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen
        name="Profile"
        children={() => <ProfileScreen navigation={navigation} setIsSignedIn={setIsSignedIn} />}
        options={styles.header}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          ...styles.header,
          title: 'Edit Profile'
        }}
      />
      <Stack.Screen
        name="EditAvailability"
        component={EditAvailabilityScreen}
        options={{
          ...styles.header,
          title: 'Edit Availability'
        }}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPasswordScreen}
        options={{
          ...styles.header,
          title: 'Change Password'
        }}
      />
    </Stack.Navigator>
  );
}

function RoutesTabStack() {
  return (
    <Stack.Navigator initialRoutesName='Routes'
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen
        name="Routes"
        component={RoutesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoutesDetail"
        component={RoutesDetailScreen}
        options={({ route }) => ({
          ...styles.header,
          title: route.params.agenda.title,
        })}
      />
      <Stack.Screen
        name="PreCheck"
        component={PreCheckScreen}
        options={{
          ...styles.header,
          title: 'Pre Check'
        }}
      />
      <Stack.Screen
        name="DamageReport"
        component={DamageReportScreen}
        options={{
          ...styles.header,
          title: 'Damage Report'
        }}
      />
      <Stack.Screen
        name="Navigation"
        component={NavigationScreen}
        options={styles.header}
      />
      <Stack.Screen
        name="PostCheck"
        component={PostCheckScreen}
        options={{
          ...styles.header,
          title: 'Post Check',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function VehicleTabStack() {
  return (
    <Stack.Navigator initialRoutesName='VehicleDetail'
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen
        name="VehicleDetail"
        component={VehicleDetailScreen}
        options={{
          ...styles.header,
          headerShadowVisible: false,
          title: 'Vehicle Detail'
        }}
      />
      <Stack.Screen
        name="DamageReport"
        component={DamageReportScreen}
        options={{
          ...styles.header,
          title: 'Damage Report'
        }}
      />
    </Stack.Navigator>
  );
}

function Nav() {

  const [loading, setLoading] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const getStatus = async () => {
      // TODO: get user authorization
      // TODO: set loading according to login status
      // TODO: set isSignedIn according to login status (auto login)
    }
    getStatus()
  }, [])

  if (!isSignedIn || loading) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{
            display: 'none'
          }}
        >
          {loading && <Tab.Screen name='LoadingTab' component={LoadingScreenStack} />}
          {!isSignedIn && <Tab.Screen name='LoginTab' children={() => <LoginTabStack setIsSignedIn={setIsSignedIn} setLoading={setLoading} />} />}
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          compact
          shifting
          activeColor="#2474b3"
          inactiveColor="#5c5c5c"
          activeIndicatorStyle={{
            backgroundColor: 'white'
          }}
          barStyle={{
            backgroundColor: '#e3ecf2',
          }}
          safeAreaInsets={{
            bottom: 5,
          }}
          initialRouteName='RoutesTab'
          getLazy={({ route }) => route.key === 'ProfileTab'}
        >
          <Tab.Screen
            name='ProfileTab'
            children={(props) => <ProfileTabStack {...props} setIsSignedIn={setIsSignedIn} />}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-circle-outline" size={26} color={color} />),
            }}
          />
          <Tab.Screen
            name='RoutesTab'
            component={RoutesTabStack}
            options={{
              tabBarLabel: 'Routes',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="map" size={26} color={color} />),
            }}
          />
          <Tab.Screen
            name='VehicleTab'
            component={VehicleTabStack}
            options={{
              tabBarLabel: 'Vehicle',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="bus" size={26} color={color} />),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    headerShown: true,
    headerStyle: {
      backgroundColor: '#2474b3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20
    },
  }
});

export default Nav;