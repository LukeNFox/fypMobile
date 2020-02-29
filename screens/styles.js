import {Dimensions, ScrollView, StyleSheet} from 'react-native'
import React from "react";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
    },
    body: {
        top: 0,
        backgroundColor: "#1fb2cc",
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
        flex: 1,
        flexDirection: 'column',
    },
    scrollArea: {
        height: '100%',
        alignSelf: 'center',
        position: "absolute",
        top: 90
    },
    scrollArea_contentContainerStyle: {
        justifyContent: 'space-between',
        width: SCREEN_WIDTH - 50,
    },
    diveInformation: {
        height: 2200
    },
    expanded: {
        color: "#121212",
        fontSize: 18
    },
    LabelTextbox: {
        width: 320,
        height: 80,
    },
    ellipseStack: {
        height: 890,
        marginTop: 12,
        marginLeft: -249,
        marginRight: -250
    },
    buttonFooter: {
        height: 80,
    },
    bodyStack: {
        flex: 1,
        flexDirection: 'column',
    }
})

const ButtonStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    rect: {
        height: 100,
        backgroundColor: "rgba(31,178,204,1)",
    },
    materialButtonLight: {
        width: 120,
        height: 50
    },
    materialButtonDark: {
        width: 120,
        height: 50,
        marginLeft: 50
    },
    materialButtonLightRow: {
        height: 50,
        flexDirection: "row",
        flex: 1,
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20
    }
})

export {styles, ButtonStyles}
