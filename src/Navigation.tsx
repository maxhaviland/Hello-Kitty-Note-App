import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, NoteScreen } from "./screens";

const { Navigator, Screen } = createStackNavigator();

type Screen = {
  component: React.ComponentType<any>;
  name: string;
};

export const Navigation = () => {
  const INITIAL_ROUTE_NAME: string = "HomeScreen";
  const options = { headerTransparent: true, headerTitle: "" };
  const screens: Screen[] = [
    {
      component: HomeScreen,
      name: "HomeScreen",
    },
    {
      component: NoteScreen,
      name: "NoteScreen",
    },
  ];

  const screenList = (screen: Screen) => (
    <Screen
      options={options}
      key={screen.name}
      component={screen.component}
      name={screen.name}
    />
  );

  return (
    <NavigationContainer>
      <Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        {screens.map(screenList)}
      </Navigator>
    </NavigationContainer>
  );
};
