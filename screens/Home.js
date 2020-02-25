import React, { Component } from "react";
import {StyleSheet, View, Button, TouchableOpacity, Text} from "react-native";
import HeaderX from "../components/HeaderX";

export default class Home extends Component {

  render() {
      const { navigate } = this.props.navigation;
    return (
    <View style={styles.container} >
      <HeaderX/>
        <View style={ButtonStyles.container}>
        <TouchableOpacity
            onPress={() => navigate('PlanYourDive', {diveInformation:diveInfo,buddies:buddies})}
            style={[styles.materialButtonDark2,ButtonStyles.buttons, this.props.style]}>
            <Text style={ButtonStyles.caption}>Plan A Dive</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*    onPress={() => navigate('Auth')}*/}
        {/*    style={[styles.materialButtonDark2,ButtonStyles.buttons, this.props.style]}>*/}
        {/*    <Text style={ButtonStyles.caption}>Login/Signup</Text>*/}
        {/*</TouchableOpacity>*/}
    </View>
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
      flex:1,
      flexDirection: 'column',
    backgroundColor: "rgba(255,255,255,1)"
  },
  materialButtonDark2: {
    width: 120,
    height: 50,
  }
});

const ButtonStyles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255,255,255,1)"
    },
    buttons: {
        backgroundColor: "#212121",
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "space-evenly",
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
    },
});

