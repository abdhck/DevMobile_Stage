import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import FactureCalculAcceuil from "./FactureCalculAcceuil";
import { decode } from "html-entities";
//import * as Animatable from "react-native-animatable";
//MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const largeur = Dimensions.get("screen").height;
const ITEM_HEIGHT = largeur / 4;

class FactureList extends React.Component {
  constructor(props) {
    super(props);
    this.compteur = 1;
    this.state = {
      infoFacture: [],
      isLoading: false,
      refreshing: false,
    };
  }
  handleRefresh = () => {
    this.setState(
      { refreshing: true },
      () => (this.props.compteur = this.props.compteur + 3)
    );
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

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#212121" />
        </View>
      );
    }
  }

  render() {
    //console.log(this.props);
    return (
      <View style={styles.list}>
        <View>
          <FlatList
            data={this.props.dataFacture.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
            keyExtractor={(_, index) => `${index}`}
            pagingEnabled
            //  maxToRenderPerBatch={2}
            //windowSize={1}
            //updateCellsBatchingPeriod={50000}
            // initialNumToRender={3}
            // initialScrollIndex={this.props.compteur}
            // snapToInterval={ITEM_HEIGHT}
            renderItem={({ item }) => (
              <FactureItem
                facture={item}
                openDetail={this._openDetail}
                openFactureDetail={this._openFactureDetail}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureList);
