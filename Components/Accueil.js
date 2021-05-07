import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import numeral from "numeral";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const hauteur = Dimensions.get("window").height / 3;
const largeur = Dimensions.get("window").width;

const ICON_TAILLE = 47;

class Accueil extends React.Component {
  _montant = (facture) => {
    var x = 0,
      y = 0;
    for (var i = 0; i < facture.length; i++) {
      x = parseInt(facture[i].montantttc);
      y = y + x;
    }
    return y;
  };

  _nombreDeFacture = (facture) => {
    var nombre = 0;
    for (var i = 0; i < facture.length; i++) {
      nombre++;
    }
    return nombre;
  };

  _displayHomeImage = () => {
    var sourceImage = require("../Images/netforce.jpg");
    return (
      <View style={styles.container_image}>
        <ImageBackground
          style={styles.home_image}
          source={sourceImage}
        ></ImageBackground>
      </View>
    );
  };

  render() {
    const {
      openFactureListe,
      openFactureImpayee,
      openFacturePayee,
      openFactureSearch,
    } = this.props;
    var facture = this.props.dataFacture;
    var facturePayee = this.props.facturePayee;
    var factureImpayee = this.props.factureImpayee;
    return (
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          {/*<View style={styles.logo_header}>
            {this._displayHomeImage()}
            <Text style={styles.logo_title}>Gestion des factures</Text>
    </View>*/}
          <View style={styles.vue_montant}>
            <Text style={styles.titre}>Somme total : </Text>
            <View style={styles.badge}>
              <Text style={styles.montant}>
                {numeral(this._montant(facture)).format("0,0")}F{" "}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.card_left_container}>
              <Text style={styles.total_text}>Total impayées </Text>
              <Text style={styles.montant_impayee}>
                {numeral(this._montant(factureImpayee)).format("0,0")}F{" "}
              </Text>
            </View>
            <View style={styles.card_right_container}>
              <Text style={styles.total_text}>Total payées </Text>
              <Text style={styles.montant_payee}>
                {numeral(this._montant(facturePayee)).format("0,0")}F{" "}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card_center_container}>
          <View style={styles.card_center_title}>
            <Text style={styles.title_text}>Nombre de factures </Text>
          </View>
          <View style={styles.card_groupe_container}>
            <View style={styles.card_center_payee}>
              <Text style={styles.nombre_text}>Payée </Text>
              <Text style={styles.nombre_payee}>
                {this._nombreDeFacture(facturePayee)}
              </Text>
            </View>
            <View style={styles.card_center_impayee}>
              <Text style={styles.nombre_text}>Impayée </Text>
              <Text style={styles.nombre_impayee}>
                {this._nombreDeFacture(factureImpayee)}
              </Text>
            </View>
            <View style={styles.card_center_total}>
              <Text style={styles.nombre_text}>Total </Text>
              <Text style={styles.nombre_total}>
                {this._nombreDeFacture(facture)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            openFactureSearch();
          }}
          activeOpacity={0.7}
          style={styles.container_btn}
        >
          <View style={styles.btn_image_payee}>
            <Ionicons
              name="search-outline"
              size={ICON_TAILLE}
              color={"#5cb85c"}
            />
          </View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>Rechercher une facture</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            openFactureListe();
          }}
          activeOpacity={0.7}
          style={styles.container_btn}
        >
          <View style={styles.btn_image_tout}>
            <Ionicons
              name="md-documents-outline"
              size={ICON_TAILLE}
              color={"#02519e"}
            />
          </View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>Voir toutes les factures</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} style={styles.container_all_btn}>
          <View style={styles.btn_image_tout}>{this._displayHomeImage()}</View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>NetPay</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    //flex: 1,
  },
  header_container: {
    //height: hauteur - 77,
    backgroundColor: "#02519e",
    padding: 3,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginBottom: 3,
  },
  container: {
    //height: hauteur / 2,
    //marginTop: 17,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    margin: 5,
    elevation: 3,
  },
  card_left_container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 3,
    justifyContent: "space-around",
  },
  card_right_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    borderLeftWidth: 1,
    borderStyle: "dashed",
    paddingLeft: 7,
    borderLeftColor: "#02519e",
  },
  card_center_container: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 0.3,
    margin: 5,
  },
  card_center_title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  card_groupe_container: {
    flexDirection: "row",
  },
  card_center_payee: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingLeft: 5,
  },
  card_center_impayee: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
    borderStyle: "dashed",
    backgroundColor: "#fff",
    paddingLeft: 5,
  },
  card_center_total: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
    borderStyle: "dashed",
    backgroundColor: "#fff",
    paddingLeft: 5,
  },
  montant: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 31,
    alignItems: "center",
    padding: 3,
    // marginTop: 7,
  },
  vue_montant: {
    //justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 3,
  },
  total_text: {
    fontSize: 17,
    color: "#5d6b78",
  },
  montant_impayee: {
    color: "#e43347",
    fontSize: 31,
  },
  montant_payee: {
    color: "#5cb85c",
    fontSize: 31,
  },
  badge: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#5cb85c",
    justifyContent: "center",
    borderRadius: 7,
    alignItems: "center",
  },
  nombre_text: {
    color: "#5d6b78",
    fontWeight: "300",
    fontSize: 17,
  },
  title_text: {
    fontSize: 25,
    fontWeight: "700",
    color: "#5d6b78",
  },
  titre: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 19,
    alignItems: "center",
    paddingLeft: 7,
  },
  nombre_payee: {
    color: "#5cb85c",
    justifyContent: "center",
    fontSize: 37,
    alignItems: "center",
  },
  nombre_impayee: {
    color: "#e43347",
    justifyContent: "center",
    fontSize: 37,
    alignItems: "center",
  },
  nombre_total: {
    color: "#02519e",
    justifyContent: "center",
    fontSize: 37,
    alignItems: "center",
    //paddingLeft: 7,
  },
  home_image: {
    alignItems: "flex-start",
    width: 60,
    height: 60,
  },
  container_image: {
    justifyContent: "center",
  },
  logo_header: {
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  logo_title: {
    color: "#fff",
    fontSize: 31,
    paddingLeft: 7,
  },
  container_all_btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    margin: 5,
    height: hauteur / 3,
    elevation: 0.3,
  },
  container_btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    margin: 5,
    marginLeft: 21,
    marginRight: 21,
    height: hauteur / 3,
    elevation: 3,
  },
  btn_image_impayee: {
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#e43347",
    alignItems: "center",
  },
  btn_image_payee: {
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#5cb85c",
    alignItems: "center",
  },
  btn_image_tout: {
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#02519e",
    alignItems: "center",
  },

  btn_text_container: {
    flex: 2,
    alignItems: "center",
    color: "#02519e",
  },
  btn_text: {
    color: "#5d6b78",
    fontSize: 19,
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
    facturePayee: state.facturePayee,
    factureImpayee: state.factureImpayee,
  };
};

export default connect(mapStateToProps)(Accueil);
