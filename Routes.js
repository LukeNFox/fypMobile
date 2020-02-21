import React, { Component } from "react";
import { createSwitchNavigator, NavigationActions, createAppContainer } from 'react-navigation';
import Home from "./screens/Home";
import PlanYourDive from "./screens/PlanYourDive";
import Buddies from "./screens/Buddies";
import Submit from "./screens/Submit";
import Auth from "./screens/Auth";

import { Auth as AmplifyAuth } from 'aws-amplify'

import { Hub } from 'aws-amplify';


const AppNavigator= createSwitchNavigator(
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
},
  Auth: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Auth
  }
},
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
    } catch (err) {
      this.navigator.dispatch(
          NavigationActions.navigate({routeName: 'Auth'})
      )
    }
  }

   render() {
    return (
      <AppContainer
        ref={nav => this.navigator = nav}
        onNavigationStateChange={this.checkAuth}
    />
    )
  }
}
