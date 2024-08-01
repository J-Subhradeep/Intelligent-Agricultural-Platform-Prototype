import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearUserDetails = async () => {
  try {
    await AsyncStorage.removeItem("userDetails");
    console.log("User details cleared");
    router.replace("/");
  } catch (error) {
    console.error("Error clearing user details", error);
  }
};
