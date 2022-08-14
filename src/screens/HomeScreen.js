import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import storage from '../api/storage';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let getInventory = async () => {
  return await storage.getAllKeys().then(keys => {
    console.log(keys)
    return keys;
  }).catch(err => {
    console.log(err);
  }
  );
}

const wait = (timeout) => {
  return new Promise(resolve => {
      setTimeout(resolve, timeout);
  });
}
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      invStats: {total: 0, numCategories: 0, latestItem: {name: '', barcode: 0, expiry: ''}},
      isLoading: true,
    };
  }

  componentDidMount() {
    getInventory().then((val) => {
      this.state.invStats.total = val.length;
      console.log(val);
      storage.storage.load({key: 'barcode', id: val[val.length-1] }).then(ret => {
        this.state.invStats.latestItem.name = ret.name;
        this.state.invStats.latestItem.barcode = ret.value;
        this.state.invStats.latestItem.expiry = ret.expiry;
      }).catch(err => {
        console.log(err);
      }
      );
    }
    );
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    wait(100).then(() => {
      this.setState({ isLoading: false });
    }
    );
    return (
      <View style={styles.homescreenScrollViewContent}>
        {/* {data.map((_, i) => ( */}
        <View style={styles.homescreenSectionBreakTop}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          duration={1400} 
          style={styles.homescreenBreadPos}>🍞🍞🍞🍞🍞🍞🍞🍞🍞</Animatable.Text>
        </View>
        <View style={styles.homescreenRowFirst}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={800} 
          direction="alternate" 
          style={styles.homescreenSubHeaderText}>Total Items</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={800} 
          direction="alternate" 
          style={styles.homescreenContentTextLong}>You Have Recorded a Total of {this.state.invStats.total} Items</Animatable.Text>
          {/*Format of text is subject to changes dependent on data passing by Preston*/}
        </View>
        <View style={styles.homescreenRow}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" delay={1000} 
          onScroll direction="alternate" 
          style={styles.homescreenSubHeaderText}>Categories</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1200} 
          direction="alternate" 
          style={styles.homescreenContentText}>Meat</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1200} 
          direction="alternate" 
          style={styles.homescreenContentText}>Dairy</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1200} 
          direction="alternate" 
          style={styles.homescreenContentText}>Vegetables</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1200} 
          direction="alternate" 
          style={styles.homescreenContentText}>Drinks</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1200} 
          direction="alternate" 
          style={styles.homescreenContentText}>Others</Animatable.Text>
        </View>
        <View style={styles.homescreenSectionBreak}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          duration={1400} 
          style={styles.homescreenBreadPos}>🍞🍞🍞🍞🍞🍞🍞🍞🍞</Animatable.Text>
        </View>
        <View style={styles.homescreenRowShort}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1600} 
          onScroll direction="alternate" 
          style={styles.homescreenSubHeaderText}>Latest Item Added</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={1800} 
          direction="alternate" 
          style={styles.homescreenContentText}> {this.state.invStats.latestItem.barcode} </Animatable.Text>
        </View>
        <View style={styles.homescreenRowShort}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={2000} 
          onScroll direction="alternate" 
          style={styles.homescreenSubHeaderText}>It's Near Expiry</Animatable.Text>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          delay={2200} 
          direction="alternate" 
          style={styles.homescreenContentText}>{this.state.invStats.latestItem.name}, {this.state.invStats.latestItem.expiry}</Animatable.Text>
        </View>
        <View style={styles.homescreenSectionBreakTop}>
          <Animatable.Text 
          animation="bounceInUp" 
          easing="ease-in" 
          duration={1400} style={styles.homescreenBreadPos}>🍞🍞🍞🍞🍞🍞🍞🍞🍞</Animatable.Text>
        </View>
        {/* ))} */}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0.8, 1, 0.6],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.45],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -185],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.homescreenFill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.homescreenFill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 100);
                getInventory().then((val) => {
                  this.state.invStats.total = val.length;
                }
                );
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.homescreenHeader,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.homescreenBackgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../assets/wavefo.jpg')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.homescreenBar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
        <Text style={styles.homescreenHeadText}>My Kitchen Vision</Text>          
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homescreenFill: {
    flex: 1,
  },
  homescreenContent: {
    flex: 1,
  },
  homescreenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,150,79, 1)',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  homescreenBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  homescreenBar: {
    backgroundColor: 'transparent',
    opacity:20,
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
  },
  homescreenTitle: {
    color: 'white',
    fontSize: 70,
    fontFamily: 'Sweet-Hipster'
  },
  homescreenScrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  homescreenRow: {
    height: 250,
    margin: 5,
    marginTop: 80,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homescreenRowFirst: {
    height: 250,
    margin: 5,
    marginTop: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homescreenSectionBreak:{
    height:50,
    marginTop: 100,
    marginBottom: 20,
    backgroundColor: 'rgba(255,150,79, 0.4)',
  },
  homescreenSectionBreakTop:{
    height:50,
    margin:0,
    backgroundColor: 'rgba(255,150,79, 0.4)',
  },
  homescreenRowShort: {
    height:200,
    margin: 5,
    marginTop: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homescreenBreadPos: {
    textAlign: 'center', 
    fontSize: 25,
    margin: 5,
  },
  homescreenSubHeaderText: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: "Amsterdam",
    color: 'rgba(255,150,79, 1)',
    marginBottom: 10,
  },
  homescreenContentTextLong: {
    textAlign: 'left',
    fontSize: 40,
    fontFamily: "HelloKetta",
    color: "black",
    marginBottom: 10,
  },
  homescreenContentText: {
    textAlign: 'left',
    fontSize: 45,
    fontFamily: "HelloKetta",
    color: "black",
    marginBottom: 20,
  },
  homescreenHeadText: {
    textAlign: 'left',
    fontSize:25,
    fontFamily:"Amsterdam",
    color:'white',
  },
});