import React, {Component} from "react";
import {Image,StyleSheet, View, Text, ActivityIndicator, StatusBar, Button, TouchableOpacity, ScrollView} from "react-native";
import { styles } from './styles'
import AsyncStorage from "@react-native-community/async-storage";

import HeaderX from "../components/HeaderX";
import Svg, {Ellipse} from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";

let url = "ec2-63-33-233-120.eu-west-1.compute.amazonaws.com";

//diveinfo {"coastguardPhoneNumber": null, "current": null, "diveDifficulty": null, "diveName": "Luke", "emsPhoneNumber": null, "entryTime": null, "environment": null, "exitTime": null, "latitude": 52.719939999999994, "location": "galway", "longitude": -8.493996666666668, "maxDepth": null, "nearestHemsUnit": null, "nearestHyperbaricChamber": null, "parking": null, "seaConditions": null, "totalBottomTime": null, "visibility": null}
//buddyInfo {"breathingApparatus": null, "diveId": -1960391795, "exposureSuit": null, "gasBlend": "air", "medicalHistory": null, "name": "Patsy ", "phoneNumber": "086", "qualifications": null}
//smsInfo {"deliverytime": "07:56", "diveId": -1960391795, "name": "Luke", "phone": "+353846"}

export default class Submit extends Component {
    state = {
        diveIsLoading: true,
        buddyIsLoading: true,
        smsIsLoading: true,
        enabled: true
    };

    constructor(props) {
        super(props);
        this.state = {
            diveIsLoading: true,
            buddyIsLoading: true,
            smsIsLoading: true,
            smsId: null,
            enabled: true
        };
    }

