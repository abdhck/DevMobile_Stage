import React from "react"
import {Text, View, StyleSheet} from "react-native"
import { connect } from "react-redux";

class FactureDetail extends React.Component{
    render(){
        return(
            <View style={styles.main_container}>
                <Text>test</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    dataFacture: state.dataFacture,
  };
};

export default connect(mapStateToProps)(FactureDetail);
