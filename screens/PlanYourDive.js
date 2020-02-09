import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, StatusBar, Button } from "react-native";

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';

const Form = t.form.Form;
import DateTimePicker from '@react-native-community/datetimepicker';

var environment = t.enums({
  A: 'Fresh',
  B: 'Salt',
  C: 'Shore',
  D: 'Boat',
  E: 'Deep',
  F: 'Night'
});

var difficulty = t.enums({
  E: 'Easy',
  M: 'Medium',
  H: 'Hard'
})

var strength = t.enums({
  C: 'Calm',
  M: 'Moderate',
  R: 'Rough'
})

var current = t.enums({
  N: 'None',
  M: 'Moderate',
  S: 'Strong'
})

const Dive = t.struct({
  name:  t.String,
  location:  t.maybe(t.String),

  maxDepth: t.maybe(t.Integer),
  entryTime:  t.maybe(t.Date),
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

export default class PlanYourDive extends Component {

  handlePress = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      this.props.navigation.state.params.diveInformation = value;
      console.log('pyd: ',this.props.navigation.state.params.diveInformation)
      this.props.navigation.navigate('Buddies', {diveInformation: this.props.navigation.state.params.diveInformation, buddies: this.props.navigation.state.params.buddies})
      console.log('value: ', value);
    }
  }
  
  render() {
    const { navigate } = this.props.navigation;
    console.log("navigate to plan a dive screen")
  return (
    <View style={styles.root}>
      <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
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
            <View style={styles.scrollArea}>
              <ScrollView
                horizontal={false}
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
              >
                <View style={styles.diveInformationStack}>

                  <View style={styles.diveInformation}>

                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={Dive}
                        options={options}
                    />

                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <ButtonFooter onPress={this.handlePress} style={styles.buttonFooter} goBackTo={'Home'} textForward={"Go to Buddies"} textBack={"Cancel"} navigation={this.props.navigation}></ButtonFooter>
      </View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(0,0,0,0)"
      ></StatusBar>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: "rgb(255,255,255)",
  },
  body: {
    top: 0,
    backgroundColor: "#1fb2cc",
    position: "absolute",
    width: 400
  },
  pageName: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 400,
    marginLeft: 30,
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 859,
    height: 890,
    alignItems: "center",
  },
  scrollArea: {
    left: 250,
    height: 500,
    position: "absolute",
    right: 250,
    top: 30
  },
  scrollArea_contentContainerStyle: {
    width: 358,
    height: 1500,
  },
  diveInformation: {
    top: 0,
    left: 0,
    height: 153,
    position: "absolute",
    right: 0
  },
  expanded: {
    color: "#121212",
    fontSize: 18
  },
  LabelTextbox: {
    width: 320,
    height: 80,
  },
  diveInformationStack: {
    height: 562,
    marginTop: 18,
    marginLeft: 24,
    marginRight: 24
  },
  ellipseStack: {
    height: 890,
    marginTop: 12,
    marginLeft: -249,
    marginRight: -250
  },
  buttonFooter: {
    bottom: 0,
    left: 1,
    width: 360,
    height: 80,
    position: "absolute"
  },
  bodyStack: {
    width: 361,
    flex: 1,
    marginBottom: -3
  }
});
