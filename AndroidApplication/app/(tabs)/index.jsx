import React, { useEffect, useState } from "react";
import { View, Text, Touchable, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Background from "@/components/Background";
import Btn from "@/components/Btn";
import { darkGreen } from "@/components/Constants";
import Field from "@/components/Field";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// get the dimensions of the window
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = (props) => {
  const [selectedValue, setSelectedValue] = useState({
    zone: "",
    username: "",
    password: "",
  });

  const saveUserDetails = async (userDetails) => {
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    } catch (error) {
      console.error("Error saving user details", error);
    }
  };
  const getUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      return userDetails ? JSON.parse(userDetails) : null;
    } catch (error) {
      console.error("Error retrieving user details", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://api.web-project.in/agriculture/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            role: "WORKER",
            username: selectedValue.username,
            password: selectedValue.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        saveUserDetails(data);
        Alert.alert("Welcome", "You have successfully logged in", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
        router.replace("/Home");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  // check if the user is already logged in
  useEffect(() => {
    getUserDetails().then((userDetails) => {
      if (userDetails) {
        setSelectedValue(userDetails);
        router.replace("/Home");
      }
    });
  }, []);

  return (
    <Background>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginVertical: 20,
            marginTop: windowHeight * 0.08,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: windowHeight,
            width: windowWidth,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(text) =>
              setSelectedValue({ ...selectedValue, username: text })
            }
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setSelectedValue({ ...selectedValue, password: text })
            }
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: windowHeight * 0.05,
            }}
          >
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Forgot Password ?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={handleLogin}
          />
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/Signup")}>
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </Background>
  );
};

export default Login;
