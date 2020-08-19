import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoadAssets, Routes} from './src/components';
import { StatusBar } from 'react-native';
import { Wallet } from './src/Wallet';
import { JellyScroll } from './src/JellyScroll';
const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const Stack = createStackNavigator<Routes>();

const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
       <Stack.Screen name="JellyScroll" component={JellyScroll}  options={{
        title: "Jelly Scroll",
      }} />     
    </Stack.Navigator>
  );
}



const App = () => {
  return (
    <LoadAssets {...{fonts}}>
        <StatusBar barStyle="light-content" />
        <AppNavigator/>
    </LoadAssets>
  )
}
export default App;