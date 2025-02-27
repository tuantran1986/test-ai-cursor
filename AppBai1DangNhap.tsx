// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { useState } from "react";
import "react-native-get-random-values"; // Import này phải đặt trước : uuid
import { v4 as uuidv4 } from "uuid";

export default function AppBai1DangNhap() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // const authorText = request.headers.get("authorization");
      const authorText = btoa(username + ":" + password); // base64

      let headers = {
        Authorization: `Basic ${authorText}` || "", // Authorization: "Basic dHVhbnBhOkVuYW9AMjAyNA==",
        clientTime: new Date().toISOString(), // clientTime: "2025-02-26T08:35:43.243Z",
        clientMessageId: `${uuidv4()}`, // clientMessageId: "8beb0444-6a22-44b2-9ee2-030946896935",
        "Content-Type": "application/json",
        Accept: "*/*",
      };

      const responseToken = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_API_URL_AUTH}/auth/generate-token`,
        "http://10.100.30.10:32020/api/v1.0/auth/generate-token",
        {
          method: "POST",
          headers: headers,
        }
      );

      const data = await responseToken.json();
      console.log("_________ data = responseToken: ", data);

      if (responseToken.ok) {
        Alert.alert("Success", "Login successful!");
        // You can store the token here using AsyncStorage
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG NHẬP</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
