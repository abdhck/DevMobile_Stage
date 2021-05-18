import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
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
//import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { RadioButton } from "react-native-paper";
import { decode } from "html-entities";
import Modal from "react-native-modal";

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
      displayFormat: "MM-YYYY", //format de la date afficher a l'utilisateur
      checked: "Mois/Année",
      dateFilterFormat: "YYYY-MM", //format de la date utilisé pour la recherche
      visibleModal: null,
      modalText: "",
    };
  }

  /**********************Modal Configuration*************************************/
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button_modal}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.btn_text}>{this.state.modalText}</Text>
      {this._renderButton("Fermer", () =>
        this.setState({ visibleModal: null })
      )}
    </View>
  );

  _setModalMessage = (message) => {
    this.setState({
      visibleModal: 1,
      modalText: message,
    });
  };

  _displayModal = () => {
    return (
      <View style={styles.container_modal}>
        <Modal
          isVisible={this.state.visibleModal === 1}
          backdropColor={"red"}
          backdropOpacity={0.5}
          animationIn={"zoomInDown"}
          animationOut={"zoomOutUp"}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  };

  /******************************************************************************/

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
    // console.log(dateInput);
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

  buttonChoisirDate = () => {
    return (
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
    );
  };

  radioBoutton = (titre, moisAnnee, datefilterformat, displayformat) => {
    return (
      <View style={styles.container_btn}>
        <Text style={styles.filter_title}>{titre}</Text>
        <RadioButton
          value={moisAnnee}
          status={this.state.checked === moisAnnee ? "checked" : "unchecked"}
          onPress={() =>
            this.setState({
              checked: moisAnnee,
              dateFilterFormat: datefilterformat,
              displayFormat: displayformat,
            })
          }
        />
      </View>
    );
  };

  buttonFilter = () => {
    return (
      <View style={styles.container_btn}>
        {this.radioBoutton("Mois", "Mois", "MM", "MM")}
        {this.radioBoutton("Année", "Année", "YYYY", "YYYY")}
        {this.radioBoutton("Mois-Année", "Mois/Année", "YYYY-MM", "MM-YYYY")}
      </View>
    );
  };

  //fonction pour boutton annuler, on vide les données
  annuler = () => {
    this.setState({
      data: [],
      date: "",
    });
  };

  buttonChercherAnnuler = (datetext) => {
    return (
      <View style={styles.container_btn}>
        <Button
          title="Chercher"
          onPress={() => this.searchItems(datetext)}
          style={styles.container_btn}
        />
        <Button
          title="Annuler"
          color="red"
          onPress={() => this.annuler()}
          style={styles.container_btn}
        />
      </View>
    );
  };

  searchBar = () => {
    var date_text = moment(this.state.date).format(this.state.dateFilterFormat);
    return (
      <View style={styles.search_container}>
        {this.buttonChoisirDate()}
        {this.buttonFilter()}
        {this.buttonChercherAnnuler(date_text)}
        {this._displayModal()}
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

  // fonction pour la recherche
  searchItems = (text) => {
    let newData = this.props.dataFacture.filter((item) => {
      const itemData = item.perio.toUpperCase();
      const textData = text.toUpperCase();
      //.include retourne true si la valeur passé en parametre existe dans le tableau  et false sinon
      if (text.length > 0) {
        return moment(itemData)
          .format(this.state.dateFilterFormat)
          .includes(textData);
      }
    });
    // si l'utilisateur na pas choise de date
    if (this.state.date == "") {
      //affiche le model
      this._setModalMessage("Veuillez choisir une date !");
    }
    // si la date choisi ne correspond a aucune facture
    else if (newData == "") {
      //affiche le model
      this._setModalMessage("Il n'y a pas de facture pour cette date !");
    }
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
    color: "#5d6b78",
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
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  container_modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button_modal: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  filter_title: {
    // color: "#5d6b78",
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureSearch);

//export default FactureSearch;