    submitDive = async () => {
        let dive = await AsyncStorage.getItem('currentDive')
        let latitude = await AsyncStorage.getItem('latitude')
        let longitude = await AsyncStorage.getItem('longitude')

        let valueObject = JSON.parse(dive);

        let time = new Date(valueObject.entryTime);
        let hours=time.getUTCHours();
        if(hours<10){
            hours = ("0" + hours)
        }
        let minutes=time.getUTCMinutes();
        if(minutes<10){
            minutes = ("0" + minutes)
        }
        valueObject.entryTime = (hours + ":" + minutes);

        let exitTime = new Date(valueObject.exitTime);
        let hours1=exitTime.getUTCHours();
        if(hours1<10){
            hours1= ("0" + hours1)
        }
        let minutes1=exitTime.getUTCMinutes();
        if(minutes1<10){
            minutes1 = ("0" + minutes1)
        }
        valueObject.exitTime = (hours1 + ":" + minutes1);

        let diveInfo = valueObject;
        diveInfo.latitude = JSON.parse(latitude);
        diveInfo.longitude = JSON.parse(longitude);
        console.log("Request Body diveinfo", diveInfo)

        fetch(`http://${url}/dive-service/dives`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diveInfo),
            redirect: 'follow'
        }).then(response => {
            if (response.ok) {
                this.setState({diveIsLoading: false});
            } else {
                this.setState({enabled: true})
            }
            return response.json();
        }).then(json => {
            AsyncStorage.setItem('diveId', JSON.stringify(json.id));
            console.log("Set diveId: ", json.id)
            this.submitBuddy()
            this.submitSMS()
            return
        }).catch(function (error) {
            this.setState({enabled: true})
            console.log('There has been a problem with your Dive fetch operation: ' + error.message);
        })
    }

    submitBuddy = async () => {
        let buddy = await AsyncStorage.getItem('currentBuddy')
        let diveId = await AsyncStorage.getItem('diveId')

        let buddyInfo = JSON.parse(buddy);

        buddyInfo.diveId = JSON.parse(diveId);
        console.log("Request Body buddyInfo", buddyInfo)

        fetch(`http://${url}/dive-service/divers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buddyInfo),
            redirect: 'follow'
        }).then(response => {
            if (response.ok) {
                this.setState({buddyIsLoading: false});
            }
            return response.json();
        }).then(json => {
            AsyncStorage.setItem('buddyId', JSON.stringify(json.diverId));
            console.log("Set buddyId: ", json.diverId)
            return
        }).catch(function (error) {
            this.setState({enabled: true})
            console.log('There has been a problem with your Buddy fetch operation: ' + error.message);
        })
    }

    submitSMS = async () => {
        let contact = await AsyncStorage.getItem('currentContact')
        let diveId = await AsyncStorage.getItem('diveId')


        let valueObject = JSON.parse(contact);

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

        let smsInfo = valueObject;
        smsInfo.diveId = JSON.parse(diveId);
        console.log("Request Body smsInfo", smsInfo)
        smsInfo.message = ("The dive information is available at http://www.scubaSOS.com/" + smsInfo.diveId);

        fetch(`http://${url}/sms-service/sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(smsInfo),
            redirect: 'follow'
        }).then(response => {
            console.log(response.body)
            if (response.ok) {
                this.setState({smsIsLoading: false});
            } else {
                this.setState({enabled: true})
            }
            return response.json();
        }).then(json => {
            AsyncStorage.setItem('smsId', JSON.stringify(json.smsId.smsId));
            console.log("Set smsId: ", json.smsId.smsId)
            return
        }).catch(function (error) {
            this.setState({enabled: true})
            console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }



    handleSubmit = async () => {
        await this.submitDive()
    }

    handleFinish = () => {
        if(!this.state.diveIsLoading & !this.state.buddyIsLoading & !this.state.smsIsLoading){
            this.props.navigation.navigate('ActiveDive')
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.root}>
                <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
                <View style={styles.bodyStack}>
                    <View style={styles.body}>
                        <Text style={styles.pageName}>Lets submit your dive!</Text>
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
                                <SubmitComponent diveIsLoading={this.state.diveIsLoading}
                                                 buddyIsLoading={this.state.buddyIsLoading}
                                                 smsIsLoading={this.state.smsIsLoading}
                                                 onPress={this.handleSubmit}
                                                 disabled={!this.state.enabled}></SubmitComponent>
                            </View>
                    </View>
                </View>
                <ButtonFooter onPress={this.handleFinish} goBackTo={'Contacts'} textForward={"Start Dive"}
                              textBack={"Go Back"} style={styles.buttonFooter}
                              navigation={this.props.navigation}></ButtonFooter>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                ></StatusBar>
            </View>
        );
    }
}

class SubmitComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    handlePress = () => {
        // Need to check to prevent null exception.
        this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
    }

    render() {
        return (
            <View style={confirmStyle.container}>
                <View style={confirmStyle2.container}>
                    <View style={confirmStyle.component}>
                        <Text style={confirmStyle.component}>Dive status</Text>
                        <CheckComponent isLoading={this.props.diveIsLoading}></CheckComponent>
                    </View>
                    <View style={confirmStyle.component}>
                        <Text style={confirmStyle.component}>Buddy status</Text>
                        <CheckComponent isLoading={this.props.buddyIsLoading}></CheckComponent>
                    </View>
                    <View style={confirmStyle.component}>
                        <Text style={confirmStyle.component}>SMS status</Text>
                        <CheckComponent isLoading={this.props.smsIsLoading}></CheckComponent>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.handlePress}
                    disabled={this.props.disabled}
                    style={ButtonStyles.container}>
                    <Text style={ButtonStyles.caption}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

class CheckComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../assets/green_tick.jpg')}
                    />
                </View>
            )
        }
    }
}

const confirmStyle = StyleSheet.create(
    {
        container: {
            flexDirection: "column",
            alignItems: "center",
        },
        component: {
            alignItems: "center",
            fontSize: 20,
            margin: 5
        }
    }
)
const confirmStyle2 = StyleSheet.create(
    {
        container: {
            flexDirection: "column",
        }
    }
)

const ButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        width: 120,
        height: 50,
        borderRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 5
    },
    caption: {
        color: "#fff",
        fontSize: 14
    }
});
