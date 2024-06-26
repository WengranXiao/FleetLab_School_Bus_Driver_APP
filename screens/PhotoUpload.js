import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

function PhotoUpload({ picUrl, setPicUrl, removePic, borderStyle, iconName, iconType, iconSize }) {
  const takePicture = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take photos"
      );
      return;
    }

    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    })
      .then((result) => {
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setPicUrl(uri);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const selectImageFromGallery = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    })
      .then((result) => {
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setPicUrl(uri);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const showOptions = () => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        { text: "Take Picture", onPress: takePicture },
        { text: "Select from Gallery", onPress: selectImageFromGallery },
        { text: "Cancel", onPress: () => { }, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.uploadPic, borderStyle]}
      onPress={removePic ? () => removePic(picUrl) : showOptions}
    >
      {picUrl ? (
        <>
          <Image source={picUrl} style={borderStyle} />
          {removePic && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.15)",
              }}
            >
              <Icon
                name="trash-can"
                type="material-community"
                size={28}
                color="#fff"
              />
            </View>
          )}
        </>
      ) : (
        <Icon name={iconName || 'upload'} type={iconType || "feather"} size={iconSize || 30} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadPic: {
    borderColor: "#4D4D4D",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});

export default PhotoUpload;
