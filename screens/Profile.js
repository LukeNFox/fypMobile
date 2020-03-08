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
let storedProfiles = null;

const ProfileForm = t.struct({
    name: t.maybe(t.String),
    phoneNumber: t.maybe(t.Number),
    gasBlend: t.maybe(t.String),
    exposureSuit: t.maybe(t.String),
    breathingApparatus: t.maybe(t.String),
    qualifications: t.maybe(t.String),
    medicalHistory: t.maybe(t.String)
});


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.initialiseStorage()
        this.updatePicker()
        this.state = {
            options: [],
            name: null,
            profile: {
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
            name: this.state.profile.name,
            phoneNumber: this.state.profile.phoneNumber,
            gasBlend: this.state.profile.gasBlend,
            exposureSuit: this.state.profile.exposureSuit,
            breathingApparatus: this.state.profile.breathingApparatus,
            qualifications: this.state.profile.qualifications,
            medicalHistory: this.state.profile.medicalHistory
        };
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('currentProfile')
        console.log("current lead Diver profile", value)
        if (value) {
            this.setState({'profile': JSON.parse(value)});
        }
    }

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            if (storedProfiles != null) {
                storedProfiles.forEach(
                    function (item, index, object) {
                        if (item.name == value.name) {
                            object.splice(index, 1);
                            return
                        }
                    })
            }
            storedProfiles.push(value)
            AsyncStorage.setItem('storedProfiles', JSON.stringify(storedProfiles));

            AsyncStorage.setItem('currentProfile', JSON.stringify(value));
            this.setState({'profile': value});
            this.props.navigation.navigate('Home')
        }
    }

    updateProfile = async (name) => {
        this.setState({name:options[name]})
        let profileInfo = null;
        if(storedProfiles != null) {
            await storedProfiles.forEach(
                function (stored) {
                    if (stored.name == options[name]) {
                        profileInfo = stored;
                    }
                })
        }
        console.log(profileInfo)
        this.setState({ profile: profileInfo})
    }

    initialiseStorage = async () => {
        let result = await AsyncStorage.getItem("storedProfiles");
        if (storedProfiles != null) {
            storedProfiles = JSON.parse(result)
        } else {
            storedProfiles = new Array();
        }
    }

    updatePicker = async () => {
        options = ["Create a new Profile"];
        await storedProfiles.forEach(function (item) {
            options.push(item.name)
        })
        this.setState({options: options});
    }


    render() {
        console.log("navigate to plan a Profile screen")
        return (
            <View style={styles.root}>
                <HeaderX/>
                <View style={styles.bodyStack}>
                    <View style={styles.body}>
                        <Text style={styles.pageName}>Who is the lead diver?</Text>
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
                                            onValueChange={this.updateProfile}>
                                            {Object.keys(options).map((key) => {
                                                return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                                            })}
                                        </Picker>
                                        <Form
                                            ref={c => this._form = c} // assign a ref
                                            type={ProfileForm}
                                            value={this.getInitialState()}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <ButtonFooter onPress={this.handlePress} style={styles.buttonFooter} goBackTo={'Home'}
                              textForward={"Confirm Profile"} textBack={"Go Back"}
                              navigation={this.props.navigation}></ButtonFooter>
                <StatusBar
                    hidden={false}
                ></StatusBar>
            </View>
        );
    }

};
