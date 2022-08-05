import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import componentStyles from '../components/componentStyles';

export default class Splash extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
        <View style={{
            flex: 1,
            backgroundColor: '#FAC898'
        }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FAC898'
                }}
            >
                <LottieView
                    source={require('../assets/splash.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                />
            </View>
            <View style={{
                    flex: 0.6,
                    backgroundColor: '#FAC898'
                }}>
                <Animatable.Text animation="pulse" easing="ease-in" duration={2000} iterationCount="infinite" direction="alternate" style={{ textAlign: 'center', fontSize:45, fontFamily:"Veggy", color:"black", marginBottom:30 }}>KITCHENVISION</Animatable.Text>
                <Animatable.Text animation="jello" easing="ease-in" duration={2000} iterationCount="infinite" style={{ textAlign: 'center', fontSize:32 }}>🍞🍞🍞</Animatable.Text>
            </View>
        </View>
        )
    }
}