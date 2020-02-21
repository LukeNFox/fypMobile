import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
    },
    body: {
        top: 0,
        backgroundColor: "#1fb2cc",
        flex: 1,
        flexDirection: 'column',
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
        left: 250,
        height: 500,
        position: "absolute",
        right: 250,
        top: 30
    },
    scrollArea_contentContainerStyle: {
        width: 358,
        height: 1500,
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
        height: 80,
    },
    bodyStack: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: -3
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
