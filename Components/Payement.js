import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Payement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title_text}>
          {" "}
          payement de la facture : {this.props.route.params.id}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Payement;
