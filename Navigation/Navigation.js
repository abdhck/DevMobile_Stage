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
import FactureDetail from "../Components/FactureDetail";
import FactureSearch from "../Components/FactureSearch";
import FactureCalculAcceuil from "../Components/FactureCalculAcceuil";
import FactureAcceuil from "../Components/FactureAcceuil";
import Accueil from "../Components/Accueil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Payement from "../Components/Payement";
import FactureParametre from "../Components/FactureParametre";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
//import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ICON_TAILLE = 27;
const ICON_COLOR = "#fff";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Tabnav = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function LogoMenu() {
  return (
    <TouchableOpacity
      style={styles.icon_left}
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Image
        source={require("../Images/menu_white.png")}
        style={styles.iconbar}
      />
    </TouchableOpacity>
  );
}
function LogoSearch(navigation) {
  return (
    <TouchableOpacity
      style={styles.icon_right}
      onPress={() => {
        navigation.navigate("FactureSearch");
      }}
    >
      <Image source={require("../Images/search.png")} style={styles.iconbar} />
    </TouchableOpacity>
  );
}

const PayerStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        //fontWeight: "bold",
        //textAlign: "center",
        // left: 10,
      },
    }}
  >
    <Stack.Screen
      name="FacturePayee"
      component={FacturePayee}
      options={{
        title: "Factures regl??e",
        headerLeft: (props) => (
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="md-arrow-back"
              size={ICON_TAILLE}
              color={ICON_COLOR}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const ImpayerStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
    }}
  >
    <Stack.Screen
      name="FactureNonPayee"
      component={FactureNonPayee}
      options={{
        title: "Factures impay??e",
        headerLeft: (props) => (
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="md-arrow-back"
              size={ICON_TAILLE}
              color={ICON_COLOR}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const homeFactureStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
    }}
  >
    <Stack.Screen
      name="HomeFactureList"
      component={FactureList}
      options={{
        title: "NetPay",
        headerLeft: (props) => (
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="md-arrow-back"
              size={ICON_TAILLE}
              color={ICON_COLOR}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const FactureParametreStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
    }}
  >
    <Stack.Screen
      name="FactureParametre"
      component={FactureParametre}
      options={{
        title: "Parametre",
        headerLeft: (props) => (
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="md-arrow-back"
              size={ICON_TAILLE}
              color={ICON_COLOR}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const accueilStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
    }}
  >
    <Stack.Screen
      name="FactureAcceuil"
      component={FactureAcceuil}
      options={{
        title: "NetPay",
        headerLeft: (props) => (
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Image
              source={require("../Images/menu_white.png")}
              style={styles.iconbar}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      initialRouteName="accueilStackNavigator"
      drawerStyle={{
        backgroundColor: "#fff",
        //width: 240,
      }}
    >
      <Drawer.Screen
        name="accueilStackNavigator"
        component={accueilStackNavigator}
        options={{
          title: "Accueil",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home-outline"
              size={size}
              color={focused ? "#02519e" : "#777"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ImpayerStackNavigator"
        component={ImpayerStackNavigator}
        options={{
          title: "Facture impay??e",
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="exclefile1"
              size={size}
              color={focused ? "#02519e" : "#777"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PayerStackNavigator"
        component={PayerStackNavigator}
        options={{
          title: "Facture pay??e",

          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="pptfile1"
              size={size}
              color={focused ? "#02519e" : "#777"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="homeFactureStackNavigator"
        component={homeFactureStackNavigator}
        options={{
          title: "Toutes les factures",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-documents-outline"
              size={size}
              color={focused ? "#02519e" : "#777"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FactureParametreStackNavigator"
        component={FactureParametreStackNavigator}
        options={{
          title: "Param??tre",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="ios-settings-outline"
              size={size}
              color={focused ? "#02519e" : "#777"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#02519e",
        elevation: 0,
      },
      headerTintColor: "#fff",
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
      options={({ route, navigation }) => ({
        title: "NetPay",
        headerRight: (props) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.icon_right}
            onPress={() => {
              navigation.navigate("FactureSearch");
            }}
          >
            <Ionicons name="search" size={ICON_TAILLE} color={"#fff"} />
          </TouchableOpacity>
        ),
        //headerShown: true,
      })}
    />
    <Stack.Screen
      name="FactureRecus"
      component={FactureRecus}
      options={{ title: "Re??u de la facture" }}
    />
    <Stack.Screen
      name="Payement"
      component={Payement}
      options={{ title: "Payement de la facture" }}
    />
    <Stack.Screen
      name="FactureDetail"
      component={FactureDetail}
      options={{ title: "D??tail de la facture" }}
    />
    <Stack.Screen
      name="FactureAcceuil"
      component={FactureAcceuil}
      //options={{ title: "D??tail de la facture" }}
    />
    <Stack.Screen
      name="MyDrawer"
      component={MyDrawer}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ImpayerStackNavigator"
      component={ImpayerStackNavigator}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PayerStackNavigator"
      component={PayerStackNavigator}
      //options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FactureSearch"
      component={FactureSearch}
      options={{ title: "Recherche", headerShown: true }}
    />
  </Stack.Navigator>
);

const MyTopTab = () => (
  <TopTab.Navigator
    backBehavior="initialRoute"
    initialRouteName="FactureNonPayee"
    tabBarOptions={{
      style: { backgroundColor: "#02519e" },
      activeTintColor: "#fff",
      indicatorStyle: { backgroundColor: "#fff", height: 2 },
    }}
  >
    <Tab.Screen
      name="FactureNonPayee"
      component={FactureNonPayee}
      options={{ title: "Impay??e" }}
    />
    <Tab.Screen
      name="FacturePayee"
      component={FacturePayee}
      options={{ title: "Pay??e" }}
    />
    <Tab.Screen
      name="Home"
      component={FactureList}
      options={{ title: "Factures" }}
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
        tabBarLabel: "Non pay??e ",
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
        tabBarLabel: "Pay??e ",
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
        headerTitle: "Factures non regl??e",
        tabBarLabel: "Non pay??e ",
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
        tabBarLabel: "Pay??e ",
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
    width: 27,
    height: 27,
  },
  iconbar: {
    width: 25,
    height: 25,
  },
  icon_left: {
    left: 10,
  },
  icon_right: {
    right: 10,
  },
});

export default HomeStackNavigator;

/*const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appel?? la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
})

export default createAppContainer(SearchStackNavigator)*/
