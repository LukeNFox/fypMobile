import React, { Component } from "react";
import {StyleSheet, View, Button, TouchableOpacity, Text, ScrollView} from "react-native";
import HeaderX from "../components/HeaderX";

export default class Home extends Component {

  render() {
      const { navigate } = this.props.navigation;
    return (
    <View style={styles.container} >
      <HeaderX/>
        <View style={ButtonStyles.container}>
        <TouchableOpacity
            onPress={() => navigate('PlanYourDive')}
            style={[styles.materialButtonDark2,ButtonStyles.buttons, this.props.style]}>
            <Text style={ButtonStyles.caption}>Plan A Dive</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
  }
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

