import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import KingdomSelectionScreen from '../screens/KingdomSelectionScreen';
import CharacterSelectionScreen from '../screens/CharacterSelectionScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { gameState } = useGame();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0A0F' },
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="KingdomSelection" component={KingdomSelectionScreen} />
        <Stack.Screen name="CharacterSelection" component={CharacterSelectionScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
