// Navigation/Navigation.js
//import 'react-native-gesture-handler';
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Tabnav = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function LogoTitle() {
  return (
    <TouchableOpacity style={styles.iconpos}>
      <Image
        source={require("../Images/netforce.jpg")}
        style={styles.iconbar}
      />
    </TouchableOpacity>
  );
}

const PayerStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        //backgroundColor: "#009387",
      },
      headerTintColor: "#006a80",
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
        //backgroundColor: "#ff9900",
      },
      headerTintColor: "#e43347",
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
        backgroundColor: "#fff",
      },
      headerTintColor: "#e43347",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    }}
  >
    <Stack.Screen
      name="HomeFactureList"
      component={FactureList}
      options={{
        title: "NetPaye",

        headerLeft: (props) => <LogoTitle {...props} />,
      }}
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#e43347",
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
      component={MyTopTab}
      options={{
        title: "NetPaye",
        headerShown: true,
        headerLeft: (props) => <LogoTitle {...props} />,
      }}
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

const MyTopTab = () => (
  <TopTab.Navigator>
    <Tab.Screen
      name="Home"
      component={FactureList}
      options={{ title: "Factures" }}
    />
    <Tab.Screen
      name="FactureNonPayee"
      component={FactureNonPayee}
      options={{ title: "Impayée" }}
    />
    <Tab.Screen
      name="FacturePayee"
      component={FacturePayee}
      options={{ title: "Payée" }}
    />
  </TopTab.Navigator>
);

const MyTab = () => (
  <Tabnav.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      //activeTintColor: "#1a75ff",
      activeTintColor: "#e43347",
      //activeBackgroundColor: "#eee",
    }}
  >
    <Tabnav.Screen
      name="Home"
      component={homeFactureStackNavigator}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={20} />
        ),
      }}
    />
    <Tabnav.Screen
      //barStyle={{ backgroundColor: "tomato" }}
      name="FactureNonPayee"
      component={ImpayerStackNavigator}
      options={{
        tabBarLabel: "Non payée ",
        tabBarIcon: ({ color }) => (
          <AntDesign name="exclefile1" color={color} size={20} />
        ),
      }}
    />
    <Tabnav.Screen
      //barStyle={{ backgroundColor: "tomato" }}
      name="FacturePayee"
      component={PayerStackNavigator}
      options={{
        tabBarLabel: "Payée ",
        tabBarIcon: ({ color }) => (
          <AntDesign name="pptfile1" color={color} size={20} />
        ),
      }}
    />
  </Tabnav.Navigator>
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
  iconbar: {
    width: 50,
    height: 50,
  },
  iconpos: {
    left: 20,
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
