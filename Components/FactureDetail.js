import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  LinearGradient,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import numeral from "numeral";
import moment from "moment";
import { decode } from "html-entities";
import { Title, Caption } from "react-native-paper";

const longueur = Dimensions.get("screen").height / 2;
const largeur = Dimensions.get("window").width / 2 + 100;
class FactureDetail extends React.Component {
  LogoTitle() {
    return (
      <TouchableOpacity style={styles.iconpos}>
        <Image
          source={require("../Images/netforce.jpg")}
          style={styles.iconbar}
        />
      </TouchableOpacity>
    );
  }
  _detail(facture) {
    return (
      <View>
        <Text style={styles.title_text}>{facture.type}</Text>
        <Text>{facture.titre}</Text>
        <Text> numero de la facture: {facture.numero}</Text>
        <Text> Le client: {facture.client}</Text>
        <Text> Date: {facture.perio}</Text>
        <Text> Montant hors taxte: {facture.montantht}</Text>
        <Text> Montant tout taxte comprise: {facture.montantttc}</Text>
        <Text> Etat Payement: {facture.etat}</Text>
        <Text> Commentaire: {facture.commentaire}</Text>
      </View>
    );
  }
  _couleurEtatFacture(facture) {
    if (decode(facture.etat) !== "Reglé") {
      return <Text style={styles.etat1_text}> {decode(facture.etat)} </Text>;
    } else {
      return <Text style={styles.etat2_text}> {decode(facture.etat)} </Text>;
    }
  }
  _retour = () => {
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
  };
  render() {
    const { facture } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.main_recus}>
          <View style={styles.header}>
            <View style={styles.espace_logo}>{this.LogoTitle()}</View>
            <View style={styles.espace_type}>
              <Title style={styles.title_text}>{facture.titre}</Title>
              <Text style={styles.espace_ref}>num fact: {facture.numero}</Text>
              <Text style={styles.espace_ref}>ref fact: {facture.ref}</Text>
              <Text style={styles.periode}>
                Date: {moment(facture.perio).format("MMMM YYYY")}
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.body_left}>
              <Text style={styles.libelle}>{"  "}Libéllés</Text>
              <Text>
                {"  "}Le client{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Montant Hors Taxtes{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Montant TTC{"  "}:{" "}
              </Text>

              {/*<Text>
                {"  "}Main d'oeuvre{"  "}:
              </Text>

              <Text>
                {"  "}Marge{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Marge total{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Remise{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Remise total{"  "}:{" "}
              </Text>
              <Text>
                {"  "}Pénalité{"  "}:{" "}
              </Text>*/}
            </View>
            <View style={styles.body_right}>
              <Text style={styles.libelle}>{"  "}Prix</Text>
              <Text> {facture.client}</Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.montantht).format("0,0")}
                {" F "}
              </Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.montantttc).format("0,0")}
                {" F "}
              </Text>
              {/*<Text style={styles.montant_text}>
                {" "}
                {numeral(facture.main_doeuvre).format("0,0")}
                {" F "}
              </Text>

              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.marge).format("0,0")}
                {" F "}
              </Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.total_marge).format("0,0")}
                {" F "}
              </Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.remise).format("0,0")}
                {" F "}
              </Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.total_remise).format("0,0")}
                {" F "}
              </Text>
              <Text style={styles.montant_text}>
                {" "}
                {numeral(facture.penalite).format("0,0")}
                {" F "}
              </Text>*/}
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.montant_text}>
              {"  "}Montant total{"  "}:{" "}
              {numeral(facture.montantttc).format("0,0")}
              {" F "}
            </Text>
            <Text style={styles.montant_text}>
              {"  "}Total réglé{"  "}:{" "}
              {numeral(facture.totat_regle).format("0,0")}
              {" F "}
            </Text>
            <Text style={styles.montant_text}>
              {"  "}Reste{"  "}: {numeral(facture.reste).format("0,0")}
              {" F "}
            </Text>

            <Text style={styles.montant_text}>
              {"  "}Etat{"  "}: {this._couleurEtatFacture(facture)}
            </Text>
          </View>
          <Text style={styles.date}>
            Edité le: {moment(facture.date).format("LL")}
          </Text>
          <View style={styles.footer_end}>
            <Text style={styles.signature}>
              {"  "}DG NetForce{"  "}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  headertitle: {
    alignItems: "center",
  },
  body: {
    flex: 2,
    //borderTopWidth: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  body_left: {
    flex: 3,
  },
  body_right: {
    flex: 2,
  },
  footer: {
    flex: 2,
  },
  footer_end: {
    alignItems: "flex-end",
    margin: 10,
  },
  main_recus: {
    flex: 1,
    flexWrap: "wrap",
    margin: 10,
    backgroundColor: "#fff",
    height: longueur,
    //width: largeur,
    borderColor: "#eee",
    borderRadius: 1,
    borderWidth: 1,
    //alignItems: "center",
  },
  espace_logo: {
    flex: 1,
  },
  espace_type: {
    flex: 3,
    alignItems: "flex-end",
    fontSize: 11,
    marginRight: 19,
  },
  espace_ref: {
    //fontStyle: "italic",
    color: "grey",
    fontSize: 11,
  },
  libelle: {
    fontWeight: "bold",
    //fontStyle: "italic",
    color: "#fff",
    marginBottom: 5,
    //borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: "#02519e",
  },
  signature: {
    justifyContent: "center",
    fontWeight: "bold",
    //fontStyle: "italic",
    color: "#02519e",
    justifyContent: "flex-end",
    // margin: 20,
  },
  periode: {
    //marginLeft: 10,
    // fontStyle: "italic",
    color: "#e43347",
    padding: 3,
  },
  date: {
    marginLeft: 10,
    // //fontStyle: "italic",
    color: "#666",
  },
  iconbar: {
    width: 70,
    height: 70,
  },
  iconpos: {
    left: 20,
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
    fontSize: 14,
  },
  etat1_text: {
    fontWeight: "bold",
    //fontStyle: "italic",
    color: "#e43347",
  },
  etat2_text: {
    fontWeight: "bold",
    // fontStyle: "italic",
    color: "#009387",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureDetail);
