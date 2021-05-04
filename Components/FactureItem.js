import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import moment from "moment";
import numeral from "numeral";
import { decode } from "html-entities";
import { LinearGradient } from "expo-linear-gradient";
import { Title } from "react-native-paper";
//import Ripple from "react-native-material-ripple";
import FadeIn from "../Animations/FadeIn";
import FactureRecus from "../Components/FactureRecus";
//import { connect } from "react-redux";

const hauteur = Dimensions.get("window").height / 4;
const largeur = Dimensions.get("screen").width;

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
    var sourceImage = require("../Images/case-a-cocher.png");
    if (decode(facture.etat) !== "Reglé") {
      sourceImage = require("../Images/OM.png");
    }
    return <Image style={styles.facture_image} source={sourceImage} />;
  }

  _displayEyeImage() {
    var sourceImage = require("../Images/touch.png");
    return <Image style={styles.eye_image} source={sourceImage} />;
  }

  _couleurEtatFacture(facture) {
    if (decode(facture.etat) !== "Reglé") {
      return <Text style={styles.etat1_text}> {decode(facture.etat)} </Text>;
    } else {
      return <Text style={styles.etat2_text}> {decode(facture.etat)} </Text>;
    }
  }
  _voirRecuOuPayer(facture) {
    if (decode(facture.etat) !== "Reglé") {
      return <Text style={styles.etat_recu}> PAYER </Text>;
    } else {
      return <Text style={styles.etat_recu}> VOIR RECU </Text>;
    }
  }

  _displayDetailForFilm() {
    this.props.navigation.navigate("FactureRecus");
  }

  render() {
    //console.log("donnee facture: " + this.props);
    const { facture, openDetail, openFactureDetail } = this.props;
    //console.log("bug :" + openDetail);
    return (
      <View style={styles.main_container}>
        {/*<View style={styles.right}>{this._displayFactureImage(facture)}</View>*/}
        <TouchableOpacity
          onPress={() => {
            openFactureDetail(facture);
          }}
          activeOpacity={0.7}
        >
          <View style={styles.left}>
            <View style={styles.header}>
              <Text style={styles.date_text}> Facture N° {facture.numero}</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.body_align}>
                <Text style={styles.montant_text}> Montant :</Text>
                <Text style={styles.montant_decord}>
                  {numeral(facture.montantttc).format("0,0")}F{" "}
                </Text>
              </View>
              {/*<View style={styles.body_align}>
                <Text style={styles.montant_text}>Avance :</Text>
                <Text style={styles.montant_text}>
                  {numeral(facture.totat_regle).format("0,0")}F{" "}
                </Text>
              </View>
              <View style={styles.body_align}>
                <Text style={styles.montant_text}>Reste :</Text>
                <Text style={styles.montant_decord}>
                  {numeral(facture.reste).format("0,0")}F{" "}
                </Text>
        </View>*/}
            </View>
            <View style={styles.footer}>
              {/*<Text style={styles.client_text}> {facture.auteur_modif} </Text>*/}
              <View style={styles.body_align}>
                <Text style={styles.date_text}>
                  {" "}
                  Période de : {facture.perio}{" "}
                </Text>
                {this._displayEyeImage()}
              </View>
              {/* <Text style={styles.etat_text}>
                {" "}
                {this._couleurEtatFacture(facture)}{" "}
              </Text>*/}
            </View>
            {/*<View style={styles.btn_container}>{this._payement(facture)}</View>*/}
          </View>
        </TouchableOpacity>
        <View style={styles.right}>
          {/*<View style={styles.righthaut}>
            <Text> {this._couleurEtatFacture(facture)} </Text>
            </View>*/}

          <TouchableOpacity
            onPress={() => {
              openDetail(facture);
            }}
            style={styles.rightbas}
            activeOpacity={0.7}
          >
            {this._displayFactureImage(facture)}
            <Text> {this._voirRecuOuPayer(facture)} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    margin: 3,
    flex: 1,
    height: hauteur,
    width: largeur - 7,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    elevation: 1,
    borderRadius: 5,
    flexDirection: "row",
  },
  header: {
    justifyContent: "center",

    flex: 1,
  },
  body: {
    flex: 2,
    justifyContent: "center",
  },
  body_align: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // flexWrap: "wrap",
  },
  footer: {
    flex: 1,
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  left: {
    flex: 3,
    flexWrap: "wrap",
    width: (2 * largeur) / 3 + 25,
    justifyContent: "space-between",
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  right: {
    flex: 1,
    width: largeur / 3,
  },
  rightbas: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderLeftWidth: 1,
  },
  title_text: {
    fontSize: 15,
    flexWrap: "wrap",
    //color: "#2196F3",
  },
  date_text: {
    color: "grey",
    flexWrap: "wrap",
  },
  commentaire_text: {
    flexWrap: "wrap",
    color: "grey",
  },
  montant_text: {
    fontSize: 20,
    color: "grey",
  },
  montant_decord: {
    color: "#02519e",
    fontSize: 40,
  },
  etat_recu: {
    color: "#009387",
    fontWeight: "bold",
  },
  etat_payer: {
    color: "#02519e",
  },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn_payer: {
    height: 25,
    width: 70,
    borderRadius: 1,
  },
  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  etat1_text: {
    fontWeight: "bold",
    color: "#e43347",
  },
  etat2_text: {
    fontWeight: "bold",
    //color: "#009387",
    color: "#02519e",
  },
  facture_image: {
    width: 70,
    height: 70,
  },
  eye_image: {
    width: 21,
    height: 21,
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
