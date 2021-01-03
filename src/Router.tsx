import React, { createContext, useState } from "react";
import { TopPage } from "./pages/TopPage";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { GameDataProvider } from "./hooks/GameData";
import { NumberManagementProvider } from "./hooks/NumberManagement";
import { GamePage } from "./pages/GamePage";

const initialState = "TopPage";

export const RouteContext = createContext({});

export const Router = () => {
  const [currentRoute, setRoute] = useState(initialState);
  return (
    <RouteContext.Provider value={{ currentRoute, setRoute }}>
      <GameDataProvider>
        <NumberManagementProvider>
          <SafeAreaView>
            <StatusBar style="auto" />
            {currentRoute === "TopPage" && <TopPage />}
            {currentRoute === "GamePage" && <GamePage />}
          </SafeAreaView>
        </NumberManagementProvider>
      </GameDataProvider>
    </RouteContext.Provider>
  );
};
