import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import numeral from "numeral";
import { decode } from "html-entities";
import { LinearGradient } from "expo-linear-gradient";
import { Title } from "react-native-paper";
//import Ripple from "react-native-material-ripple";
import FadeIn from "../Animations/FadeIn";
import FactureRecus from "../Components/FactureRecus";
//import { connect } from "react-redux";

class FactureItem extends React.Component {
  _payement(facture) {
    if (decode(facture.etat) !== "Reglé") {
      return (
        <View style={styles.btn_container}>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.btn_payer}
            >
              <Text style={styles.btn_text}> Payer </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _displayFactureImage(facture) {
    var sourceImage = require("../Images/right-arrow.png");
    if (decode(facture.etat) !== "Reglé") {
      sourceImage = require("../Images/right-arrow.png");
    }
    return <Image style={styles.facture_image} source={sourceImage} />;
  }

  _couleurEtatFacture(facture) {
    if (decode(facture.etat) !== "Reglé") {
      return <Text style={styles.etat1_text}> {decode(facture.etat)} </Text>;
    } else {
      return <Text style={styles.etat2_text}> {decode(facture.etat)} </Text>;
    }
  }

  _displayDetailForFilm() {
    this.props.navigation.navigate("FactureRecus");
  }

  render() {
    //console.log("donnee facture: " + this.props);
    const { facture, openDetail } = this.props;
    console.log("bug :" + openDetail);
    return (
      <View style={styles.main_container}>
        {/*<View style={styles.right}>{this._displayFactureImage(facture)}</View>*/}
        <TouchableOpacity
          onPress={() => {
            openDetail(facture);
          }}
          style={styles.left}
        >
          <View>
            <View style={styles.header}>
              <Title style={styles.title_text} numberOfLines={1}>
                {" "}
                {facture.titre}{" "}
              </Title>
              <Text style={styles.date_text}>
                {moment(facture.date).format("L")}{" "}
              </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.commentaire_text}>
                {" "}
                {facture.commentaire}{" "}
              </Text>
            </View>
            <View style={styles.footer}>
              {/*<Text style={styles.client_text}> {facture.auteur_modif} </Text>*/}
              <Text style={styles.montant_text}>
                {" "}
                Montant :{" "}
                {
                  (facture.montantttc = numeral(facture.montantttc).format(
                    "0,0"
                  ))
                }
                F
              </Text>
              <Text style={styles.etat_text}>
                {" "}
                {this._couleurEtatFacture(facture)}{" "}
              </Text>
            </View>
            {/*<View style={styles.btn_container}>{this._payement(facture)}</View>*/}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openDetail(facture);
          }}
        >
          <View style={styles.right}>{this._displayFactureImage(facture)}</View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    //margin: 2,
    flex: 1,
    //height: 70,
    //borderWidth: 1,
    // borderColor: "#eee",
    justifyContent: "center",
    //width: 100,
    //backgroundColor: "#fff",
    //elevation: 1,
    //borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    //backgroundColor: "grey",
    //height: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  body: {
    //height: 45,
    borderColor: "#000",
    //alignItems: "center",
    //flex: 2,
    flexDirection: "row",
    //justifyContent: "space-around",
  },
  footer: {
    flexDirection: "row",
    //flex: 1,
    // backgroundColor: "green",
    //height: 40,
    justifyContent: "space-between",
    marginBottom: 3,
  },
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: 60,
    //height: 70,
    //borderRadius: 30,
    backgroundColor: "#fff",
    //borderTopRightRadius: 20,
    //borderBottomRightRadius: 20,
    //marginRight: 3,
    //elevation: 3,
    borderBottomWidth: 2,
    borderColor: "#eee",
  },
  left: {
    flex: 4,
    justifyContent: "center",
    borderColor: "#eee",
    //borderWidth: 1,
    // width: 70,
    //height: 70,
    //borderTopLeftRadius: 15,
    //borderBottomLeftRadius: 15,
    //alignItems: "center",
    backgroundColor: "#fff",
    //borderTopRightRadius: 10,
    //borderBottomRightRadius: 10,
    borderBottomWidth: 2,
    marginLeft: 3,
    //marginRight: 3,
  },
  title_text: {
    // fontWeight: "bold",
    fontSize: 15,
    //flex: 1,
    flexWrap: "wrap",
    //paddingRight: 5,
    //fontStyle: "italic",
    //color: "#2196F3",
  },
  date_text: {
    //fontWeight: "bold",
    //fontSize: 26,
    color: "#02519e",
    fontStyle: "italic",
  },
  commentaire_text: {
    flexWrap: "wrap",
    color: "#666666",
    //flex: 1,
    fontStyle: "italic",
  },
  montant_text: {
    fontSize: 13,
    fontStyle: "italic",
  },
  client_text: {
    //paddingRight: 5,
    //flex: 1,
  },
  etat_text: {
    //fontWeight: "bold",
    //fontWeight: "bold",
    fontStyle: "italic",
    color: "#009387",
  },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn_payer: {
    height: 25,
    width: 70,
    borderRadius: 10,
  },
  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    //borderStyle: "dashed",
  },
  etat1_text: {
    fontWeight: "bold",
    //fontWeight: "bold",
    fontStyle: "italic",
    color: "#e43347",
  },
  etat2_text: {
    fontWeight: "bold",
    //fontWeight: "bold",
    fontStyle: "italic",
    color: "#009387",
  },
  facture_image: {
    //flex: 1,
    width: 25,
    height: 25,
    // borderRadius: 30,
    //backgroundColor: "#ff9900",
  },
});

export default FactureItem;

/*
const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureItem);
*/
