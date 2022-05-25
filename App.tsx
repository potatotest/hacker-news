/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import {
  Appearance,
  SafeAreaView, StyleSheet
} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DetailsScreen from './src/screen/DetailsScreen';
import { HomeScreen } from './src/screen/HomeScreen';
import { WebViewScreen } from './src/screen/WebViewScreen';

const Stack = createStackNavigator();
const App = () => {

  const backgroundStyle = {
    flex: 1,
  };
  const colorScheme = Appearance.getColorScheme();
  console.log("colorScheme", colorScheme)

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <SafeAreaView  */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
            />
            <Stack.Screen
              name="Webview"
              component={WebViewScreen}
              options={{
                ...TransitionPresets.ModalTransition
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView >
    </Provider >

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


