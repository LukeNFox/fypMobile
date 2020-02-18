import React, { Component } from 'react';
import { UIManager, LayoutAnimation } from 'react-native';
import AppAuth from 'react-native-app-auth';
import { Page, Button, ButtonContainer, FormLabel, FormValue, Form, Heading } from './components';
import { authorize, revoke,refresh } from 'react-native-app-auth';
import Routes from "./Routes";

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

type State = {
    hasLoggedInOnce: boolean,
    accessToken: ?string,
    accessTokenExpirationDate: ?string,
    refreshToken: ?string
};

const config = {
    issuer: 'https://dev-691479.okta.com/oauth2/default',
    clientId: '0oa25680rZMmf4TIl4x6',
    redirectUrl: 'com.okta.dev-691479:/callback',
    scopes: ['openid', 'profile']
};


export default class App extends Component<{}, State> {
    state = {
        hasLoggedInOnce: false,
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
    };


    animateState(nextState: $Shape<State>, delay: number = 0) {
        setTimeout(() => {
            this.setState(() => {
                LayoutAnimation.easeInEaseOut();
                return nextState;
            });
        }, delay);
    }

    authorize = async () => {
        try {
            // Log in to get an authentication token
            const authState = await authorize(config);
            this.animateState(
                {
                    hasLoggedInOnce: true,
                    accessToken: authState.accessToken,
                    accessTokenExpirationDate: authState.accessTokenExpirationDate,
                    refreshToken: authState.refreshToken
                },
                500
            );
        } catch (error) {
            console.log(error)
            console.error(error);
        }
    };

    refresh = async () => {
        try {
            // Refresh token
            const authState = await refresh(config, {
                refreshToken: authState.refreshToken,
            });

            this.animateState({
                accessToken: authState.accessToken || this.state.accessToken,
                accessTokenExpirationDate:
                    authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
                refreshToken: authState.refreshToken || this.state.refreshToken
            });
        } catch (error) {
            console.error(error);
        }
    };

    revoke = async () => {
        try {
            // Revoke token
            await revoke(config, {
                tokenToRevoke: refreshedState.refreshToken
            });
            this.animateState({
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        // const App = () => <Routes/>
        const {state} = this;
        console.log(this.state)
        return (
            <Page>
                {!!state.accessToken ? (
                    <Form>
                        <FormLabel>accessToken</FormLabel>
                        <FormValue>{state.accessToken}</FormValue>
                        <FormLabel>accessTokenExpirationDate</FormLabel>
                        <FormValue>{state.accessTokenExpirationDate}</FormValue>
                        <FormLabel>refreshToken</FormLabel>
                    </Form>
                ) : (
                    <Heading>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
                )}

                <ButtonContainer>
                    {!state.accessToken && (
                        <Button onPress={this.authorize} text="Authorize" color="#017CC0"/>
                    )}
                    {!!state.refreshToken && <Button onPress={this.refresh} text="Refresh" color="#24C2CB"/>}
                    {!!state.accessToken && <Button onPress={this.revoke} text="Revoke" color="#EF525B"/>}
                </ButtonContainer>
            </Page>
        );
    }
}
