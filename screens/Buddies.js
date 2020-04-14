import React, {Component} from "react";
import {View, Text, ScrollView, StatusBar, Button, Picker} from "react-native";
import {styles} from './styles'

import HeaderX from "../components/HeaderX";
import Svg, {Ellipse} from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import AsyncStorage from "@react-native-community/async-storage";

const Form = t.form.Form;

let options = [];
let storedBuddies = null;

const Buddy = t.struct({
    name: t.String,
    phoneNumber: t.Number,
    gasBlend: t.String,
    exposureSuit: t.String,
    breathingApparatus: t.maybe(t.String),
    qualifications: t.maybe(t.String),
    medicalHistory: t.maybe(t.String)
});


export default class Buddies extends Component {
    constructor(props) {
        super(props);
        this.initialiseStorage()
        this.updatePicker()
        this.state = {
            options: [],
            name: null,
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
        const value = await AsyncStorage.getItem('currentBuddy')
        console.log("current Buddy", value)
        if (value) {
            this.setState({'buddy': JSON.parse(value)});
        }
    }

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            if (storedBuddies != null) {
                storedBuddies.forEach(
                    function (item, index, object) {
                        if (item.name == value.name) {
                            object.splice(index, 1);
                            return
                        }
                    })

            }
            storedBuddies.push(value)
            AsyncStorage.setItem('storedBuddies', JSON.stringify(storedBuddies));

            AsyncStorage.setItem('currentBuddy', JSON.stringify(value));
            this.setState({'buddy': value});
            this.props.navigation.navigate('Contacts')
        }
    }

    updateBuddy = async (name) => {
        this.setState({name:options[name]})
        let buddyInfo = null;
        if(storedBuddies != null) {
            await storedBuddies.forEach(
                function (stored) {
                    if (stored.name == options[name]) {
                        buddyInfo = stored;
                    }
                })
        }
        console.log(buddyInfo)
        this.setState({ buddy: buddyInfo})
    }

    initialiseStorage = async () => {
        let result = await AsyncStorage.getItem("storedBuddies");
        if (storedBuddies != null) {
            storedBuddies = JSON.parse(result)
        } else {
            storedBuddies = new Array();
        }
    }

    updatePicker = async () => {
        options = ["Create a new Buddy"];
        await storedBuddies.forEach(function (item) {
            options.push(item.name)
        })
        this.setState({options: options});
    }


    render() {
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

                                        <Text>Select a template: </Text>
                                        <Picker
                                            selectedValue={this.state.name}
                                            onValueChange={this.updateBuddy}>
                                            {Object.keys(options).map((key) => {
                                                return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                                            })}
                                        </Picker>
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
