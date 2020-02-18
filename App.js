import React, { Component } from 'react';
import { UIManager, LayoutAnimation } from 'react-native';
import AppAuth from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from './components';
import { createConfig, signIn, signOut, getAccessToken } from '@okta/okta-react-native';
import Routes from "./Routes";

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const scopes = ['openid', 'profile', 'email', 'offline_access'];



type State = {
    hasLoggedInOnce: boolean,
    accessToken: ?string,
    accessTokenExpirationDate: ?string,
    refreshToken: ?string
};


export default class App extends Component<{}, State> {
    auth = new AppAuth({
        issuer: 'https://dev-691479.okta.com/oauth2/default',
        clientId: '0oa25680rZMmf4TIl4x6',
        redirectUrl: 'com.okta.dev-691479:/callback'
    });

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
        await createConfig({
            clientId: "0oa25680rZMmf4TIl4x6",
            redirectUri: "com.okta.dev-691479:/callback",
            endSessionRedirectUri: "com.okta.dev-691479:/",
            discoveryUri: "https://dev-691479.okta.com",
            scopes: ["openid", "profile", "offline_access"],
            requireHardwareBackedKeyStore: true
        });
        try {
            const authState = await this.auth.authorize(scopes);
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
            console.error(error);
        }
    };

    refresh = async () => {
        try {
            const authState = await this.auth.refresh(this.state.refreshToken, scopes);
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
            await this.auth.revokeToken(this.state.accessToken);
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
                        <Form.Label>accessToken</Form.Label>
                        <Form.Value>{state.accessToken}</Form.Value>
                        <Form.Label>accessTokenExpirationDate</Form.Label>
                        <Form.Value>{state.accessTokenExpirationDate}</Form.Value>
                        <Form.Label>refreshToken</Form.Label>
                        <Form.Value>{state.refreshToken}</Form.Value>
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