import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HideWithKeyboard from 'react-native-hide-with-keyboard';

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
        <HideWithKeyboard>
        <View style={[styles.container, this.props.style]}>
          <View style={styles.rect}>
            <View style={styles.materialButtonLightRow}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(this.props.goBackTo, this.props.navigation.state.params)}
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
        </HideWithKeyboard>
    );
  }
}
const ButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderRadius: 10,
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
  },
  rect: {
    height: 100,
    backgroundColor: "rgba(31,178,204,1)",
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
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20
  }
});


