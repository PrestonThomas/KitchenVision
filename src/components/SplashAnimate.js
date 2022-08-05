import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Splash extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
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
                    onAnimationFinish={() => {
                        console.log('Boot Splash Done')
                    }}
                />
            </View>
        )
    }
}