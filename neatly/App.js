import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import RootStack from "./navigation/RootStack";
import { store } from "./app/store/store";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    // Simula la verificación del estado de autenticación
    const checkSession = async () => {
      // const userData = await AsyncStorage.getItem("user");
      // if (userData) {
      //   setIsLoggedIn(true);
      // }
      setLoaded(true);
    };
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <RootStack />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
