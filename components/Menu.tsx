import {
  Text,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useEffect, useState } from "react";
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web" ? true : false;

const { width, height } = Dimensions.get("window");

interface MenuProps {
  onClick: () => void;
}

export default function Menu({ onClick }: MenuProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const UserExist = isWeb? localStorage.getItem("user"):await AsyncStorage.getItem("user");
      const byUser = UserExist ? JSON.parse(UserExist) : {};
      // await AsyncStorage.removeItem('user');
      if (byUser.name) {
        onClick();
      }
    };

    checkUser();
  }, []);

  const clickRegister = async () => {
    setLoading(true);

    if (name.length === 0 || email.length === 0) {
      Alert.alert("Name or email is required!");
      setLoading(false);
      return;
    }

    const response = await axios.post(
      "http://localhost:21029/api/user",
      { name, email, point: "0", level: "0" }
    );
    if (response.data) {
      console.log(response.data)
      isWeb? localStorage.setItem("user",
        JSON.stringify({ ...response.data.user })):
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.user })
      );

      setLoading(false);

      return;
    } else {
      console.log(response);
      setLoading(false);
    }
    onClick();
  };
  return (
    <ThemedView style={styles.menu}>
      <Image
        source={require("@/assets/images/icon_t.png")}
        style={styles.reactLogo}
      />
      <ThemedText style={styles.text}>Digite seu nome:</ThemedText>
      <TextInput
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.input}
      />
      <ThemedText style={styles.text}>Digite seu Email:</ThemedText>
      <TextInput
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <ThemedView style={styles.button}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Button title="Iniciar Jogo" onPress={clickRegister} />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 35,
    zIndex: 100,
    backgroundColor: "#292929",
  },
  button: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 80,
    paddingRight: 80,
    fontSize: 32,
    cursor: "pointer",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 60,
  },
  input: {
    fontSize: 16,
    borderRadius: 15,
    shadowColor: "#000",
    backgroundColor: "#fff",
    width: width * 0.65,
    height: 35,
    margin: 15,
    padding: 10,
  },
  text: {
    color: "#ffff",
  },
  reactLogo: {
    width: width * 0.35,
    height: height * 0.15,
    margin: 30,
  },
});
