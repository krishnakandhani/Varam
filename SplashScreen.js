import React, { PureComponent } from "react";
import { View, Image, ActivityIndicator } from "react-native";
class SplashScreen extends PureComponent {
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ width: "100%", height: "50%" }}
          source={require("./resources/varam_splash.png")}
          // source={Platform.OS === "ios" ? require("./resources/varam.png") : {uri: "file:///android_asset/varam.png"}}
          // source={{uri: 'http://52.66.190.178/wp-content/uploads/2019/06/varam.png'}}

          // source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <ActivityIndicator color="black" />
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
  }
};
export default SplashScreen;
