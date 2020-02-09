import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import Home from "./screens/Home";
import PlanYourDive from "./screens/PlanYourDive";
import Buddies from "./screens/Buddies";
import Submit from "./screens/Submit";

const AppNavigator= createStackNavigator(
{
  Home: {
    navigationOptions: {
      headerShown: false,
    },
   screen: Home
  },
  PlanYourDive: {
    navigationOptions: {
      headerShown: false,
    },
    screen: PlanYourDive
  },
  Buddies: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Buddies
  },
  Submit: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Submit
}
},
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}