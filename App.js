import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import UserProfile from './src/screens/UserProfile';
import FormScreen from './src/screens/FormScreen';

function App() {
  return (
    // <View style={{flex: 1}}>
    //   <FormScreen />
    // </View>

    <SafeAreaView style={{flex: 1}}>
      <FormScreen />
    </SafeAreaView>
  );
}

export default App;
