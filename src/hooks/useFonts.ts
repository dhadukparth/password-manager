import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const useAppFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // Roboto
          'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
          
          // Poppins
          'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
          
          // Noto Sans
          'NotoSans-Regular': require('../../assets/fonts/NotoSans-Regular.ttf'),
          'NotoSans-Medium': require('../../assets/fonts/NotoSans-Medium.ttf'),
          'NotoSans-Bold': require('../../assets/fonts/NotoSans-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        setError(e as Error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  return { fontsLoaded, error };
};