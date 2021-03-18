import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingScreen from "../Components/SettingScreen";
//import { SearchStackNavigator } from "./Navigation/Navigation";



const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  <Drawer.Navigator >
  
    <Drawer.Screen name="Notifications" component={SettingScreen} />
  </Drawer.Navigator>;
};

export default MyDrawer;
