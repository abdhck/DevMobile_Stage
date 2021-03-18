import React from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import { decode } from "html-entities";

class FactureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoFacture: [],
      isLoading: false,
    };
  }

  _openDetail = (facture) => {
    if (decode(facture.etat) == "Reglé") {
      this.props.navigation.navigate("FactureRecus", { id: facture.id });
    } else {
      this.props.navigation.navigate("Payement", { id: facture.id });
    }
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
    console.log(this.props);
    return (
      <View style={styles.list}>
        <SafeAreaView>
          <FlatList
            data={this.props.dataFacture.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => (
              <FactureItem facture={item} openDetail={this._openDetail} />
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureList);
