import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialButtonLight from "./MaterialButtonLight";

export default class ButtonFooter extends Component{
  constructor(props){
    super(props)
  }

  handleSubmit = () => {
    // Need to check to prevent null exception.
    this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
  }

  render() {
    return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.rect}>
            <View style={styles.materialButtonLightRow}>
              <MaterialButtonLight
                  text1="Cancel"
                  style={styles.materialButtonLight}
                  onPress={() => this.navigation.navigation.navigate('Home')}
              ></MaterialButtonLight>
              <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={[ButtonStyles.container, styles.materialButtonDark]}>
                <Text style={ButtonStyles.caption}>{"Start Dive"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}
const ButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
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
    fontSize: 14,
  }
});

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


