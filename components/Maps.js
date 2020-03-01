import React, { Component } from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from "@react-native-community/async-storage";

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Maps extends Component {
    constructor(props) {
        super(props);
        Geolocation.setRNConfiguration({ enableHighAccuracy: false, timeout: 20000});
        this.state = {
            loading: true,
            location:{
                latitude: 53.5,
                longitude: -7.8,
                latitudeDelta: 4,
                longitudeDelta: 4
            }
        };
    }

    async getCurrentLocation() {
        Geolocation.getCurrentPosition(
            async position => {
                await AsyncStorage.setItem('latitude', JSON.stringify(position.coords.latitude));
                await AsyncStorage.setItem('longitude', JSON.stringify(position.coords.longitude));
                if (this.map) {
                    this.map.animateToRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                   }
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    render() {
        return (

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                initialRegion={this.state.location}
                onRegionChangeComplete={this.onRegionChange}
                followUserLocation={true}
                zoomEnabled={true}>
            </MapView>
        )
    }

}
export const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFill,
        height: SCREEN_WIDTH - 150,
    },

});
