import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import michi from "./assets/michi.jpg";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export const App = () => {
  const [selectedImages, setSelectedImages] = useState(null);
  const click = () => {
    console.log("clicked");
  };
  const openImagePickerAsync = async () => {
    let permisionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisionResult.granted)
      return alert("Permission to access camera is required");
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.canceled) return;
    setSelectedImages({ uri: pickerResult.assets[0].uri });
  };
  const openShareDialog = async () => {
    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) return alert("This device can't share images");
    await Sharing.shareAsync(selectedImages.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an image!</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          style={styles.image}
          source={{
            uri:
              selectedImages !== null
                ? selectedImages.uri
                : "https://picsum.photos/200",
          }}
        />
      </TouchableOpacity>
      {/* Image when is in project */}
      {/* <Image style={styles.image} source={michi} /> */}
      {/* ------------------------------------------------ */}
      {/* Default Buttons */}
      {/* <View style={styles.buttonsContainer}>
        <Button
          title="Press Me"
          onPress={() => Alert.alert("Alert")}
          color="#fa3030"
        />
        <Button title="Press Me" onPress={() => click()} color="#fa3030" />
      </View> */}
      {selectedImages && (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share Image!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    backgroundColor: "#505050",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
  },
  image: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 30,
    objectFit: "cover",
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 30,
  },
  button: {
    backgroundColor: "blue",
    padding: 7,
    margin: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
