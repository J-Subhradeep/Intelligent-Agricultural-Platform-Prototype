import React from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Background from "../components/Background";
import Btn from "../components/Btn";
import { darkGreen } from "../components/Constants";
import Field from "../components/Field";

import { Link, router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Signup = (props) => {
  return (
    <Background>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: width,
            height: height - 135,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 10,
            paddingTop: 50,
            alignItems: "center",
            position: "relative",
          }}
        >
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
          />
          <Field placeholder="Contact Number" keyboardType={"number"} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />

          <View
            // make the button below a component
            style={{
              position: "absolute",
              bottom: 50,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: width - 50,
                paddingRight: 16,
              }}
            >
              <Text style={{ color: "grey", fontSize: 16 }}>
                By signing in, you agree to our{" "}
              </Text>
              {/* new line */}
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Terms & Conditions
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "78%",
                paddingRight: 16,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "grey", fontSize: 16 }}>and </Text>
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Privacy Policy
              </Text>
            </View>
            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Signup"
              Press={() => {
                alert("Accoutn created");
                props.navigation.navigate("Login");
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Already have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.replace("/Login")}>
                <Text
                  style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
