import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GAME_CONFIG } from '../constants/game';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    name: '',
    kingdom: null,
    character: null,
    level: GAME_CONFIG.startingLevel,
    gold: GAME_CONFIG.startingGold,
    stats: {
      strength: 10,
      intelligence: 10,
      dexterity: 10,
      vitality: 10,
    },
    inventory: [],
  });

  const [gameState, setGameState] = useState({
    isNewPlayer: true,
    currentScreen: 'welcome',
    hasSelectedKingdom: false,
    hasSelectedCharacter: false,
    isPlaying: false,
  });

  // Load saved game data
  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    try {
      const savedPlayer = await AsyncStorage.getItem('@metin2_player');
      const savedState = await AsyncStorage.getItem('@metin2_game_state');

      if (savedPlayer) {
        setPlayer(JSON.parse(savedPlayer));
      }
      if (savedState) {
        setGameState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const saveGameData = async () => {
    try {
      await AsyncStorage.setItem('@metin2_player', JSON.stringify(player));
      await AsyncStorage.setItem('@metin2_game_state', JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  const selectKingdom = (kingdom) => {
    setPlayer((prev) => ({ ...prev, kingdom }));
    setGameState((prev) => ({ ...prev, hasSelectedKingdom: true }));
  };

  const selectCharacter = (character) => {
    setPlayer((prev) => ({
      ...prev,
      character,
      stats: { ...character.stats },
    }));
    setGameState((prev) => ({
      ...prev,
      hasSelectedCharacter: true,
      isNewPlayer: false,
    }));
    saveGameData();
  };

  const setPlayerName = (name) => {
    setPlayer((prev) => ({ ...prev, name }));
  };

  const resetGame = async () => {
    try {
      await AsyncStorage.removeItem('@metin2_player');
      await AsyncStorage.removeItem('@metin2_game_state');
      setPlayer({
        name: '',
        kingdom: null,
        character: null,
        level: GAME_CONFIG.startingLevel,
        gold: GAME_CONFIG.startingGold,
        stats: {
          strength: 10,
          intelligence: 10,
          dexterity: 10,
          vitality: 10,
        },
        inventory: [],
      });
      setGameState({
        isNewPlayer: true,
        currentScreen: 'welcome',
        hasSelectedKingdom: false,
        hasSelectedCharacter: false,
        isPlaying: false,
      });
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const value = {
    player,
    gameState,
    selectKingdom,
    selectCharacter,
    setPlayerName,
    resetGame,
    saveGameData,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
