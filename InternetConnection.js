import React, { PureComponent } from "react";
import { View, Image, Text, Button } from "react-native";
import NetInfo from "@react-native-community/netinfo";

class InternetConnection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false
    };
  }
  _onPress() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("Internet is connected");
      } else {
        alert("No internet connection,try again");
      }
    });
  }
  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <Image
          source={require("./resources/noconnection.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "400",
            color: "#000000",
            margin: 10,
            fontSize: 20
          }}
        >
          No internet found, Check your connection or try again
        </Text>
        <Button
          title="Try again"
          onPress={this._onPress}
          style={{ marginTop: 10 }}
        >
          Try again
        </Button>
      </View>
    );
  }
}
export default InternetConnection;