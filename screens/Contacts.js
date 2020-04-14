import React, { Component } from "react";
import {View, Text, ScrollView, StatusBar, Button, Picker} from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import AsyncStorage from "@react-native-community/async-storage";

const Form = t.form.Form;

let fieldOptions = {
    fields: {
        deliverytime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            label: "Delivery Time",
            // defaultValueText: this.state.contacts.deliverytime
        }
    }
};

let options = [];
let storedContacts = null;


const Contact = t.struct({
    name: t.String,
    phone: t.Number,
    deliverytime : t.Date
});

export default class Contacts extends Component {

    constructor(props) {
        super(props)
        this.initialiseStorage()
        this.updatePicker()
        this.state = {
            options: [],
            name: null,
            contact: {
                name: null,
                phone: null,
                deliverytime: null
            }
        }
    }

    getInitialState() {
       return {
            name: this.state.contact.name,
            phone: this.state.contact.phone,
            deliverytime: null
        };
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('currentContact')
        console.log("stored Contact",value)
        if(value) {
            this.setState({'contact': JSON.parse(value)});
        }
    }

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            console.log("Handle Press",value)
            if (storedContacts != null) {
                storedContacts.forEach(
                    function (item, index, object) {
                        if (item.name == value.name) {
                            object.splice(index, 1);
                            return
                        }
                    })

            }
            storedContacts.push(value)
            AsyncStorage.setItem('storedContacts', JSON.stringify(storedContacts));

            AsyncStorage.setItem('currentContact', JSON.stringify(value));
            this.setState({ 'contact': value });
            this.props.navigation.navigate('Submit')

        }
    }

    updateContact = async (name) => {
        this.setState({name: options[name]})
        let contactInfo = null;
        if (storedContacts != null) {
            await storedContacts.forEach(
                function (stored) {
                    if (stored.name == options[name]) {
                        contactInfo = stored;
                    }
                })
        }
        console.log(contactInfo)
        this.setState({contact: contactInfo})
    }

    initialiseStorage = async () => {
        let result = await AsyncStorage.getItem("storedContacts");
        if (storedContacts != null) {
            storedContacts = JSON.parse(result)
        } else {
            storedContacts = new Array();
        }
    }

    updatePicker = async () => {
        options = ["Create a new contact"];
        await storedContacts.forEach(function (item) {
            options.push(item.name)
        })
        this.setState({options: options});
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("navigate to plan a Contacts screen")
        return (
            <View style={styles.root}>
                <HeaderX/>
                <View style={styles.bodyStack}>
                    <View style={styles.body}>
                        <Text style={styles.pageName}>Who should we contact?</Text>
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
                                                onValueChange={this.updateContact}>
                                                {Object.keys(options).map((key) => {
                                                    return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                                                })}
                                            </Picker>

                                            <Form
                                                ref={c => this._form = c} // assign a ref
                                                type={Contact}
                                                value={this.getInitialState()}
                                                options={fieldOptions}
                                            />

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                </View>
                <View style={styles.buttonFooter}>
                    <ButtonFooter onPress={this.handlePress}  goBackTo={'Buddies'} textForward={"Confirm Contacts"} textBack={"Go Back"} navigation={this.props.navigation}></ButtonFooter>
                </View>
                <StatusBar
                    hidden={false}
                ></StatusBar>
            </View>
        );
    }
};
