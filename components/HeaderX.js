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
    backgroundColor: "rgba(31,178,204,1)",
  },
  group: {
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgba(31,178,204,1)",
    marginTop: 0,
  },
  logoHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HeaderX;
