import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import Background from "../components/Background";
import { Picker } from "@react-native-picker/picker";
import { darkGreen } from "@/components/Constants";

const Report = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(windowWidth)).current;

  const [formDetails, setFormDetails] = useState({
    dropdown: "",
    description: "",
    list: [],
  });

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
            Reports
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
          <Picker
            selectedValue={formDetails.dropdown}
            onValueChange={(itemValue, itemIndex) =>
              setFormDetails({ ...formDetails, dropdown: itemValue })
            }
            style={{
              height: 50,
              width: "100%",
              color: darkGreen,
              backgroundColor: "rgb(220,220, 220)",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Picker.Item label="Select Report Type" value="" />
            <Picker.Item label="Soil Report" value="Soil Report" />
            <Picker.Item label="Seed Report" value="Seed Report" />
            <Picker.Item
              label="Plant Health Report"
              value="Plant health Report"
            />
          </Picker>
          <View
            style={{
              width: "100%",
              //   alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Description
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: "rgb(220,220, 220)",
              }}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, description: text })
              }
            />
            {/* File upload option */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                alignItems: "center",
                padding: 10,
                backgroundColor: "rgb(220,220, 220)",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Upload Files
              </Text>
              <TouchableOpacity>
                {/* <Image
                  source={require("../assets/icons/upload.png")}
                  style={{ width: 30, height: 30 }}
                /> */}
              </TouchableOpacity>

              {/* <Image source={require("../assets/icons/upload.png")} /> */}

              <Text>Upload</Text>
            </View>
          </View>
          <View
            style={{
              width: windowWidth - 40,
              backgroundColor: darkGreen,
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
              position: "absolute",
              bottom: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </View>
        </View>
        {/* create a submit button */}
      </View>
    </Background>
  );
};

export default Report;
