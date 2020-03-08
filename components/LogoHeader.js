import React, { Component } from "react";
import { StyleSheet, View, Text, Image} from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT, ratio } from '../screens/styles'


function LogoHeader(props) {
  return (
    <View style={[styles.root, props.style]}>
      <Image
          style={{
            width: SCREEN_WIDTH/2.5,
            height: SCREEN_WIDTH/5,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',}}
          source={require('../assets/scubasoslogo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
  },
});

export default LogoHeader;
