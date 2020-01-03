import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from 'react-navigation';

function PlanADiveButton(props) {
  return (
    <TouchableOpacity 
    onPress={() => props.navigation.navigate('PlanYourDive')}
    style={[styles.container, props.style]}>
      <Text style={styles.caption}>{props.text1 || "Plan A Dive"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default withNavigation(PlanADiveButton);
