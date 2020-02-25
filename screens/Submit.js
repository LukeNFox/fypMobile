import React, {Component} from "react";
import {StyleSheet, View, Text, ActivityIndicator, StatusBar, Button, TouchableOpacity, ScrollView} from "react-native";
import { styles } from './styles'

import HeaderX from "../components/HeaderX";
import Svg, {Ellipse} from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";

let url = "ec2-52-212-49-13.eu-west-1.compute.amazonaws.com";

export default class Submit extends Component {
    state = {
        diveIsLoading: true,
        buddyIsLoading: true,
        smsIsLoading:true,
        enabled:  true
    };

    constructor(props) {
        super(props);
        this.state = {
            diveIsLoading: true,
            buddyIsLoading: true,
            smsIsLoading:true,
            smsId: null,
            enabled: true };
    }

    handleSubmit = () => {
        this.setState({diveIsLoading: true, buddyIsLoading: true, smsIsLoading:true, enabled: false });
        let diveInfo    = this.props.navigation.state.params.diveInformation;
        let buddy     = this.props.navigation.state.params.buddies;
        let smsInfo        = this.props.navigation.state.params.smsInformation;
        buddy.diveId = null;
        let smsId = null;

        if (diveInfo) {
            fetch(`http://${url}/dive-service/dives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(diveInfo),
                redirect: 'follow'
            }).then(response => {
                if(response.ok) {
                    this.setState({diveIsLoading: false});
                }else {this.setState({enabled: true})}
                return response.json();
            }).then(json => {
                buddy.diveId = json.id;
                smsInfo.message = ("The dive information is available at http://www.scubaSOS.com/" + buddy.diveId );
                console.log("SMS populated with message: ",smsInfo)
                console.log("Returning diveId", buddy.diveId)
                if (buddy.diveId) {
                    console.log("Buddy populated with dive id: ",buddy)
                    fetch(`http://${url}/dive-service/divers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(buddy),
                        redirect: 'follow'
                    }).then(response => {
                        if(response.ok) {
                            this.setState({buddyIsLoading: false});
                            // this.props.navigation.navigate('Home')
                        }
                        return response.json();
                    }).then(json => {
                        console.log("first two Success")
                        if(smsInfo.message != null){
                            console.log("In sms part ")
                            fetch(`http://${url}/sms-service/sms`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(smsInfo),
                                redirect: 'follow'
                            }).then(response => {
                                console.log(response.body)
                                if(response.ok) {
                                    this.setState({smsIsLoading: false});
                                }else {
                                    this.setState({enabled: true})}
                                return response.json();
                            }).then(json => {
                                console.log(json)
                                smsId = json.smsId.smsId;
                                this.setState({smsId: smsId})
                                console.log("Saving smsId", smsId)
                                return
                            }).catch(function(error) {
                                this.setState({enabled: true})
                                console.log('There has been a problem with your fetch operation: ' + error.message);
                            })
                        }
                        return
                    }).catch(function(error) {
                        this.setState({enabled: true})
                        console.log('There has been a problem with your Buddy fetch operation: ' + error.message);
                    })
                }
                return
            }).catch(function(error) {
                    this.setState({enabled: true})
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                })
        }
        }

    handleFinish = () => {
        if(!this.state.diveIsLoading & !this.state.buddyIsLoading & !this.state.smsIsLoading){
            this.props.navigation.navigate('ActiveDive', {smsId:this.state.smsId})
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
                </View>
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
                        <Text style={confirmStyle.component}>  Dive status   </Text>
                        <CheckComponent isLoading={this.props.diveIsLoading}></CheckComponent>
                    </View>
                    <View style={confirmStyle.component}>
                        <Text style={confirmStyle.component}>  Buddy status   </Text>
                        <CheckComponent isLoading={this.props.buddyIsLoading}></CheckComponent>
                    </View>
                    <View style={confirmStyle.component}>
                        <Text style={confirmStyle.component}>  SMS status   </Text>
                        <CheckComponent isLoading={this.props.smsIsLoading}></CheckComponent>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.handlePress}
                    disabled={this.props.disabled}
                    style={ButtonStyles.container}>
                    <Text style={ButtonStyles.caption}>Confirm</Text>
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
                    <Text>  Success</Text>
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
            fontSize: 20,
            backgroundColor: "gray",
            margin: 5
        }
    }
)
const confirmStyle2 = StyleSheet.create(
    {
        container: {
            flexDirection: "column",
            padding: 20,
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
