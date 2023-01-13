import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { bg } from './assets/styles';
import LetsYouInScreen from './screens/letsYouIn/LetsYouInScreen';
import { useFonts } from 'expo-font';
import CreateAccountScreen from './screens/CreateAccount/CreateAccountScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import AuthNavigation from './AuthNavigation';

export default function App() {
  const [loaded] = useFonts({
    Urbanist: require('./assets/fonts/Urbanist-VariableFont_wght.ttf'),
    UrbanistExtraBold: require('./assets/fonts/static/Urbanist-ExtraBold.ttf'),
    UrbanistSemiBold: require('./assets/fonts/static/Urbanist-SemiBold.ttf'),
    UrbanistBold: require('./assets/fonts/static/Urbanist-Bold.ttf'),
  })

  if (!loaded) return null

  return (
    <AuthNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
