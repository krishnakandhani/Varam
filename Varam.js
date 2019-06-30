/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import InternetConnection from "./InternetConnection";
import {
  isNetworkAvailable as isNetAvail,
  addNetworkCheckListener,
  removeNetworkCheckListener
} from "./NetworkUtils";
import SplashScreen from "./SplashScreen";

class Varam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: null,
      webview: null,
      splash: true,
      latitude: undefined,
      longitude: undefined,
      isConnected: true
    };
    this.isNetworkAvailableBinder = this.isNetworkAvailableBinder.bind(this);
  }

  // code for back button starts
  webView = {
    canGoBack: false,
    ref: null
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentDidMount() {
    addNetworkCheckListener(this.isNetworkAvailableBinder);
  }

  componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    removeNetworkCheckListener(this.isNetworkAvailableBinder);

    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }
  // code for back button ends
  checkAndroidNetworkAvailable() {
    isNetAvail(isConnected => {
      // Check isConnected for ANDROID
      if (isConnected) {
        this.setState({ isConnected: true });
      } else {
        this.setState({ isConnected: false });
      }
    });
  }

  isNetworkAvailableBinder(isConnected) {
    // Check isConnected for IOS
    if (isConnected) {
      this.setState({ isConnected: true });
    } else {
      this.setState({ isConnected: false });
    }
  }

  get_splashscreen() {
    console.log("in get splash");
    alert("in get splash");
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>Blitz Reading</Text>
      </View>
    );
  }

  _onLoadEnd() {
    this.setState({ splash: false });
    console.log("load ended");
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {SplashScreen(this.state.splash)} */}
        {this.state.splash ? <SplashScreen /> : null}
        <WebView
          startInLoadingState={true}
          geolocationEnabled={true}
          onLoadEnd={() => this._onLoadEnd()}
          source={{ uri: "http://52.66.190.178/login-2" }}
          ref={webView => {
            this.webView.ref = webView;
          }}
          onNavigationStateChange={navState => {
            this.webView.canGoBack = navState.canGoBack;
          }}
        />
        {!this.state.isConnected ? <InternetConnection /> : null}
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  },
  textStyles: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
};

export default Varam;
