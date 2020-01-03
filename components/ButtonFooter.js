import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialButtonLight from "./MaterialButtonLight";
import MaterialButtonDark from "./MaterialButtonDark";

function ButtonFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>
        <View style={styles.materialButtonLightRow}>
          <MaterialButtonLight
            text1="Cancel"
            style={styles.materialButtonLight}
            onPress={() => this.props.navigation.navigation.navigate('Home')}
          ></MaterialButtonLight>
          <MaterialButtonDark
            text1="Start Dive"
            style={styles.materialButtonDark}
            onPress={() => this.props.navigation.navigate('Home')}
          ></MaterialButtonDark>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
  },
  rect: {
    width: 400,
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgba(31,178,204,1)",
    flexDirection: "row"
  },
  materialButtonLight: {
    width: 120,
    height: 50
  },
  materialButtonDark: {
    width: 120,
    height: 50,
    marginLeft: 50
  },
  materialButtonLightRow: {
    height: 50,
    flexDirection: "row",
    flex: 1,
    marginRight: 30,
    marginLeft: 40,
    marginTop: 15
  }
});

export default ButtonFooter;
