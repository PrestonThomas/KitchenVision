import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../components/componentStyles';

//This renders the boot splash screen with logo and text animations

export default class Splash extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <View style={styles.splashView}>
                <View style={styles.splashView}>
                    <LottieView
                        source={require('../assets/splash.json')}
                        autoPlay
                        loop={false}
                        speed={1}
                    />
                </View>
                <View style={styles.splashViewInner}>
                    <Animatable.Text
                        animation="pulse"
                        easing="ease-in"
                        duration={2000}
                        iterationCount="infinite"
                        direction="alternate"
                        style={styles.splashText}>KITCHENVISION</Animatable.Text>
                    <Animatable.Text
                        animation="jello"
                        easing="ease-in"
                        duration={2000}
                        iterationCount="infinite"
                        style={styles.splashBreadIcon}>🍞🍞🍞</Animatable.Text>
                </View>
            </View>
        );
    }
}
