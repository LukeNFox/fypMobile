import React, { Component } from "react";
import {StyleSheet, View, Button, TouchableOpacity, Text} from "react-native";
import HeaderX from "../components/HeaderX";
import AsyncStorage from "@react-native-community/async-storage";

let url = "ec2-63-33-233-120.eu-west-1.compute.amazonaws.com";

export default class ActiveDive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            smsCancelled: false};
    }

    handleSubmit = async () => {
        let smsId = await AsyncStorage.getItem('smsId')

        if(smsId!= null){
            fetch(`http://${url}/sms-service/sms?smsId=${smsId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }).then(response => {
                if(response.ok) {
                    this.setState({smsCancelled: true});
                }
                return
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
        }
        if(this.state.smsCancelled){
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <HeaderX/>
                <View style={ButtonStyles.container}>
                    <TouchableOpacity
                        onPress={this.handleSubmit}
                        style={[styles.materialButtonDark2,ButtonStyles.buttons, this.props.style]}>
                        <Text style={ButtonStyles.caption}>Im a safe!</Text>
                    </TouchableOpacity>
                </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: "rgba(255,255,255,1)"
    },
    materialButtonDark2: {
        width: 120,
        height: 50,
    }
});

const ButtonStyles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255,255,255,1)"
    },
    buttons: {
        backgroundColor: "#212121",
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "space-evenly",
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
    },
});

