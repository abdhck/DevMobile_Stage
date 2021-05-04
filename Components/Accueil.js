import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  LinearGradient,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import numeral from "numeral";
import moment from "moment";
import { decode } from "html-entities";
import { Title, Subheading, Headline } from "react-native-paper";
import { Image, Avatar, Badge, Icon, withBadge } from "react-native-elements";
import { Button } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const hauteur = Dimensions.get("window").height / 3;
const largeur = Dimensions.get("window").width;

const ICON_TAILLE = 47;

class Accueil extends React.Component {
  _groupBy(tableauObjets, propriete) {
    return tableauObjets.reduce(function (acc, obj) {
      var cle = obj[propriete];
      if (!acc[cle]) {
        acc[cle] = [];
      }
      acc[cle].push(obj);
      return acc;
    }, {});
  }

  _montant(facture) {
    var x = 0,
      y = 0;
    for (var i = 0; i < facture.length; i++) {
      x = parseInt(facture[i].montantttc);
      y = y + x;
    }
    return y;
  }

  _nombreDeFacture(facture) {
    var nombre = 0;
    for (var i = 0; i < facture.length; i++) {
      nombre++;
    }
    return nombre;
  }
  _displayButton(facture, openFacture, image) {
    return (
      <TouchableOpacity
        onPress={() => {
          openFacture(facture);
        }}
        activeOpacity={0.7}
        style={styles.container_btn}
      >
        <Text style={styles.text_btn}>Voir la liste des factures</Text>
      </TouchableOpacity>
    );
  }
  _displayFactureImage(facture) {
    var sourceImage = require("../Images/touch-screen.png");
    return <Image style={styles.facture_image} source={sourceImage} />;
  }
  _displayHomeImage() {
    var sourceImage = require("../Images/netforce.jpg");
    return (
      <View style={styles.container_image}>
        <ImageBackground
          style={styles.home_image}
          source={sourceImage}
        ></ImageBackground>
      </View>
    );
  }
  _displayHomeImageFacuture() {
    var sourceImage = require("../Images/OM.png");
    return (
      <View style={styles.container_image}>
        <ImageBackground
          style={styles.home_image}
          source={sourceImage}
        ></ImageBackground>
      </View>
    );
  }
  _displayImagePaye() {
    var sourceImage = require("../Images/dinero.png");
    return (
      <View style={styles.container_image}>
        <ImageBackground
          style={styles.home_image}
          source={sourceImage}
        ></ImageBackground>
      </View>
    );
  }

  _displayImageTotal() {
    var sourceImage = require("../Images/dinero.png");
    return (
      <View style={styles.container_image}>
        <ImageBackground style={styles.home_image} source={sourceImage}>
          <Text>Inside</Text>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const {
      openFactureListe,
      openFactureImpayee,
      openFacturePayee,
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
              <Text style={styles.total_text_impayer}>Total impayées </Text>
              <Text style={styles.montant_impayee}>
                {numeral(this._montant(factureImpayee)).format("0,0")}F{" "}
              </Text>
            </View>
            <View style={styles.card_right_container}>
              <Text style={styles.total_text_payer}>Total payées </Text>
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
            openFacturePayee();
          }}
          activeOpacity={0.7}
          style={styles.container_btn_payee}
        >
          <View style={styles.btn_image_payee}>
            <AntDesign name="pptfile1" size={ICON_TAILLE} color={"#5cb85c"} />
          </View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>Voir facture payée</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            openFactureImpayee();
          }}
          activeOpacity={0.7}
          style={styles.container_btn_impayee}
        >
          <View style={styles.btn_image_impayee}>
            <AntDesign name="exclefile1" size={ICON_TAILLE} color={"#e43347"} />
          </View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>Voir facture impayée</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            openFactureListe();
          }}
          activeOpacity={0.7}
          style={styles.container_all_btn}
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
  },
  container: {
    //height: hauteur / 2,
    //marginTop: 17,
    flexDirection: "row",
    //flex: 1,
    backgroundColor: "#fff",
    //padding: 3,
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
    // alignItems: "flex-start",
    // borderRadius: 1,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    paddingLeft: 7,
    borderLeftColor: "#02519e",
  },
  card_center_container: {
    //flex: 1,
    flexDirection: "column",
    // borderRadius: 1,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 0.5,
    margin: 5,
  },
  card_center_title: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    //borderRadius: 3,
  },
  card_groupe_container: {
    //flex: 1,
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
  total_text_impayer: {
    //fontSize: 17,
    color: "grey",
  },
  total_text_payer: {
    //fontSize: 13,
    color: "grey",
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
    color: "grey",
    fontWeight: "300",
    //fontSize: 17,
  },
  title_text: {
    fontSize: 25,
    fontWeight: "700",
    color: "grey",
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
    //paddingLeft: 7,
  },
  nombre_impayee: {
    color: "#e43347",
    justifyContent: "center",
    fontSize: 37,
    alignItems: "center",
    //paddingLeft: 7,
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
    //flex: 1,
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
    elevation: 3,
  },
  container_btn_payee: {
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
    elevation: 1,
  },
  container_btn_impayee: {
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
    elevation: 1,
  },
  btn_impayee: {
    //flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // borderWidth: 1,
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
    color: "grey",
    // fontWeight: "600",
    fontSize: 21,
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
