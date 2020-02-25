import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar, Button } from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";
import t from 'tcomb-form-native';

const Form = t.form.Form;

let options = {
    fields: {
        deliverytime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            label: "Delivery Time"
        }
    }
};

const Contact = t.struct({
    name: t.String,
    phone: t.Number,
    deliverytime : t.Date
});

export default class Contacts extends Component {

    handlePress = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            // this.props.navigation.state.params.buddies.push(value);
            let valueString = JSON.stringify(value);
            let valueObject = JSON.parse(valueString);

            let time = new Date(valueObject.deliverytime);
            let hours=time.getUTCHours();
            if(hours<10){
                hours = ("0" + hours)
            }
            let minutes=time.getUTCMinutes();
            if(minutes<10){
                minutes = ("0" + minutes)
            }
            valueObject.deliverytime = (hours + ":" + minutes);

            let number = valueObject.phone
            valueObject.phone = ("+353" + number.toString());
            
            valueObject.message = null;
            this.props.navigation.state.params.smsInformation = valueObject;

            console.log(this.props.navigation.state.params)

            this.props.navigation.navigate('Submit', {
                smsInformation: this.props.navigation.state.params.smsInformation,
                diveInformation: this.props.navigation.state.params.diveInformation,
                buddies: this.props.navigation.state.params.buddies
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("navigate to plan a dive screen")
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
                            <View style={styles.scrollArea}>
                                <ScrollView
                                    horizontal={false}
                                    contentContainerStyle={styles.scrollArea_contentContainerStyle}
                                >
                                    <View style={styles.diveInformationStack}>

                                        <View style={styles.diveInformation}>

                                            <Form
                                                ref={c => this._form = c} // assign a ref
                                                type={Contact}
                                                options={options}
                                            />

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonFooter}>
                        <ButtonFooter onPress={this.handlePress}  goBackTo={'Buddies'} textForward={"Submit"} textBack={"Go Back"} navigation={this.props.navigation}></ButtonFooter>
                    </View>
                </View>
                <StatusBar
                    hidden={false}
                ></StatusBar>
            </View>
        );
    }
};
