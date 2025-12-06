import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddHabitOrTask from "../screens/AddHabitOrTask";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

const RootStack = () => {
  const user = useSelector((state) => state.auth.value.email);
  const localId = useSelector((state) => state.auth.value.localId);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="mainTabs" component={TabNavigator} />
          <Stack.Screen name="addHabitOrTask" component={AddHabitOrTask} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
export default RootStack;
