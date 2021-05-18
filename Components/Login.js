// Components/Favorites.js

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import { testApi } from "../API/FactureAPI";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Headline } from "react-native-paper";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { color } from "react-native-reanimated";

class Login extends React.Component {
  constructor(props) {
    super(props);
    loginIdent = "";
    loginPass = "";
    this.state = {
      infoFacture: [],
      isLoading: false,
    };
  }

  _loginIdentTextInputChanged(text) {
    loginIdent = text;
  }

  _loginPassTextInputChanged(text) {
    loginPass = text;
  }

  _loadAPI() {
    if (loginIdent.length > 0) {
      this.setState({ isLoading: true });
      testApi(loginIdent).then((data) => {
        this.setState({
          infoFacture: [...this.state.infoFacture, ...data],
          isLoading: false,
        });
        if (data.length !== 0) {
          this._toggleLogin();
          this._toggleLogin1();
          this._toggleLogin2();
          this._toggleIdentifiant();
          //this._toggleIMotDePasse();
          this.props.navigation.replace("MyDrawer");
        } else {
          ToastAndroid.show(
            "identifiant et/ou passe incorrect !",
            ToastAndroid.SHORT
          );
        }
      });
    } else {
      ToastAndroid.show("Veuillez remplir les champs !", ToastAndroid.SHORT);
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#212121" />
        </View>
      );
    }
  }

  _displayFactureImage() {
    var sourceImage = require("../assets/ic_background.jpg");
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={sourceImage}
      ></ImageBackground>
    );
  }

  _toggleLogin = () => {
    const action = { type: "CONNECT_USER", value: this.state.infoFacture };
    this.props.dispatch(action);
  };

  _toggleLogin1 = () => {
    const action = { type: "FACTURE_PAYEE" };
    this.props.dispatch(action);
  };
  _toggleLogin2 = () => {
    const action = { type: "FACTURE_IMPAYEE" };
    this.props.dispatch(action);
  };
  _toggleIdentifiant = () => {
    const action = { type: "USER_IDENTIFIANT", value: this.props.loginIdent };
    this.props.dispatch(action);
  };
  _toggleIMotDePasse = () => {
    const action = { type: "USER_MOT_DE_PASSE", value: this.props.loginPass };
    this.props.dispatch(action);
  };

  render() {
    var sourceImage = require("../assets/ic_background.jpg");
    return (
      <View style={styles.main_container}>
        <ImageBackground style={styles.backgroundImage} source={sourceImage}>
          {/*
            <View style={styles.login_container}>
            {/*<FontAwesome name="connectdevelop" size={100} />*}
            <Text style={styles.title_text}> Login </Text>
          </View>*/}
          <View style={styles.connetion_container}>
            <Text style={styles.title_text}> NetPay </Text>
            <View style={styles.input_container}>
              <Input
                placeholder="Email"
                leftIcon={
                  <MaterialIcons name="email" color={"#fff"} size={25} />
                }
                autoCapitalize="none"
                inputStyle={{
                  color: "#fff",
                }}
                selectionColor="#fff"
                onChangeText={(text) => this._loginIdentTextInputChanged(text)}
                onSubmitEditing={() => this._loadAPI()}
              />

              <Input
                placeholder="Mot de passe"
                leftIcon={
                  <MaterialIcons name="lock" color={"#fff"} size={25} />
                }
                autoCapitalize="none"
                inputStyle={{
                  color: "#fff",
                }}
                secureTextEntry
                onChangeText={(text) => this._loginIdentTextInputChanged(text)}
                onSubmitEditing={() => this._loadAPI()}
              />
            </View>
            <View style={styles.btn_cont}>
              <TouchableOpacity onPress={() => this._loadAPI()}>
                <LinearGradient
                  colors={["#08d4c4", "#02519e"]}
                  style={styles.btn_login}
                >
                  <Text style={styles.btn_text}> Login </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {this._displayLoading()}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  input_container: {
    //flexDirection: "row",
    //justifyContent: "center",
    //alignItems: "center",
  },
  login_container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    left: 30,
    //top: 15,
  },
  connetion_container: {
    flex: 1,
    //borderWidth: 1,
    //borderTopRightRadius: 30,
    //borderTopLeftRadius: 30,
    //backgroundColor: "#fff",
    margin: 15,
    // borderColor: "#08d4c4",
    justifyContent: "center",
  },
  btn_container: {
    //flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  btn_login: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    //alignItems: "center",
  },
  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
  },
  title_text: {
    // textAlign: "center",
    //margin: 10,
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(Login);
