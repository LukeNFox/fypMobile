import React, { Component } from "react";
import {StyleSheet, View, Button, TouchableOpacity, Text} from "react-native";
import HeaderX from "../components/HeaderX";

export default class Home extends Component {

  render() {
      const { navigate } = this.props.navigation;
    return (
    <View style={styles.container} >
      <HeaderX style={styles.headerX}></HeaderX>
        <TouchableOpacity
            onPress={() => navigate('PlanYourDive', {diveInformation:diveInfo,buddies:buddies})}
            style={[styles.materialButtonDark2,ButtonStyles.container, this.props.style]}>
            <Text style={ButtonStyles.caption}>Plan A Dive</Text>
        </TouchableOpacity>
    </View>
  );
  }
}

var diveInfo = {
    id: null,
    name : null,
    location : null,
    maxDepth : null,
    entryTime : null,
    totalBottomTime : null,
    visibility : null,
    environment : null,
    seaConditions : null ,
    current : null,
    diveDifficulty : null,
    parking : null,
    nearestHyperbaricChamber :  null,
    nearestHemsUnit : null,
    emsPhoneNumber : null,
    coastguardPhoneNumber : null
}
var buddies = {
    diveId: null,
    name: null,
    phoneNumber: null,
    gasBlend: null,
    exposureSuit: null,
    breathingApparatus: null,
    qualifications: null,
    medicalHistory: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgba(255,255,255,1)"
  },
  materialButtonDark2: {
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 265,
    marginLeft: 130
  }
});

const ButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        width: 120,
        height: 50,
        borderRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 5
    },
    caption: {
        color: "#fff",
        fontSize: 14
    }
});

