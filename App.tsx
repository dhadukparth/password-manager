import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CustomSplashScreen } from "./src/components/SplashScreen";
import { useAppFonts } from "./src/hooks/useFonts";
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  const { fontsLoaded, error } = useAppFonts();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (fontsLoaded) {
      timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [fontsLoaded]);

  if (error) {
    console.error("Error loading fonts:", error);
  }

  if (showSplash || !fontsLoaded) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
