import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import HeaderX from "../components/HeaderX";
import PlanADiveButton from "../components/PlanADiveButton";


export default class Home extends Component {

  render() {
    return (
    <View style={styles.container} >
      <HeaderX style={styles.headerX}></HeaderX>
      <PlanADiveButton
        text1="Plan A dive"
        style={styles.materialButtonDark2}
         />
    </View>
  );
  }
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

