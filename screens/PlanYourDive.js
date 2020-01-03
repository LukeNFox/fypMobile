import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, StatusBar, Button } from "react-native";

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import LabelTextbox from "../components/LabelTextbox";
import ButtonFooter from "../components/ButtonFooter";

export default class PlanYourDive extends Component {

  
  render() {
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
                    <Text style={styles.expanded}>Dive</Text>
                    <LabelTextbox
                      text1=""
                      style={styles.LabelTextbox}
                    ></LabelTextbox>
                    <LabelTextbox
                      text1="Total Bottom Time"
                      textInput1="minutes"
                      style={styles.LabelTextbox}
                    ></LabelTextbox>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <ButtonFooter style={styles.buttonFooter} navigation={this.props.navigation}></ButtonFooter>
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