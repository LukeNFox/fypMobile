import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar, Button } from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';

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

  handlePress = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      // this.props.navigation.state.params.buddies.push(value);
      let valueString = JSON.stringify(value);
      let valueObject = JSON.parse(valueString)
      valueObject.diveId = null;
      this.props.navigation.state.params.buddies = valueObject;
      console.log(this.props.navigation.state.params)
      this.props.navigation.navigate('Submit', {
        diveInformation: this.props.navigation.state.params.diveInformation,
        buddies: this.props.navigation.state.params.buddies
      })
    }
  }


  render() {
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
                <View style={styles.scrollArea}>
                  <ScrollView
                      horizontal={false}
                      contentContainerStyle={styles.scrollArea_contentContainerStyle}
                  >
                    <View style={styles.diveInformationStack}>

                      <View style={styles.diveInformation}>
                        <Text style={styles.expanded}></Text>
                        <Form
                            ref={c => this._form = c} // assign a ref
                            type={Buddy}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
          <ButtonFooter onPress={this.handlePress} style={styles.buttonFooter} goBackTo={'PlanYourDive'}
                        textForward={"Confirmation"} textBack={"Go Back"}
                        navigation={this.props.navigation}></ButtonFooter>
          <StatusBar
              hidden={false}
          ></StatusBar>
        </View>
    );
  }

};
