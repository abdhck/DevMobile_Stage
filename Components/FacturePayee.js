import React from "react";
import { View, Text, textinput, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import { decode } from "html-entities";

class FacturePayee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facturePayee: [],
      isLoading: false,
    };
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#212121" />
        </View>
      );
    }
  }

  _openDetail = (facture) => {
    if (decode(facture.etat) == "Reglé") {
      this.props.navigation.navigate("FactureRecus", { id: facture.id });
    } else {
      this.props.navigation.navigate("Payement", { id: facture.id });
    }
  };

  render() {
    console.log(this.props);
    return (
      <View>
        <FlatList
          data={this.props.facturePayee.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => (
            <FactureItem facture={item} openDetail={this._openDetail} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    facturePayee: state.facturePayee,
  };
};

export default connect(mapStateToProps)(FacturePayee);
