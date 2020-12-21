// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/Home';
import ListaPokemon from './src/screens/Lista';
import DetallePokemon from './src/screens/Detalle';
import CamaraScan from './src/screens/Escanear';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Lista" component={ListaPokemon} />
        <Stack.Screen name="Detalle" component={DetallePokemon} />
        <Stack.Screen name="Camara" component={CamaraScan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;