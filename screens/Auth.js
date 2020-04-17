import React from 'react'
import Amplify, {Hub} from '@aws-amplify/core'
import {Authenticator, ConfirmSignIn} from 'aws-amplify-react-native'
import awsmobile from '../aws-exports'
import {AmplifyTheme} from '../components'
import {NavigationActions} from "react-navigation";


Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true,
    },
})

const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password',
        },
    ],
}

export default class App extends React.Component {

    checkSignIn = async (authState) => {
        console.log(authState)
        if(authState == "signedIn"){
            this.props.navigation.navigate('Submit')
        }
    }

    render() {
    return (
        <>
            <Authenticator
                onStateChange={(authState) => this.checkSignIn(authState)}
                usernameAttributes="email"
                signUpConfig={signUpConfig}
                theme={AmplifyTheme}
            />
        </>
    )
}
}
