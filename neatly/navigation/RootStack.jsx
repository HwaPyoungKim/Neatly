import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

const RootStack = () => {
  const user = useSelector((state) => state.auth.value.email);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootStack;
