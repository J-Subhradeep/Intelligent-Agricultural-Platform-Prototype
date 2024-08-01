import React, { useState, useRef } from "react";
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

import Background from "../components/Background";

const AssignTask = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(windowWidth)).current;

  const [tasks, setTasks] = useState([
    {
      taskName: "Submit crop yield report",
      taskDescription: "Submit crop yield report for Zone-A",
      taskStatus: "Pending",
      taskedTo: "John Doe",
      deadline: "2024-08-01",
    },
    {
      taskName: "Seeds collection report",
      taskDescription: "Submit the report for total seeds collected today",
      taskStatus: "Pending",
      taskedTo: "John Smith",
      deadline: "2024-08-01",
    },
    {
      taskName: "Disease check",
      taskDescription: "Check if the zone b plants have any disease or not",
      taskStatus: "Pending",
      taskedTo: "Jane Doe",
      deadline: "2024-08-02",
    },
    {
      taskName: "Zone-A soil report",
      taskDescription: "Submit the soil report for Zone-A",
      taskStatus: "Pending",
      taskedTo: "Jane Smith",
      deadline: "2024-08-03",
    },
    {
      taskName: "Task 5",
      taskDescription: "Description of Task 5",
      taskStatus: "Completed",
      taskedTo: "John Doe",
      deadline: "2021-08-05",
    },
    {
      taskName: "Task 6",
      taskDescription: "Description of Task 5",
      taskStatus: "Completed",
      taskedTo: "John Doe",
      deadline: "2021-08-05",
    },
  ]);

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
        <ScrollView
          contentContainerStyle={{
            paddingTop: 30,
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingBottom: 20,
          }}
        >
          {tasks.map((task, index) => (
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
                    }}
                  >
                    {task.taskName}
                  </Text>
                  <Text style={{ color: "grey" }}>{task.taskDescription}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    let newTasks = [...tasks];
                    newTasks[index].taskStatus =
                      newTasks[index].taskStatus === "Pending"
                        ? "Completed"
                        : "Pending";
                    setTasks(newTasks);
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor:
                        task.taskStatus === "Pending" ? "white" : "green",
                    }}
                  ></View>
                </TouchableOpacity>
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
                  <Text style={{ color: "grey", fontSize: 13 }}>Tasked by</Text>
                  <Text
                    style={{ color: "grey", fontSize: 13, fontWeight: "bold" }}
                  >
                    {task.taskedTo}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "grey", fontSize: 13 }}>Deadline</Text>
                  <Text
                    style={{ color: "grey", fontSize: 13, fontWeight: "bold" }}
                  >
                    {task.deadline}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
    </Background>
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
