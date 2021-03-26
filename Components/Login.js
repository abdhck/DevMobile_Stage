// Components/Favorites.js

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { testApi } from "../API/FactureAPI";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Headline } from "react-native-paper";

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
          this.props.navigation.replace("FactureList");
        } else {
          ToastAndroid.show(
            "identifiant et/ou passe incorrect !",
            ToastAndroid.SHORT
          );
          console.log("identifiant incorrect !");
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

  _toggleLogin() {
    const action = { type: "CONNECT_USER", value: this.state.infoFacture };
    this.props.dispatch(action);
  }

  _toggleLogin1() {
    const action = { type: "FACTURE_PAYEE" };
    this.props.dispatch(action);
  }
  _toggleLogin2() {
    const action = { type: "FACTURE_IMPAYEE" };
    this.props.dispatch(action);
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.login_container}>
          {/*<FontAwesome name="connectdevelop" size={100} />*/}
          <Headline> Login </Headline>
        </View>
        <View style={styles.connetion_container}>
          <View style={styles.input_container}>
            <MaterialIcons name="perm-identity" size={30} />
            <TextInput
              style={styles.textinput}
              placeholder="Identifiant"
              autoCapitalize="none"
              onChangeText={(text) => this._loginIdentTextInputChanged(text)}
              onSubmitEditing={() => this._loadAPI()}
            />
          </View>
          <View style={styles.input_container}>
            <MaterialIcons name="lock" size={30} />
            <TextInput
              style={styles.textinput}
              placeholder="Mot de passe"
              secureTextEntry
              autoCapitalize="none"
              onSubmitEditing={() => this._loadAPI()}
            />
          </View>
          <View style={styles.btn_container}>
            <TouchableOpacity onPress={() => this._loadAPI()}>
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.btn_login}
              >
                <Text style={styles.btn_text}> Login </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#08d4c4",
    //flexDirection: 'row',
    //justifyContent: "center",
    //alignItems: 'center',
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
    flexDirection: "row",
    justifyContent: "center",
    //alignItems: "center",
  },
  login_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
    //marginBottom: 0,
  },
  connetion_container: {
    flex: 2,
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
    padding: 15,
    borderColor: "#08d4c4",
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    //marginLeft: 10,
    // marginRight: 10,
    height: 50,
    //borderColor: "#000000",
    borderWidth: 1,
    //paddingLeft: 5,
    //alignItems: "center",
    //
    justifyContent: "center",
    //textAlign: "center",
    marginBottom: 10,
    //marginTop: 10,
    width: "90%",
    padding: 15,
    borderRadius: 20,
    borderColor: "#08d4c4",
    //backgroundColor: "#e6ffff",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_login: {
    padding: 10,
    width: "90%",
    //width: "25%",
    //backgroundColor: "#08d4c4",
    borderRadius: 15,
    margin: 10,
    //marginLeft: 10,
    //marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    //borderStyle: "dashed",
  },
  title_text: {
    textAlign: "center",
    //margin: 10,
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  linearGradient: {
    //padding: 15,
    //width: "45%",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(Login);
