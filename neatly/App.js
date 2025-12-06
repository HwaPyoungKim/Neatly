import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context"; // 👈 IMPORTANTE
import RootStack from "./navigation/RootStack";
import { store } from "./app/store/store";
import { SQLiteProvider } from "expo-sqlite";
import { initDatabase } from "./app/database";

export default function App() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoaded(true);
    };
    checkSession();
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
    <SafeAreaProvider>
      <SQLiteProvider databaseName="neatly.db" onInit={initDatabase}>
        <Provider store={store}>
          <RootStack />
          <StatusBar style="auto" />
        </Provider>
      </SQLiteProvider>
    </SafeAreaProvider>
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
