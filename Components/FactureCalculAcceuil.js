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

const hauteur = Dimensions.get("window").height / 3;
const largeur = Dimensions.get("window").width;

class FactureCalculAcceuil extends React.Component {
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
          this.setState({ isLoading: true });
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
    {
      /*var groupeFactureRegle = this._groupBy(facture, "Reglé");
    var groupeFactureNonRegle = this._groupBy(facture, "Regl&eacute;");
    var valeurInitiale = 0;
    var sommeRegle = groupeFactureRegle.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante.x,
      valeurInitiale
    );
    var sommeNonRegle = groupeFactureNonRegle.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante.x,
      valeurInitiale
    );*/
    }
    const { openFactureListe } = this.props;
    var facture = this.props.dataFacture;
    var facturePayee = this.props.facturePayee;
    var factureImpayee = this.props.factureImpayee;
    return (
      <View style={styles.main_container}>
        <Text style={styles.montant}>
          <Text style={styles.titre}>Dépense : </Text>{" "}
          {numeral(this._montant(facturePayee)).format("0,0")}F{" "}
        </Text>
        <ScrollView horizontal={true}>
          <View style={styles.right}>
            {this._displayHomeImage()}
            <View style={styles.right1}>
              <Text style={styles.title_header}>Factures </Text>
              {/*this._displayImagePaye()*/}
              <View style={styles.body_payee}>
                <Text style={styles.titre}>Payée </Text>
                <Text style={styles.montant}>
                  {this._nombreDeFacture(facturePayee)}
                </Text>
              </View>
              <View style={styles.body_impayee}>
                {/* <Badge status="warning" />*/}
                <Text style={styles.titre}>Impayée </Text>
                <Text style={styles.montant}>
                  {this._nombreDeFacture(factureImpayee)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  openFactureListe(facture);
                }}
                activeOpacity={0.7}
                style={styles.body_total}
              >
                {/*this._displayFactureImage()*/}
                <Text style={styles.titre}>Total </Text>
                <Text style={styles.montant}>
                  {this._nombreDeFacture(facture)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.right}>
            {this._displayHomeImageFacuture()}
            <View style={styles.right1}>
              <Text style={styles.title_header}>Montant </Text>
              <Text style={styles.title}>Payée </Text>
              {/*this._displayImagePaye()*/}
              <View style={styles.body_payee}>
                <Text style={styles.montant}>
                  {numeral(this._montant(facturePayee)).format("0,0")}F{" "}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            {this._displayHomeImageFacuture()}
            <View style={styles.right1}>
              <Text style={styles.title_header}>Montant </Text>
              <Text style={styles.title}>Impayée </Text>
              {/*this._displayImagePaye()*/}
              <View style={styles.body_impayee}>
                <Text style={styles.montant}>
                  {numeral(this._montant(factureImpayee)).format("0,0")}F{" "}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            {this._displayHomeImageFacuture()}
            <View style={styles.right1}>
              <Text style={styles.title_header}>Montant </Text>
              <Text style={styles.title}>Total </Text>
              {/*this._displayImagePaye()*/}
              <View style={styles.body_total}>
                <Text style={styles.montant}>
                  {numeral(this._montant(facture)).format("0,0")}F{" "}
                </Text>
              </View>
            </View>
          </View>
          {/*<View style={styles.right}>
            <Text style={styles.titre}>Factures impayé :</Text>
            <Text style={styles.montant_payer1}>
              {this._nombreDeFactureNonRegle(facture)}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.titre}>Total des Factures : </Text>
            <Text style={styles.montant_payer1}>
              {this._nombreTotalDesFactureRegle(facture)}
            </Text>
    </View>
    
     <TouchableOpacity
          onPress={() => {
            openFactureListe(facture);
          }}
          activeOpacity={0.7}
          style={styles.bottom}
        >
          <View style={styles.bottom1}>
            <Text style={styles.titre_btn}>Voir toutes les factures </Text>
            <Badge value={this._displayFactureImage()} />
          </View>
        </TouchableOpacity>
    
    */}
        </ScrollView>
        {this._displayButton(facture, openFactureListe)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: hauteur + 53,
    backgroundColor: "#02519e",
    padding: 3,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  body_payee: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5cb85c",
    backgroundColor: "#5cb85c",
    margin: 3,
    borderRadius: 1,
  },
  body_impayee: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0ad4e",
    backgroundColor: "#f0ad4e",
    margin: 3,
    borderRadius: 1,
  },
  body_total: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0275d8",
    backgroundColor: "#0275d8",
    margin: 3,
    borderRadius: 1,
  },
  body1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    //borderBottomWidth: 1,
    //borderColor: "#02519e",
  },
  right: {
    flex: 1,
    // width: largeur,
    borderColor: "#fff",
    backgroundColor: "#fff",
    margin: 3,
    borderWidth: 1,
    padding: 10,
    height: hauteur - 45,
    elevation: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  right1: {
    flex: 1,
    //width: largeur / 2,
    borderColor: "#02519e",
    //borderLeftWidth: 1,
  },
  bottom: {
    //flex: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    margin: 1,
    borderWidth: 1,
    height: 40,
    //width: "95%",
  },
  bottom1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: largeur,
  },
  titre: {
    color: "#fff",
    fontSize: 17,
    // fontWeight: "bold",
  },
  title_header: {
    color: "#0275d8",
    justifyContent: "center",
    fontSize: 30,
    alignItems: "center",
    fontWeight: "bold",
  },
  title: {
    color: "#0275d8",
    //justifyContent: "center",
    fontSize: 20,
    //alignItems: "center",
    //fontWeight: "bold",
  },
  title_payee: {
    color: "orange",
    //justifyContent: "center",
    fontSize: 20,
    //alignItems: "center",
    //fontWeight: "bold",
  },
  titre_btn: {
    color: "#02519e",
  },
  montant: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 35,
    alignItems: "center",
    paddingLeft: 7,
  },
  montant_impayer: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 30,
    alignItems: "center",
    fontWeight: "bold",
  },
  montant_total: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 30,
    alignItems: "center",
    fontWeight: "bold",
  },
  facture_image: {
    width: 31,
    height: 31,
  },
  home_image: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "center",
    alignItems: "flex-start",
    width: 150,
    height: 150,
  },
  container_image: {
    flex: 1,
    justifyContent: "center",
  },
  header_btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 3,
  },
  header_border_btn: {
    color: "#fff",
    borderColor: "#000",
    height: 30,
  },
  container_btn: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text_btn: {
    fontSize: 21,
    //color: "#02519e",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
    facturePayee: state.facturePayee,
    factureImpayee: state.factureImpayee,
  };
};

export default connect(mapStateToProps)(FactureCalculAcceuil);

//export default FactureCalculAcceuil;
