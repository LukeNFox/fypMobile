import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar} from "react-native";
import {SCREEN_WIDTH, styles} from './styles'
import AsyncStorage from '@react-native-community/async-storage';

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import Maps from "../components/Maps";

const Form = t.form.Form;

export default class PlanYourDive extends Component {

  state = {
    dive: {
      diveName: null,
      location: null,
      maxDepth: null,
      entryTime: null,
      exitTime: null,
      totalBottomTime: null,
      visibility: null,
      environment: null,
      seaConditions: null,
      current: null,
      diveDifficulty: null,
      parking: null,
      nearestHyperbaricChamber: null,
      DANPhoneNumber: null,
      nearestHemsUnit: null,
      emsPhoneNumber: null,
      coastguardPhoneNumber: null
    }
  }

  getInitialState() {
    return {
        diveName: this.state.dive.diveName,
        location:  this.state.dive.location,
        maxDepth: this.state.dive.maxDepth,
        entryTime:  null,
        exitTime: null,
        totalBottomTime:  this.state.dive.totalBottomTime,
        visibility:  this.state.dive.visibility,
        environment:  this.state.dive.environment,
        seaConditions:  this.state.dive.seaConditions,
        current:  this.state.dive.current,
        diveDifficulty:  this.state.dive.diveDifficulty,
        parking:  this.state.dive.parking,
        nearestHyperbaricChamber: this.state.dive.nearestHyperbaricChamber,
        nearestHemsUnit:  this.state.dive.nearestHemsUnit,
        DANPhoneNumber: this.state.dive.DANPhoneNumber,
        emsPhoneNumber: this.state.dive.emsPhoneNumber,
        coastguardPhoneNumber:  this.state.dive.coastguardPhoneNumber
    };
  }

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('dive')
    console.log("stored Dive",value)
    const lat = await AsyncStorage.getItem('latitude')
    console.log("stored lat",lat)
    const longitude = await AsyncStorage.getItem('longitude')
    console.log("stored longitude",longitude)
    this.setState({ 'dive': JSON.parse(value) });
  }

  handlePress = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      console.log("Handle Press",value)
      AsyncStorage.setItem('dive', JSON.stringify(value));
      this.setState({ 'dive': value });
      this.props.navigation.navigate('Buddies')
    }
  }

  render() {
    this.getInitialState();
    const { navigate } = this.props.navigation;
    console.log("navigate to plan a dive screen")
  return (
    <View style={styles.root}>
      <HeaderX icon2Name="power"></HeaderX>
      <View style={styles.bodyStack}>
        <View style={styles.body}>
          <Text style={styles.pageName}>Plan Your Dive</Text>
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 859.43 890.30" style={styles.ellipse}>
              <Ellipse
                strokeWidth={1}
                fill="rgba(255,255,255,1)"
                cx={430}
                cy={445}
                rx={429}
                ry={445}
              ></Ellipse>
            </Svg>
          </View>
            <View style={styles.scrollArea}>
              <ScrollView
                horizontal={false}
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
              >
                <View>
                  <Maps/>
                  <View style={[styles.diveInformation, {top: SCREEN_WIDTH - 150}]}>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={Dive}
                        value={this.getInitialState()}
                        options={options}
                    />

                  </View>
                </View>
              </ScrollView>
            </View>
        </View>
        </View>
      <View style={styles.buttonFooter}>
        <ButtonFooter onPress={this.handlePress}  goBackTo={'Home'} textForward={"Confirm Dive"} textBack={"Cancel"} navigation={this.props.navigation}></ButtonFooter>
      </View>
      <StatusBar
        hidden={false}
      ></StatusBar>
    </View>
  );
  }
};


var environment = t.enums({
  Fresh: 'Fresh',
  Salt: 'Salt',
  Shore: 'Shore',
  Boat: 'Boat',
  Deep: 'Deep',
  Night: 'Night'
});

var difficulty = t.enums({
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard'
})

var strength = t.enums({
  Calm: 'Calm',
  Moderate: 'Moderate',
  Rough: 'Rough'
})

var current = t.enums({
  None: 'None',
  Moderate: 'Moderate',
  Strong: 'Strong'
})

const Dive = t.struct({
  diveName:  t.maybe(t.String),
  location:  t.maybe(t.String),
  maxDepth: t.maybe(t.Integer),
  entryTime:  t.maybe(t.Date),
  exitTime:  t.maybe(t.Date),
  totalBottomTime:  t.maybe(t.Number),
  visibility:  t.maybe(t.Number),
  environment:  t.maybe(environment),
  seaConditions:  t.maybe(strength),
  current:  t.maybe(current),
  diveDifficulty:  t.maybe(difficulty),
  parking:  t.maybe(difficulty),
  nearestHyperbaricChamber:  t.maybe(t.String),
  nearestHemsUnit:  t.maybe(t.String),
  emsPhoneNumber:  t.maybe(t.Number),
  coastguardPhoneNumber:  t.maybe(t.Number)
});

var options = {
  fields: {
    entryTime: {
      mode: 'time' // display the Date field as a DatePickerAndroid
    },
    exitTime: {
      mode: 'time' // display the Date field as a DatePickerAndroid
    }
  }
};

