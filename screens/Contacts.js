import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar, Button } from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';
import AsyncStorage from "@react-native-community/async-storage";

const Form = t.form.Form;

let options = {
    fields: {
        deliverytime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            label: "Delivery Time",
            // defaultValueText: this.state.contacts.deliverytime
        }
    }
};

const Contact = t.struct({
    name: t.String,
    phone: t.Number,
    deliverytime : t.Date
});

export default class Contacts extends Component {

    state ={
        contacts:[],
        contact: {
            name: null,
            phone: null,
            deliverytime: null
        }
    };

    getInitialState() {
       return {
            name: this.state.contact.name,
            phone: this.state.contact.phone,
            deliverytime: null
        };
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('contact')
        console.log("stored Contact",value)
        this.setState({ 'contact': JSON.parse(value) });
    }

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            console.log("Handle Press",value)
            AsyncStorage.setItem('contact', JSON.stringify(value));
            this.setState({ 'contact': value });
            this.props.navigation.navigate('Submit')

        }
    }

    render() {
        this.getInitialState()
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

                                            <Form
                                                ref={c => this._form = c} // assign a ref
                                                type={Contact}
                                                value={this.getInitialState()}
                                                options={options}
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
