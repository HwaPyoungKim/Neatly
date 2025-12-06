import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // 👈 IMPORTANTE

import HomeScreen from "../screens/HomeScreen";
import FinanceScreen from "../screens/FinanceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS } from "../theme/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 8,
            height: 60 + insets.bottom,
          },
        ],

        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "finance":
              iconName = focused ? "wallet" : "wallet-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={focused ? 27 : 24}
                color={focused ? COLORS.primary : COLORS.placeholder}
              />

              <Animated.Text
                style={[
                  styles.label,
                  {
                    opacity: focused ? 1 : 0.5,
                    color: focused ? COLORS.primary : COLORS.placeholder,
                  },
                ]}
                numberOfLines={1}
              >
                {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
              </Animated.Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="finance" component={FinanceScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
});
