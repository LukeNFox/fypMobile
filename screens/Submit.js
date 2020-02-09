import React, {Component} from "react";
import {StyleSheet, View, Text, ActivityIndicator, StatusBar, Button, TouchableOpacity} from "react-native";

import HeaderX from "../components/HeaderX";
import Svg, {Ellipse} from "react-native-svg";
import ButtonFooter from "../components/ButtonFooter";

let url = "172.20.10.2";

export default class Submit extends Component {
    state = {
        diveIsLoading: true,
        buddyIsLoading: true,
        enabled:  true
    };

    constructor(props) {
        super(props);
        this.state = {diveIsLoading: true, buddyIsLoading: true, enabled: true };
    }

    handleSubmit = () => {
        this.setState({diveIsLoading: true, buddyIsLoading: true, enabled: false });
        let diveInfo    = this.props.navigation.state.params.diveInformation;
        let buddy     = this.props.navigation.state.params.buddies;
        buddy.diveId = null;

        if (diveInfo) {
            fetch(`http://${url}:8050/dive-service/dives`, {
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
                console.log("Returning diveId", buddy.diveId)
                if (buddy.diveId) {
                    console.log("Buddy populated with dive id: ",buddy)
                    fetch(`http://${url}:8050/dive-service/divers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(buddy),
                        redirect: 'follow'
                    }).then(response => {
                        if(response.ok) {
                            this.setState({buddyIsLoading: false});
                            this.props.navigation.navigate('Home')
                        } else{
                            this.setState({enabled: true})
                        }
                        return response.json();
                    }).then(json => {
                        console.log(json)
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
        if(!this.state.diveIsLoading & !this.state.buddyIsLoading){
            this.props.navigation.navigate('Home')
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
                    </View>
                    <View>
                        <SubmitComponent diveIsLoading={this.state.diveIsLoading}
                                         buddyIsLoading={this.state.buddyIsLoading}
                                         onPress={this.handleSubmit}
                                         disabled={!this.state.enabled}></SubmitComponent>
                    </View>

                    <ButtonFooter onPress={this.handleFinish} goBackTo={'Buddies'} textForward={"Finish"}
                                  textBack={"Go Back"} style={styles.buttonFooter}
                                  navigation={this.props.navigation}></ButtonFooter>
                </View>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="rgba(0,0,0,0)"
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
            justifyContent: "center",
            alignItems: "center",
            top: 200,
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
            flexDirection: "row",
            justifyContent: "center",
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


const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: "rgb(255,255,255)",
    },
    body: {
        top: 0,
        backgroundColor: "#1fb2cc",
        position: "absolute",
        width: 400
    },
    pageName: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        width: 400,
        marginLeft: 30,
    },
    ellipse: {
        top: 0,
        left: 0,
        width: 859,
        height: 890,
        alignItems: "center",
    },
    scrollArea: {
        left: 250,
        height: 550,
        position: "absolute",
        right: 250,
        bottom: 300
    },
    scrollArea_contentContainerStyle: {
        width: 358,
        height: 2750,
    },
    diveInformation: {
        top: 0,
        left: 0,
        height: 153,
        position: "absolute",
        right: 0
    },
    expanded: {
        color: "#121212",
        fontSize: 18
    },
    LabelTextbox: {
        width: 320,
        height: 80,
    },
    diveInformationStack: {
        height: 562,
        marginTop: 18,
        marginLeft: 24,
        marginRight: 24
    },
    ellipseStack: {
        height: 890,
        marginTop: 12,
        marginLeft: -249,
        marginRight: -250
    },
    buttonFooter: {
        bottom: 0,
        left: 1,
        width: 360,
        height: 80,
        position: "absolute"
    },
    bodyStack: {
        width: 361,
        flex: 1,
        marginBottom: -3
    }
});
