import { useState } from "react";

import { StyleSheet, View, Text } from "react-native";

import LottieView from "lottie-react-native";

function LoadingScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.titleLineOne}>Welcome to</Text>
      <Text style={styles.titleLineTwo}>Fleet Lab</Text>
      <Text style={styles.loadingText}>Loading</Text>
      <LottieView
        source={require("../assets/loading.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLineOne: {
    position: 'absolute',
    top: '20%',
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginLeft: "10%",
  },
  titleLineTwo: {
    position: 'absolute',
    top: '24%',
    color: 'white',
    fontSize: 46,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginLeft: "10%"
  },
  loadingText: {
    position: 'absolute',
    top: '70%',
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  animation: {
    position: 'absolute',
    top: '18%',
    width: '70%',
    height: '70%',
    zIndex: -1
  },
});

export default LoadingScreen;