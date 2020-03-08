import React, {Component} from "react";
import {View, Text, ScrollView, StatusBar, Picker} from "react-native";
import {SCREEN_WIDTH, styles} from './styles'
import AsyncStorage from '@react-native-community/async-storage';

import HeaderX from "../components/HeaderX";
import Svg, {Ellipse} from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import Maps from "../components/Maps";

const Form = t.form.Form;

let options = [];
let storedDives = [];

export default class PlanYourDive extends Component {

    constructor(props) {
        super(props)
        this.initialiseStorage()
        this.updatePicker()
        this.state = {
            options: [],
            diveSite: null,
            dive: {
                diveSite: null,
                location: null,
                maxDepth: null,
                entryTime: null,
                exitTime: null,
                totalBottomTime: null,
                visibility: null,
                environment: null,
                seaConditions: null,
                current: null,
                diveDifficulty: null,
                parking: null,
                nearestHyperbaricChamber: null,
                DANPhoneNumber: null,
                nearestHemsUnit: null,
                emsPhoneNumber: null,
                coastguardPhoneNumber: null
            }
        }
    }

    getInitialState() {
        return {
            diveSite: this.state.dive.diveSite,
            location: this.state.dive.location,
            maxDepth: this.state.dive.maxDepth,
            entryTime: null,
            exitTime: null,
            totalBottomTime: this.state.dive.totalBottomTime,
            visibility: this.state.dive.visibility,
            environment: this.state.dive.environment,
            seaConditions: this.state.dive.seaConditions,
            current: this.state.dive.current,
            diveDifficulty: this.state.dive.diveDifficulty,
            parking: this.state.dive.parking,
            nearestHyperbaricChamber: this.state.dive.nearestHyperbaricChamber,
            nearestHemsUnit: this.state.dive.nearestHemsUnit,
            DANPhoneNumber: this.state.dive.DANPhoneNumber,
            emsPhoneNumber: this.state.dive.emsPhoneNumber,
            coastguardPhoneNumber: this.state.dive.coastguardPhoneNumber
        };
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('currentDive')
        console.log("current Dive from storage", value)
        const lat = await AsyncStorage.getItem('latitude')
        console.log("stored lat", lat)
        const longitude = await AsyncStorage.getItem('longitude')
        console.log("stored longitude", longitude)
        if (value) {
            this.setState({'dive': JSON.parse(value)});
        }
    }

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            console.log("Handle Press", value)
            if (storedDives != null) {
                storedDives.forEach(
                    function (item, index, object) {
                        if (item.diveSite == value.diveSite) {
                            object.splice(index, 1);
                            return
                        }
                    })

            }
            storedDives.push(value)
            AsyncStorage.setItem('storedDives', JSON.stringify(storedDives));

            AsyncStorage.setItem('currentDive', JSON.stringify(value));
            this.setState({'dive': value});
            this.props.navigation.navigate('Buddies')
        }
    }


    updateDive = async (diveSite) => {
        this.setState({diveSite: options[diveSite]})
        let diveInfo = null;
        if (storedDives != null) {
            await storedDives.forEach(
                function (dive) {
                    if (dive.diveSite == options[diveSite]) {
                        diveInfo = dive;
                    }
                })
        }
        console.log(diveInfo)
        this.setState({dive: diveInfo})
    }

    initialiseStorage = async () => {
        let result = await AsyncStorage.getItem("storedDives");
        if (storedDives != null) {
            storedDives = JSON.parse(result)
        } else {
            storedDives = new Array();
        }
    }

    updatePicker = async () => {
        options = ["Plan a new dive"];
        await storedDives.forEach(function (item) {
            options.push(item.diveSite)
        })
        this.setState({options: options});
    }

    render() {
        this.getInitialState()
        const {navigate} = this.props.navigation;
        console.log("navigate to plan a dive screen")
        return (
            <View style={styles.root}>
                <HeaderX icon2Name="power"></HeaderX>
                <View style={styles.bodyStack}>
                    <View style={styles.body}>
                        <Text style={styles.pageName}>Plan Your Dive</Text>
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
                                    <Maps/>
                                    <View style={[styles.diveInformation, {top: SCREEN_WIDTH - 150}]}>

                                        <Text>Select a template: </Text>
                                        <Picker
                                            selectedValue={this.state.diveSite}
                                            onValueChange={this.updateDive}>
                                            {Object.keys(options).map((key) => {
                                                return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                                            })}
                                        </Picker>

                                        <Form
                                            ref={c => this._form = c} // assign a ref
                                            type={Dive}
                                            value={this.getInitialState()}
                                            options={formOptions}
                                        />

                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonFooter}>
                    <ButtonFooter onPress={this.handlePress} goBackTo={'Home'} textForward={"Confirm Dive"}
                                  textBack={"Cancel"} navigation={this.props.navigation}></ButtonFooter>
                </View>
                <StatusBar
                    hidden={false}
                ></StatusBar>
            </View>
        );
    }
};


var environment = t.enums({
    Fresh: 'Fresh',
    Salt: 'Salt',
    Shore: 'Shore',
    Boat: 'Boat',
    Deep: 'Deep',
    Night: 'Night'
});

var difficulty = t.enums({
    Easy: 'Easy',
    Medium: 'Medium',
    Hard: 'Hard'
})

var strength = t.enums({
    Calm: 'Calm',
    Moderate: 'Moderate',
    Rough: 'Rough'
})

var current = t.enums({
    None: 'None',
    Moderate: 'Moderate',
    Strong: 'Strong'
})

const Dive = t.struct({
    diveSite: t.maybe(t.String),
    location: t.maybe(t.String),
    maxDepth: t.maybe(t.Integer),
    entryTime: t.maybe(t.Date),
    exitTime: t.maybe(t.Date),
    totalBottomTime: t.maybe(t.Number),
    visibility: t.maybe(t.Number),
    environment: t.maybe(environment),
    seaConditions: t.maybe(strength),
    current: t.maybe(current),
    diveDifficulty: t.maybe(difficulty),
    parking: t.maybe(difficulty),
    nearestHyperbaricChamber: t.maybe(t.String),
    nearestHemsUnit: t.maybe(t.String),
    emsPhoneNumber: t.maybe(t.Number),
    coastguardPhoneNumber: t.maybe(t.Number),
    DANPhoneNumber: t.maybe(t.Number)
});

var formOptions = {
    fields: {
        entryTime: {
            mode: 'time' // display the Date field as a DatePickerAndroid
        },
        exitTime: {
            mode: 'time' // display the Date field as a DatePickerAndroid
        },
        DANPhoneNumber: {
            label: 'Diver Alert Network'
        }
    }
};

