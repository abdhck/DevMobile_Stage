import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ListItem,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";
import FactureItem from "./FactureItem";
import { SearchBar } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { RadioButton } from "react-native-paper";
import { decode } from "html-entities";

const hauteur = Dimensions.get("window").height / 3;

const ICON_TAILLE = 47;

class FactureSearch extends React.Component {
  constructor(props) {
    super(props);
    //displayFormat = "DD/MM/YYYY";
    this.state = {
      data: [],
      value: "",
      isDatePickerVisible: false,
      date: "",
      displayFormat: "MM-YYYY",
      checked: "Mois/Année",
      dateFilterFormat: "YYYY-MM",
    };
  }

  /********************** configuration du calendrier ***************************/
  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
      date: "",
    });
  };

  handleConfirm = (dateInput) => {
    this.setState({
      date: dateInput,
      isDatePickerVisible: false,
    });
    console.log(dateInput);
    //this.hideDatePicker();
  };

  displayDate = () => {
    return (
      <View style={styles.list}>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          display="spinner"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
      </View>
    );
  };

  button = (model) => {
    return (
      <TouchableOpacity
        onPress={this.showDatePicker}
        activeOpacity={0.7}
        style={styles.container_all_btn}
      >
        <View style={styles.btn_image}>
          <Ionicons
            //name="md-calendar-sharp"
            name={model}
            size={ICON_TAILLE}
            color={"#02519e"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  buttonFilter = () => {
    return (
      <View style={styles.container_btn}>
        <Text style={styles.filter_title}>Mois</Text>
        <RadioButton
          value="Mois"
          status={this.state.checked === "Mois" ? "checked" : "unchecked"}
          onPress={() =>
            this.setState({
              checked: "Mois",
              dateFilterFormat: "M",
            })
          }
        />
        <Text>Année</Text>
        <RadioButton
          value="Année"
          status={this.state.checked === "Année" ? "checked" : "unchecked"}
          onPress={() =>
            this.setState({
              checked: "Année",
              dateFilterFormat: "YYYY",
            })
          }
        />
        <Text>Mois-Année</Text>
        <RadioButton
          value="Mois/Année"
          status={this.state.checked === "Mois/Année" ? "checked" : "unchecked"}
          onPress={() =>
            this.setState({
              checked: "Mois/Année",
              dateFilterFormat: "YYYY-MM",
            })
          }
        />
      </View>
    );
  };

  annuler = () => {
    this.setState({
      data: [],
      date: "",
    });
  };

  searchBar = () => {
    var date_text = moment(this.state.date).format(this.state.dateFilterFormat);
    return (
      <View style={styles.search_container}>
        <TouchableOpacity
          onPress={this.showDatePicker}
          activeOpacity={0.7}
          style={styles.container_all_btn}
        >
          <View style={styles.btn_image_tout}>
            <Ionicons
              name="md-calendar-sharp"
              size={ICON_TAILLE}
              color={"#02519e"}
            />
          </View>
          <View style={styles.btn_text_container}>
            <Text style={styles.btn_text}>
              {this.state.date == ""
                ? "Choisir une date"
                : moment(this.state.date).format(this.state.displayFormat)}
            </Text>
          </View>
        </TouchableOpacity>
        {this.buttonFilter()}
        <View style={styles.container_btn}>
          <Button
            title="Chercher"
            onPress={() => this.searchItems(date_text)}
            style={styles.container_btn}
          />
          <Button
            title="Annuler"
            color="red"
            onPress={() => this.annuler()}
            style={styles.container_btn}
          />
        </View>
      </View>
    );
  };
  /****************************************************************************** */
  /***********************configuration du tri par date************************* */

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
      //.include retourne true si la valeur passé en parametre existe dans le tableau  et false sinon
      if (text.length > 0) {
        return moment(itemData)
          .format(this.state.dateFilterFormat)
          .includes(textData);
      }
    });
    // si l'utilisateur na pas choise de date
    if (this.state.date == "") alert(" Veuillez choisir une date !");
    // si la date choisi ne correspond a aucune facture
    if (newData == "") alert(" Il n'y a pas de facture pour cette date !");
    this.setState({
      data: newData,
      value: text,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="   Entrer une date "
        onChangeText={(text) => this.searchItems(text)}
        value={this.state.value}
      />
    );
  };
  /************************************************************************************* */
  /****************************fonction pour la facture******************************** */
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
  /************************************************************************************ */
  render() {
    return (
      <View style={styles.container}>
        {this.searchBar()}
        {this.displayDate()}
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
          //ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 21,
  },
  search_container: {},
  container_all_btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    margin: 5,
    height: hauteur / 3,
    elevation: 0.5,
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
  container_btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 3,
  },
  filter_btn: {
    flexDirection: "row",
  },
  filter_title: {
    //color: "grey",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureSearch);

//export default FactureSearch;
