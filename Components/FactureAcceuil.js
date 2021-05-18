import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import FactureCalculAcceuil from "./FactureCalculAcceuil";
import Accueil from "./Accueil";
import { decode } from "html-entities";
import Carousel from "../Carousels/Carousel";
import { testApi } from "../API/FactureAPI";

const largeur = Dimensions.get("screen").height;
const ITEM_HEIGHT = largeur / 4;

class FactureAcceuil extends React.Component {
  constructor(props) {
    super(props);
    this.compteur = 0;
    this.factureLimte = [];
    this.state = {
      infoFacture: [],
      isLoading: false,
      loginIdent: "",
    };
  }

  componentDidMount = () => {
    testApi(loginIdent).then((data) => {
      this.setState({
        infoFacture: [...this.state.infoFacture, ...data],
        isLoading: false,
      });
      if (data.length !== 0) {
        this._toggleLogin();
        this._toggleLogin1();
        this._toggleLogin2();
      }
    });
  };
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

  _openDetail = (facture) => {
    if (decode(facture.etat) == "Reglé") {
      this.props.navigation.navigate("FactureRecus", { id: facture.id });
    } else {
      this.props.navigation.navigate("Payement", { id: facture.id });
    }
  };
  _openFactureDetail = (facture) => {
    this.props.navigation.navigate("FactureDetail", { facture: facture });
  };
  _openFactureListe = () => {
    this.props.navigation.navigate("FactureList");
  };
  _openFactureImpayee = () => {
    this.props.navigation.navigate("ImpayerStackNavigator");
  };
  _openFacturePayee = () => {
    this.props.navigation.navigate("PayerStackNavigator");
  };
  _openFactureSearch = () => {
    this.props.navigation.navigate("FactureSearch");
  };

  _displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#212121" />
        </View>
      );
    }
  };

  _factureLimite = (factureListe) => {
    var facture = [];
    var data = factureListe.sort((a, b) => new Date(b.date) - new Date(a.date));
    for (var i = this.compteur; i < this.compteur + 3; i++) {
      if (i <= factureListe.length) {
        facture.push(data[i]);
      }
    }
    return facture;
  };
  _displayButton = (facture, openFacture) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ isLoading: true });
          openFacture(facture);
        }}
        activeOpacity={1}
        style={styles.container_btn}
      >
        <Text style={styles.text_btn}>Voir la liste des factures</Text>
      </TouchableOpacity>
    );
  };
  render() {
    var factureTmp = this._factureLimite(this.props.dataFacture);
    for (var i = 0; i < factureTmp.length; i++) {
      this.factureLimte.push(factureTmp[i]);
    }
    return (
      <View style={styles.list}>
        <ScrollView style={styles.container}>
          <Accueil
            openFactureListe={this._openFactureListe}
            openFactureImpayee={this._openFactureImpayee}
            openFacturePayee={this._openFacturePayee}
            openFactureSearch={this._openFactureSearch}
          />
          {/*this._displayButton(this.props.dataFacture, this._openFactureListe)*/}
        </ScrollView>
        {/* <Carousel />*/}

        {/*
        <FlatList
          data={factureTmp}
          keyExtractor={(_, index) => `${index}`}
          pagingEnabled
          // maxToRenderPerBatch={2}
          //windowSize={1}
          //updateCellsBatchingPeriod={50000}
          //snapToInterval={ITEM_HEIGHT}
          // decelerationRate="fast"
          //initialNumToRender={3}
          // initialScrollIndex={this.props.compteur}
          renderItem={({ item }) => (
            <FactureItem
              facture={item}
              openDetail={this._openDetail}
              openFactureDetail={this._openFactureDetail}
            />
          )}
          /*   onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.compteur += 3;
              factureTmp = this._factureLimite(this.props.dataFacture);
              //this.factureLimte = this.factureLimte.concat(factureTmp);
              for (var i = 0; i < factureTmp.length; i++) {
                this.factureLimte.push(factureTmp[i]);
              }
            }}*
        />
       */}
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
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
  container_btn: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0ad4e",
  },
  text_btn: {
    fontSize: 21,
  },
  container: {
    //flex: 1,
    //backgroundColor: "#fff",
    // height: 120,
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
    loginIdent: state.loginIdent,
  };
};

export default connect(mapStateToProps)(FactureAcceuil);
