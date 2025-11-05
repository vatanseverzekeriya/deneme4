import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useGame } from '../context/GameContext';
import { KINGDOMS } from '../constants/game';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const KingdomCard = ({ kingdom, selected, onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.kingdomCard,
          selected && styles.kingdomCardSelected,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <LinearGradient
          colors={
            selected
              ? [kingdom.color, kingdom.color + 'DD', kingdom.color]
              : [COLORS.cardBg, COLORS.darkBg]
          }
          style={styles.cardGradient}
        >
          {/* Flag Icon */}
          <View style={styles.flagContainer}>
            <Text style={styles.flagIcon}>{kingdom.flag}</Text>
          </View>

          {/* Kingdom Info */}
          <View style={styles.kingdomInfo}>
            <Text style={[styles.kingdomName, selected && styles.selectedText]}>
              {kingdom.name}
            </Text>
            <Text
              style={[styles.kingdomDisplayName, selected && styles.selectedText]}
            >
              {kingdom.displayName}
            </Text>
            <Text
              style={[styles.kingdomDescription, selected && styles.selectedText]}
            >
              {kingdom.description}
            </Text>
          </View>

          {/* Selection Indicator */}
          {selected && (
            <View style={styles.selectionBadge}>
              <Text style={styles.selectionBadgeText}>✓</Text>
            </View>
          )}
        </LinearGradient>

        {/* Border glow effect */}
        {selected && (
          <View
            style={[
              styles.glowBorder,
              { borderColor: kingdom.color, shadowColor: kingdom.color },
            ]}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const KingdomSelectionScreen = ({ navigation }) => {
  const { selectKingdom, player } = useGame();
  const [selectedKingdom, setSelectedKingdom] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectKingdom = (kingdom) => {
    setSelectedKingdom(kingdom);
  };

  const handleContinue = () => {
    if (selectedKingdom) {
      selectKingdom(selectedKingdom);
      navigation.navigate('CharacterSelection');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Choose Your Kingdom</Text>
              {player.name && (
                <Text style={styles.welcomeText}>Welcome, {player.name}!</Text>
              )}
              <Text style={styles.subtitle}>
                Select the kingdom you wish to serve
              </Text>
            </View>

            {/* Kingdom Cards */}
            <View style={styles.kingdomsContainer}>
              {KINGDOMS.map((kingdom, index) => (
                <KingdomCard
                  key={kingdom.id}
                  kingdom={kingdom}
                  selected={selectedKingdom?.id === kingdom.id}
                  onPress={() => handleSelectKingdom(kingdom)}
                />
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !selectedKingdom && styles.buttonDisabled,
                ]}
                onPress={handleContinue}
                disabled={!selectedKingdom}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    selectedKingdom
                      ? [COLORS.primary, '#B8860B']
                      : [COLORS.border, COLORS.border]
                  }
                  style={styles.buttonGradient}
                >
                  <Text
                    style={[
                      styles.continueButtonText,
                      !selectedKingdom && styles.disabledText,
                    ]}
                  >
                    CONTINUE →
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Text style={styles.backButtonText}>← BACK</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: SIZES.screenPadding,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  kingdomsContainer: {
    gap: 20,
    marginBottom: 30,
  },
  kingdomCard: {
    borderRadius: SIZES.radius * 1.5,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  kingdomCardSelected: {
    ...SHADOWS.large,
  },
  cardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 140,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZES.radius * 1.5,
    borderWidth: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  flagContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    ...SHADOWS.medium,
  },
  flagIcon: {
    fontSize: 48,
  },
  kingdomInfo: {
    flex: 1,
  },
  kingdomName: {
    fontSize: SIZES.h3,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  kingdomDisplayName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  kingdomDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  selectedText: {
    color: COLORS.background,
  },
  selectionBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  selectionBadgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.success,
  },
  buttonContainer: {
    gap: 15,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  continueButton: {
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
  continueButtonText: {
    fontSize: SIZES.h5,
    fontWeight: '700',
    color: COLORS.background,
    letterSpacing: 1,
  },
  disabledText: {
    color: COLORS.textDark,
  },
  backButton: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: SIZES.h5,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: 1,
  },
});

export default KingdomSelectionScreen;
