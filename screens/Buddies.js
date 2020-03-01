import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar, Button } from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import AsyncStorage from "@react-native-community/async-storage";

const Form = t.form.Form;


const Buddy = t.struct({
    name : t.maybe(t.String),
    phoneNumber : t.maybe(t.String),
    gasBlend: t.maybe(t.String),
    exposureSuit : t.maybe(t.String),
    breathingApparatus : t.maybe(t.String),
    qualifications: t.maybe(t.String),
    medicalHistory: t.maybe(t.String)
});


export default class Buddies extends Component {


    state = {
         buddy: {
            name: null,
            phoneNumber: null,
            gasBlend: null,
            exposureSuit: null,
            breathingApparatus: null,
            qualifications: null,
            medicalHistory: null
      }
    }

    getInitialState() {
        return {
            name: this.state.buddy.name,
            phoneNumber: this.state.buddy.phoneNumber,
            gasBlend: this.state.buddy.gasBlend,
            exposureSuit: this.state.buddy.exposureSuit,
            breathingApparatus: this.state.buddy.breathingApparatus,
            qualifications: this.state.buddy.qualifications,
            medicalHistory: this.state.buddy.medicalHistory
        };
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('buddy')
        console.log("stored Buddy",value)
        this.setState({ 'buddy': JSON.parse(value) });
    }

  handlePress = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
        console.log("Handle Press",value)
        AsyncStorage.setItem('buddy', JSON.stringify(value));
        this.setState({ 'buddy': value });
        this.props.navigation.navigate('Contacts')
    }
  }


  render() {
      this.getInitialState()
      console.log("navigate to plan a Buddy screen")
      return (
        <View style={styles.root}>
          <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
          <View style={styles.bodyStack}>
            <View style={styles.body}>
              <Text style={styles.pageName}>Who are you diving with?</Text>
              <View style={styles.ellipseStack}>
                <Svg viewBox="0 0 859.43 890.30" style={styles.ellipse}>
                  <Ellipse
                      strokeWidth={1}
                      fill="rgba(255,255,255,1)"
                      cx={430}
                      cy={445}
                      rx={429}
                      ry={445}
                  ></Ellipse>
                </Svg>
              </View>
                <View style={styles.scrollArea}>
                  <ScrollView
                      horizontal={false}
                      contentContainerStyle={styles.scrollArea_contentContainerStyle}
                  >
                    <View>
                      <View style={styles.diveInformation}>
                        <Text style={styles.expanded}></Text>
                        <Form
                            ref={c => this._form = c} // assign a ref
                            type={Buddy}
                            value={this.getInitialState()}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
          </View>
          <ButtonFooter onPress={this.handlePress} style={styles.buttonFooter} goBackTo={'PlanYourDive'}
                        textForward={"Confirm Buddies"} textBack={"Go Back"}
                        navigation={this.props.navigation}></ButtonFooter>
          <StatusBar
              hidden={false}
          ></StatusBar>
        </View>
    );
  }

};
