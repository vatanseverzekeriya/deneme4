import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useGame } from '../context/GameContext';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { setPlayerName } = useGame();
  const [name, setName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.3));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStartGame = () => {
    if (showInput && name.trim().length >= 3) {
      setPlayerName(name.trim());
      navigation.navigate('KingdomSelection');
    } else if (!showInput) {
      setShowInput(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']}
        style={styles.gradient}
      >
        {/* Background pattern */}
        <View style={styles.backgroundPattern}>
          <Text style={styles.patternText}>⚔️</Text>
          <Text style={[styles.patternText, { top: 100, left: 50 }]}>🐉</Text>
          <Text style={[styles.patternText, { top: 200, right: 30 }]}>🔥</Text>
          <Text style={[styles.patternText, { bottom: 150, left: 80 }]}>✨</Text>
          <Text style={[styles.patternText, { bottom: 80, right: 60 }]}>🗡️</Text>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo / Title */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[COLORS.primary, '#FFD700', COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradient}
            >
              <Text style={styles.title}>METIN2</Text>
            </LinearGradient>
            <Text style={styles.subtitle}>Mobile Edition</Text>
            <Text style={styles.tagline}>The Battle for the Dragon Stones</Text>
          </View>

          {/* Character Name Input */}
          {showInput && (
            <Animated.View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Character Name"
                placeholderTextColor={COLORS.textSecondary}
                value={name}
                onChangeText={setName}
                maxLength={12}
                autoFocus
                autoCapitalize="none"
              />
              <Text style={styles.inputHint}>
                {name.length}/12 characters (min: 3)
              </Text>
            </Animated.View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                showInput && name.trim().length < 3 && styles.buttonDisabled,
              ]}
              onPress={handleStartGame}
              activeOpacity={0.8}
              disabled={showInput && name.trim().length < 3}
            >
              <LinearGradient
                colors={[COLORS.primary, '#B8860B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {showInput ? 'START ADVENTURE' : 'NEW GAME'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>CONTINUE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>SETTINGS</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
            <Text style={styles.footerText}>© 2025 Metin2 Mobile</Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  patternText: {
    fontSize: 80,
    position: 'absolute',
    top: 50,
    right: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titleGradient: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: SIZES.radius,
    ...SHADOWS.large,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 4,
    textShadowColor: COLORS.shadow,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 10,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: SIZES.h5,
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: 15,
    fontSize: SIZES.h5,
    color: COLORS.text,
    textAlign: 'center',
    ...SHADOWS.medium,
  },
  inputHint: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    width: '100%',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: SIZES.h5,
    fontWeight: '700',
    color: COLORS.background,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    fontSize: SIZES.h5,
    fontWeight: '600',
    color: COLORS.text,
    paddingVertical: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default WelcomeScreen;
