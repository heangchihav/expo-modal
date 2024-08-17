// src/app/[lang]/_layout.tsx
import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Language, LanguageProvider, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import ModalComponent from '../../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const colorScheme = useColorScheme();
  const isLargeScreen = useIsLargeScreen();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const language = pathname.split('/')[1] as Language; // Extract language from pathname
  const { setLanguage } = useLanguage();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function checkFirstVisit() {
      const hasVisited = await AsyncStorage.getItem('hasVisited');
      if (!hasVisited) {
        setModalVisible(true);
        await AsyncStorage.setItem('hasVisited', 'true');
      }
    }

    if (loaded) {
      SplashScreen.hideAsync();
      setLanguage(language); // Set language based on pathname
      checkFirstVisit(); // Check if it's the user's first visit
    }
  }, [loaded, language]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        {isLargeScreen ? (
          <Stack>
            <Stack.Screen name='index' />
            <Stack.Screen name='about' />
            <Stack.Screen name='contact' />
          </Stack>
        ) : (
          <Drawer>
            <Drawer.Screen name="index" options={{ headerShown: true }} />
            <Drawer.Screen name="about" />
            <Drawer.Screen name="contact" />
          </Drawer>
        )}
        <ModalComponent
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  );
}
