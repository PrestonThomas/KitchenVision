import React, { Component } from 'react';
import { Animated, Platform, StatusBar, Text, View, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import storage from '../api/storage';
import { styles } from './screenStyles';


export const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// getInventory retrieves all keys from the storage API and returns them as an array

let getInventory = async () => {
  return await storage.getAllKeys().then(keys => {
    console.log(keys);
    return keys;
  }).catch(err => {
    console.log(err);
  }
  );
};

//This renders the Home Screen
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
      storage.storage.load({key: 'barcode', id: val[val.length - 1] }).then(ret => {
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
    storage.wait(100).then(() => {
      this.setState({ isLoading: false });
    }
    );
    return (
      <View style={styles.homescreenScrollViewContent}>
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

  //Parallax Header logic control

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


