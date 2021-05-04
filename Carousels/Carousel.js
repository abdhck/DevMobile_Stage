import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import CarouselItem from "./CarouselItem.js";
import FactureItem from "../Components/FactureItem.js";
import { connect } from "react-redux";
import { decode } from "html-entities";

const { width, heigth } = Dimensions.get("window");
let flatList;

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

function infiniteScroll(dataList) {
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }

    this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
  }, 6000);
}

const Carousel = ({ dataFacture }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(dataFacture);

  useEffect(() => {
    setDataList(dataFacture);
    infiniteScroll(dataList);
  });

  if (dataFacture && dataFacture.length) {
    return (
      <View>
        <FlatList
          data={dataFacture}
          ref={(flatList) => {
            this.flatList = flatList;
          }}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FactureItem
              facture={item}
              openDetail={this._openDetail}
              openFactureDetail={this._openFactureDetail}
            />
          )}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />

        <View style={styles.dotView}>
          {dataFacture.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  console.log("Please provide Images");
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

//export default Carousel;

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(Carousel);
