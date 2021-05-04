import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ListItem,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import { SearchBar } from "react-native-elements";

class FactureSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: "",
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  searchItems = (text) => {
    let newData = this.props.dataFacture.filter((item) => {
      const itemData = `${item.perio.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });
    this.setState({
      data: newData,
      value: text,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="   Type Name..."
        onChangeText={(text) => this.searchItems(text)}
        value={this.state.value}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => (
            <FactureItem
              facture={item}
              openDetail={this._openDetail}
              openFactureDetail={this._openFactureDetail}
            />
          )}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 21,
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureSearch);

//export default FactureSearch;
