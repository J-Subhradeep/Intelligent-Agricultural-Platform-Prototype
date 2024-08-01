import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

import Background from "../components/Background";
import Field from "../components/Field";
import { darkGreen } from "../components/Constants";
import { Picker } from "@react-native-picker/picker";
import { Link, router } from "expo-router";

const Home = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <Background>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth - 10,
            position: "relative",
            paddingVertical: 20,
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Text>

          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            {/* add a icon */}
            <Image
              source={require("@/assets/images/user.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                position: "absolute",
                right: 10,
                top: 0,
                marginTop: -14,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: windowHeight,
            width: windowWidth,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 30,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={() => router.replace("/AssignTask")}>
              <ImageBackground
                // source={{
                //   uri: "https://picsum.photos/150/100?random=1",
                // }}
                style={{
                  width: 165,
                  margin: 10,
                  backgroundColor: "lightgreen",

                  borderColor: "black",
                  borderWidth: 1,
                  height: 100,
                  borderRadius: 20,
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  View tasks
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/Report")}>
              <ImageBackground
                // source={{
                //   uri: "https://picsum.photos/150/100?random=1",
                // }}
                style={{
                  width: 165,
                  margin: 10,
                  backgroundColor: "yellow",
                  borderColor: "black",
                  borderWidth: 1,
                  height: 100,
                  borderRadius: 20,
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Reports
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => router.replace("/DiseasePrediction")}
            >
              <ImageBackground
                style={{
                  width: 165,
                  margin: 10,
                  backgroundColor: "lightblue",
                  height: 100,
                  borderRadius: 20,

                  borderColor: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Plant disease prediction
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Home;
