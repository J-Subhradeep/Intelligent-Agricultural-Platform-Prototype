import React from "react";
import { TextInput } from "react-native";
import { darkGreen } from "./Constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 5,
        color: darkGreen,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "78%",
        fontSize: 18,
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 10,
      }}
      placeholderTextColor={darkGreen}
    ></TextInput>
  );
};

export default Field;
