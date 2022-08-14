import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import componentStyles from '../components/componentStyles';
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import styles from '../components/componentStyles';

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
            {/* <View style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems:'center',
                    marginBottom: 40
                }}>
            <AwesomeButton backgroundActive="rgba(0,0,0,0)"
                            activeOpacity={0.5}
                            textColor="#FFFFFF"
                            backgroundColor = '#f6a14f'
                            width={150}
                            >HOME
            </AwesomeButton>
        </View> */}
        </View>
        )
    }
 }
