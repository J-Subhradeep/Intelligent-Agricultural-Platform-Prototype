import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { clearUserDetails } from "@/components/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../components/Background";
import { Link } from "expo-router";

const AssignTask = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(windowWidth)).current;

  const [tasks, setTasks] = useState();

  const getUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      return userDetails ? JSON.parse(userDetails) : null;
    } catch (error) {
      console.error("Error retrieving user details", error);
    }
  };

  const fetchTasksPending = async (id, token) => {
    try {
      const response = await fetch(
        "https://api.web-project.in/search-n-analytics/task/get-pending-tasks?workerId=" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    getUserDetails().then((userDetails) => {
      if (userDetails) {
        fetchTasksPending(userDetails.userId, userDetails.token);
      }
    });
  }, []);


  const toggleSidebar = () => {
    if (isSidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: windowWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: windowWidth * 0.3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  
  function formatDeadline(isoString) {
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }
  
  return (
    // <Background>
    <ScrollView>
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
            Assign Task
          </Text>

          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={toggleSidebar}
          >
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
            paddingTop: 30,
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            width: windowWidth,
            minHeight: windowHeight,
            borderTopRightRadius: 50,
            paddingBottom: 20,
          }}
        >
          {tasks && tasks.map((task, index) => (
            <View
              key={index}
              style={{
                width: windowWidth - 40,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 20,
                marginVertical: 10,
                padding: 20,
              }}
            >

              <Link href={`/Report?id=${task.id}`}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine:
                          task.taskStatus === "Completed"
                            ? "line-through"
                            : "none",
                        flexWrap: "wrap",
                        maxWidth: windowWidth - 120,
                      }}
                      ellipsizeMode="tail"
                    >
                      {task.title}
                    </Text>
                    <Text style={{ color: "grey" }}>{task.description}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#dedede",
                    borderBottomWidth: 1,
                    width: windowWidth - 80,
                    marginVertical: 10,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 2,
                  }}
                >
                  <View>
                    <Text style={{ color: "grey", fontSize: 13 }}>Deadline</Text>
                    <Text
                      style={{ color: "grey", fontSize: 13, fontWeight: "bold" }}
                    >
                      {/* deadline looks like 2024-08-18T21:58:02+05:30
                        make it like 2024-08-18 9:58 PM
                      */}

{formatDeadline(task.deadline)}

                    </Text>
                  </View>
                </View>
              </Link>
            </View>
          ))}
        </View>
      </View>

      {isSidebarVisible && (
        <Animated.View
          style={[styles.sidebarContainer, { right: sidebarAnim }]}
        >
          <View style={styles.sidebar}>
            <TouchableOpacity
              onPress={toggleSidebar}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearUserDetails}>
              <Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
            {/* Add additional sidebar options here */}
          </View>
        </Animated.View>
      )}
    </ScrollView>
    // </Background>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    position: "absolute",
    width: "70%",
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 1000,
  },
  sidebar: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  closeText: {
    fontSize: 16,
    color: "red",
  },
  sidebarText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default AssignTask;
