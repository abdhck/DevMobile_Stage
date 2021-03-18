// Navigation/Navigation.js
//import 'react-native-gesture-handler';
import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Login from "../Components/Login";
import FactureList from "../Components/FactureList";
import FactureNonPayee from "../Components/FactureNonPayee";
import FacturePayee from "../Components/FacturePayee";
import FactureRecus from "../Components/FactureRecus";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Payement from "../Components/Payement";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const StackPaye = createStackNavigator();

const PayerStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    }}
  >
    <Stack.Screen
      name="FacturePayee"
      component={FacturePayee}
      options={{ title: "Factures reglée" }}
    />
  </Stack.Navigator>
);

const ImpayerStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ff9900",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    }}
  >
    <Stack.Screen
      name="FactureNonPayee"
      component={FactureNonPayee}
      options={{ title: "Factures non reglée" }}
    />
  </Stack.Navigator>
);

const homeFactureStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1a75ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    }}
  >
    <Stack.Screen
      name="HomeFactureList"
      component={FactureList}
      options={{ title: "Factures" }}
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1a75ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    }}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: "Se connecter", headerShown: false }}
    />
    <Stack.Screen
      name="FactureList"
      component={BottomNavigate}
      options={{ title: "Factures", headerShown: false }}
    />
    <Stack.Screen
      name="FactureRecus"
      component={FactureRecus}
      options={{ title: "Reçu de la facture" }}
    />
    <Stack.Screen
      name="Payement"
      component={Payement}
      options={{ title: "Payement de la facture" }}
    />
  </Stack.Navigator>
);

const BottomNavigate = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    shifting="true"
    barStyle={{ height: 50 }}
  >
    <Tab.Screen
      name="Home"
      component={homeFactureStackNavigator}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#1a75ff",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      //barStyle={{ backgroundColor: "tomato" }}
      name="FactureNonPayee"
      component={ImpayerStackNavigator}
      options={{
        headerTitle: "Factures non reglée",
        tabBarLabel: "Non payée ",
        tabBarColor: "#ff9900",
        tabBarIcon: ({ color }) => (
          <AntDesign name="exclefile1" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      //barStyle={{ backgroundColor: "tomato" }}
      name="FacturePayee"
      component={PayerStackNavigator}
      options={{
        tabBarLabel: "Payée ",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <AntDesign name="pptfile1" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);
const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default HomeStackNavigator;

/*const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
})

export default createAppContainer(SearchStackNavigator)*/
