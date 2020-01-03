import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function LogoHeader(props) {
  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.text5Stack}>
        <Text style={styles.text5}>SoS</Text>
        <View style={styles.rect8}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  text5: {
    top: 0,
    left: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 36
  },
  rect8: {
    top: 38,
    left: 0,
    backgroundColor: "rgba(5,5,5,1)",
    position: "absolute",
    right: 5,
    bottom: 63
  },
  text5Stack: {
    flex: 1,
    marginBottom: -62,
    marginRight: -24
  }
});

export default LogoHeader;
