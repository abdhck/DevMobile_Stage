import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

class FactureParametre extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Parametre</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FactureParametre;
