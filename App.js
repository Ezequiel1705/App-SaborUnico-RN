import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './Navigation';
import { useFonts } from 'expo-font'; 
import store from './Store'

export default function App() {

  const [loaded] = useFonts({
    Koulen: require('./assets/Fonts/Koulen/Koulen-Regular.ttf'),
    LatoRegular: require('./assets/Fonts/Lato/Lato-Regular.ttf')
  });
  
  if (!loaded) {
    return <ActivityIndicator/>;
  }

  console.log(loaded);

  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}


