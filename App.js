import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const { api_key } = require("./config.json");

export default function App() {
  const [weather, setWeather] = useState({
    cityName: "",
    temp: "",
    weather: "",
    description: "",
  });
  const [input, setInput] = useState("");

  const image = {
    Default: require("./assets/weather/default.png"),
    Clear: require("./assets/weather/clear.png"),
    Clouds: require("./assets/weather/cloud.png"),
    Thunderstorm: require("./assets/weather/thunderstorm.png"),
    Drizzle: require("./assets/weather/drizzle.png"),
    Rain: require("./assets/weather/rain.png"),
    Snow: require("./assets/weather/snow.png"),
    Atmosphere: require("./assets/weather/atmosphere.png"),
  };

  const search = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${api_key}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather({
          cityName: result.name,
          temp: result.main.temp,
          weather: result.weather[0].main,
          description: result.weather[0].description,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const inputHandle = (e) => {
    setInput(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.searchView}>
          <View style={styles.searchViewBlock}>
            <Ionicons name="location-sharp" size={40} color="black" />
          </View>
          <View style={[styles.searchViewBlock, { flex: 4 }]}>
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              onChangeText={inputHandle}
              value={input}
            ></TextInput>
          </View>
          <View style={styles.searchViewBlock}>
            <TouchableOpacity onPress={search}>
              <Ionicons name="search" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyView}>
          <Text style={styles.textPlace}>
            {weather.cityName || ""}
          </Text>
          <Image
            source={image[weather.weather || "Default"]}
            resizeMode="contain"
            style={{ marginVertical: 20, height: 250, width: "85%" }}
          />
          <Text style={styles.textDescription}>
            {weather.description || ""}
          </Text>
          <Text style={styles.textTemperature}>{weather.temp || "0"}°C</Text>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  searchView: {
    height: 120,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchViewBlock: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchInput: {
    height: 45,
    width: 265,
    borderRadius: 5,
    backgroundColor: "#e4e4e6",
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  bodyView: { flex: 1, alignItems: "center", justifyContent: "center" },
  textPlace: { fontSize: 34, fontWeight: "700" },
  textDescription: { fontSize: 24, fontStyle: "italic" },
  textTemperature: { fontSize: 30, fontWeight: "700" },
});
