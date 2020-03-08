import React, { Component } from "react";
import { createSwitchNavigator, NavigationActions, createAppContainer } from 'react-navigation';
import Home from "./screens/Home";
import PlanYourDive from "./screens/PlanYourDive";
import Buddies from "./screens/Buddies";
import Submit from "./screens/Submit";
import Auth from "./screens/Auth";
import Contacts from "./screens/Contacts";
import ActiveDive from "./screens/ActiveDive";
import Profile from "./screens/Profile";

import { Auth as AmplifyAuth } from 'aws-amplify'

const AppNavigator= createSwitchNavigator(
{
  Home: {
    navigationOptions: {
      headerShown: false,
    },
   screen: Home
  },
  Profile: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Profile
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
  Contacts: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Contacts
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
  },
  ActiveDive: {
    navigationOptions: {
      headerShown: false,
    },
    screen: ActiveDive
  }
}
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
    this.checkAuth()
    return (
      <AppContainer
        ref={nav => this.navigator = nav}
       onNavigationStateChange={this.checkAuth}
    />
    )
  }
}
