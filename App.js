import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";
import Images from "./app/resource/Images";
import AsyncStorage from "@react-native-community/async-storage";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      isLogin: false,
      loading: false,
      email: "",
      password: "",
      latitude: undefined,
      longitude: undefined
    };
  }
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem("isLogin")
        .then(value => {
          if (value) {
            AsyncStorage.getItem("data").then(data => {
              if (data) {
                const savedData = JSON.parse(data);
                if (value === "true") {
                  this.setState({ isLogin: true, email: savedData.email });
                }
              }
            });
          }
          this.setState({ showSplash: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({ showSplash: false });
        });
    }, 3000);
  }
  doLogin() {
    const { email, password } = this.state;
    if (email === "") {
      alert("Enter Email");
      return;
    }
    if (password === "") {
      alert("Enter Password");
      return;
    }
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        this.setState({ isLogin: true }, () => {
          const data = {
            email: this.state.email,
            password: this.state.password
          };
          AsyncStorage.setItem("data", JSON.stringify(data));
          AsyncStorage.setItem("isLogin", "true");
        });
      });
    }, 3000);
  }
  getCurrentLatLong() {
    navigator.geolocation.getCurrentPosition(position => {
      if (position) {
        console.log("getCurrentLatLong", position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }
    });
  }
  renderSplashScreen() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Images.splash}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }
  renderLoginScreen() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator
          color="red"
          size="large"
          style={{ display: this.state.loading ? "flex" : "none" }}
        />

        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Email"
            onChangeText={text => {
              this.setState({ email: text });
            }}
            value={this.state.email}
            keyboardType="email-address"
            returnKeyType="next"
            enablesReturnKeyAutomatically={true}
            style={styles.inputFeild}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            value={this.state.password}
            keyboardType="default"
            returnKeyType="done"
            enablesReturnKeyAutomatically={true}
            style={styles.inputFeild}
          />
        </View>

        <TouchableOpacity onPress={() => this.doLogin()}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderHomeScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello {this.state.email + "\n"},Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
  render() {
    return this.state.showSplash
      ? this.renderSplashScreen()
      : this.state.isLogin
      ? this.renderHomeScreen()
      : this.renderLoginScreen();
  }
}

const styles = StyleSheet.create({
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
  },
  loginButton: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputFeild: {
    flex: 1,
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,
    padding: 3,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10
  }
});
