import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function LabelTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>{props.text1 || "Maximum Depth"}</Text>
      <TextInput
        placeholder={props.textInput1 || "meters"}
        style={styles.inputStyle}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  label: {
    color: "#000",
    paddingTop: 16,
    fontSize: 14,
    textAlign: "left"
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 16
  }
});

export default LabelTextbox;
