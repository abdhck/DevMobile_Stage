import React from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FactureItem from "../FactureItem";
import { decode } from "html-entities";
import { connect } from "react-redux";

class MyCarousel extends React.Component {
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
  _factureLimite(factureListe) {
    var facture = [];
    var data = factureListe.sort((a, b) => new Date(b.date) - new Date(a.date));
    for (var i = this.compteur; i < this.compteur + 3; i++) {
      if (i <= factureListe.length) {
        facture.push(data[i]);
      }
    }
    return facture;
  }

  _renderItem({ item, index }) {
    return <MySlideComponent data={item} />;
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    var factureTmp = this._factureLimite(this.props.dataFacture);
    for (var i = 0; i < factureTmp.length; i++) {
      this.factureLimte.push(factureTmp[i]);
    }
    return (
      <View>
        <Carousel
          data={factureTmp}
          renderItem={({ item }) => (
            <FactureItem
              facture={item}
              openDetail={this._openDetail}
              openFactureDetail={this._openFactureDetail}
            />
          )}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {this.pagination}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(MyCarousel);
