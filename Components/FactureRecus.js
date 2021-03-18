import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const longueur = Dimensions.get("screen").height / 2 + 100;
const largeur = Dimensions.get("window").width / 2 + 100;

class FactureRecus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longueur,
      largeur,
    };
  }

  _retour() {
    return (
      <View style={styles.btn_container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("FactureList");
          }}
        >
          <LinearGradient
            colors={["#08d4c4", "#01ab9d"]}
            style={styles.btn_payer}
          >
            <Text style={styles.btn_text}> Home </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main_recus}>
          <Text style={styles.title_text}>
            {" "}
            Le reçu de la facture : {this.props.route.params.id}
          </Text>
        </View>
        {this._retour()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  main_recus: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: longueur,
    width: largeur,
    borderColor: "#000",
    borderRadius: 1,
    borderWidth: 1,
    elevation: 20,
  },
  btn_container: {
    marginBottom: 25,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_payer: {
    height: 35,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default FactureRecus;
