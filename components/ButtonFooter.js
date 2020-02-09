import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class ButtonFooter extends Component{
  constructor(props){
    super(props)
  }

  handlePress = () => {
    // Need to check to prevent null exception.
    this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
  }

  render() {
    return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.rect}>
            <View style={styles.materialButtonLightRow}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(this.props.goBackTo)}
                  style={[ButtonStyles.container,ButtonStyles.light, styles.materialButtonLight]}>
                <Text style={ButtonStyles.captionLight}>{this.props.textBack}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={this.handlePress}
                  style={[ButtonStyles.container,ButtonStyles.dark, styles.materialButtonDark]}>
                <Text style={ButtonStyles.captionDark}>{this.props.textForward}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}
const ButtonStyles = StyleSheet.create({
  container: {
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
  captionDark: {
    color: "#fff",
    fontSize: 14,
  },
  dark: {
    backgroundColor: "#212121",
  },
  light:{
    backgroundColor: "#CCCCCC",
  },
  captionLight: {
    color: "#FFFFFF",
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


