import { useColorScheme } from '@/hooks/use-color-scheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { DarkTheme } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const LightTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#FFEB3B', text: '#212121' } };
  const DarkThemeCustom = { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#222', text: '#FFF' } };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkThemeCustom : LightTheme}>
      <Slot /> 
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}