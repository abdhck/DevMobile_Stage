import React from "react";
import Navigation from "./Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}
