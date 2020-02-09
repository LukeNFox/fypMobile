import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, StatusBar, Button } from "react-native";

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';

const Form = t.form.Form;


const Buddy = t.struct({
    name : t.maybe(t.String),
    phoneNumber : t.maybe(t.String),
    gasBlend: t.maybe(t.String),
    exposureSuit : t.maybe(t.String),
    breathingApparatus : t.maybe(t.String),
    qualifications: t.maybe(t.String),
    medicalHistory: t.maybe(t.String)
});


export default class Buddies extends Component {

  handlePress = () => {
    const value = this._form.getValue(); // use that ref to get the form value
      if (value) {
      // this.props.navigation.state.params.buddies.push(value);
      let valueString = JSON.stringify(value);
      let valueObject = JSON.parse(valueString)
      valueObject.diveId = null;
      this.props.navigation.state.params.buddies = valueObject;
      console.log(this.props.navigation.state.params)
      this.props.navigation.navigate('Submit', {diveInformation: this.props.navigation.state.params.diveInformation, buddies:this.props.navigation.state.params.buddies})
    }
  }


  render() {
    return (
        <View style={styles.root}>
          <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
          <View style={styles.bodyStack}>
            <View style={styles.body}>
              <Text style={styles.pageName}>Who are you diving with?</Text>
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
                        <Text style={styles.expanded}></Text>
                        <Form
                            ref={c => this._form = c} // assign a ref
                            type={Buddy}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
            <ButtonFooter onPress={this.handlePress} style={styles.buttonFooter} goBackTo={'PlanYourDive'}
                          textForward={"Confirmation"} textBack={"Go Back"}
                          navigation={this.props.navigation}></ButtonFooter>
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
    height: 550,
    position: "absolute",
    right: 250,
    bottom: 300
  },
  scrollArea_contentContainerStyle: {
    width: 358,
    height: 2750,
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
