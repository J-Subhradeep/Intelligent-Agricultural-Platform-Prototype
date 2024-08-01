import Background from "@/components/Background";
import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const DiseasePrediction = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  const [facing, setFacing] = useState("back");
  //   const cameraRef = React.useRef(null);

  const toggleCameraFacing = () => {
    setFacing((facing) => (facing === "back" ? "front" : "back"));
  };

  // capture the image
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // Do something with the captured image
      console.log(photo);
    }
  };

  const showAlert = () => {
    // show a alert fetching the data
    Alert.alert("Disease Prediction", "Do you want to predict the disease?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          // show a alert fetching the data
          Alert.alert("Disease Prediction", "Fetching the data...");
          // auto close the alert
          setTimeout(() => {
            Alert.alert(
              "Disease Prediction",
              "Predicted disease is Bacterial spot"
            );
          }, 3000);
        },
      },
    ]);
  };

  return (
    <Background>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth - 10,
            position: "relative",
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Disease Prediction
          </Text>
        </View>
        <View
          style={{
            width: windowWidth,
            height: windowHeight - 85,
            paddingTop: 30,
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingBottom: 20,
          }}
        >
          {/* Image galary */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 8,
              }}
              onPress={showAlert}
            >
              <Image
                source={require("../assets/images/Leaf1.jpg")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
              }}
            >
              <Image
                source={require("../assets/images/Leaf2.jpg")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
              }}
            >
              <Image
                source={require("../assets/images/Leaf3.jpeg")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* <CameraView
            style={{
              width: windowWidth - 40,
              height: windowHeight - 200,
            }}
            facing={facing}
            permission={permission}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.text}>Capture</Text>
              </TouchableOpacity>
            </View>
          </CameraView> */}
        </View>
      </View>
    </Background>
  );
};

export default DiseasePrediction;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
