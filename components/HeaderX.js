import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LogoHeader from "./LogoHeader";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <LogoHeader style={styles.logoHeader}></LogoHeader>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,178,204,1)"
  },
  group: {
    width: 400,
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgba(31,178,204,1)",
    marginTop: 40,
  },
  logoHeader: {
    width: 41,
    height: 44,
    marginTop: 6,
    marginLeft: 159
  }
});

export default HeaderX;
