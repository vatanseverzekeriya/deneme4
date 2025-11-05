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
import { CHARACTERS, GAME_CONFIG } from '../constants/game';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const StatBar = ({ label, value, icon, color }) => {
  const [widthAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 1000,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const barWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.statBar}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <View style={styles.statBarBackground}>
        <Animated.View
          style={[
            styles.statBarFill,
            { width: barWidth, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const CharacterCard = ({ character, selected, onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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
      style={styles.characterCardContainer}
    >
      <Animated.View
        style={[
          styles.characterCard,
          selected && styles.characterCardSelected,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <LinearGradient
          colors={
            selected
              ? [COLORS.primary, '#B8860B', COLORS.primary]
              : [COLORS.cardBg, COLORS.darkBg]
          }
          style={styles.cardGradient}
        >
          {/* Character Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.characterIcon}>{character.icon}</Text>
          </View>

          {/* Character Name */}
          <Text style={[styles.characterName, selected && styles.selectedText]}>
            {character.name}
          </Text>

          {/* Selection Indicator */}
          {selected && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedBadgeText}>✓</Text>
            </View>
          )}
        </LinearGradient>

        {/* Glow Border */}
        {selected && <View style={styles.glowBorder} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const CharacterSelectionScreen = ({ navigation }) => {
  const { selectCharacter, player } = useGame();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleContinue = () => {
    if (selectedCharacter) {
      selectCharacter(selectedCharacter);
      navigation.navigate('Game');
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
              <Text style={styles.title}>Choose Your Class</Text>
              {player.kingdom && (
                <View style={styles.kingdomBadge}>
                  <Text style={styles.kingdomBadgeText}>
                    {player.kingdom.flag} {player.kingdom.name}
                  </Text>
                </View>
              )}
              <Text style={styles.subtitle}>
                Each class has unique abilities and playstyle
              </Text>
            </View>

            {/* Character Grid */}
            <View style={styles.charactersGrid}>
              {CHARACTERS.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  selected={selectedCharacter?.id === character.id}
                  onPress={() => handleSelectCharacter(character)}
                />
              ))}
            </View>

            {/* Character Details */}
            {selectedCharacter && (
              <Animated.View style={styles.detailsContainer}>
                <LinearGradient
                  colors={[COLORS.cardBg, COLORS.darkBg]}
                  style={styles.detailsGradient}
                >
                  {/* Character Info */}
                  <View style={styles.detailsHeader}>
                    <Text style={styles.detailsIcon}>
                      {selectedCharacter.icon}
                    </Text>
                    <View style={styles.detailsInfo}>
                      <Text style={styles.detailsName}>
                        {selectedCharacter.name}
                      </Text>
                      <Text style={styles.detailsDescription}>
                        {selectedCharacter.description}
                      </Text>
                    </View>
                  </View>

                  {/* Stats */}
                  <View style={styles.statsContainer}>
                    <Text style={styles.sectionTitle}>Base Stats</Text>
                    {Object.entries(selectedCharacter.stats).map(
                      ([stat, value]) => (
                        <StatBar
                          key={stat}
                          label={GAME_CONFIG.stats[stat].label}
                          value={value}
                          icon={GAME_CONFIG.stats[stat].icon}
                          color={GAME_CONFIG.stats[stat].color}
                        />
                      )
                    )}
                  </View>

                  {/* Abilities */}
                  <View style={styles.abilitiesContainer}>
                    <Text style={styles.sectionTitle}>Abilities</Text>
                    <View style={styles.abilitiesGrid}>
                      {selectedCharacter.abilities.map((ability, index) => (
                        <View key={index} style={styles.abilityBadge}>
                          <Text style={styles.abilityText}>{ability}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Paths */}
                  <View style={styles.pathsContainer}>
                    <Text style={styles.sectionTitle}>Specialization Paths</Text>
                    {selectedCharacter.paths.map((path, index) => (
                      <View key={index} style={styles.pathCard}>
                        <Text style={styles.pathIcon}>{path.icon}</Text>
                        <View style={styles.pathInfo}>
                          <Text style={styles.pathName}>{path.name}</Text>
                          <Text style={styles.pathDescription}>
                            {path.description}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </Animated.View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !selectedCharacter && styles.buttonDisabled,
                ]}
                onPress={handleContinue}
                disabled={!selectedCharacter}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    selectedCharacter
                      ? [COLORS.primary, '#B8860B']
                      : [COLORS.border, COLORS.border]
                  }
                  style={styles.buttonGradient}
                >
                  <Text
                    style={[
                      styles.continueButtonText,
                      !selectedCharacter && styles.disabledText,
                    ]}
                  >
                    START GAME →
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
    marginBottom: 25,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  kingdomBadge: {
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  kingdomBadgeText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 15,
  },
  characterCardContainer: {
    width: (width - SIZES.screenPadding * 2 - 15) / 2,
  },
  characterCard: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  characterCardSelected: {
    ...SHADOWS.large,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZES.radius,
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOWS.small,
  },
  characterIcon: {
    fontSize: 40,
  },
  characterName: {
    fontSize: SIZES.h5,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  selectedText: {
    color: COLORS.background,
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.success,
  },
  detailsContainer: {
    marginBottom: 25,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  detailsGradient: {
    padding: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsIcon: {
    fontSize: 50,
    marginRight: 15,
  },
  detailsInfo: {
    flex: 1,
  },
  detailsName: {
    fontSize: SIZES.h3,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  detailsDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: SIZES.h5,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  statBar: {
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  statLabel: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  statValue: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '700',
  },
  statBarBackground: {
    height: 8,
    backgroundColor: COLORS.darkBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  abilitiesContainer: {
    marginBottom: 20,
  },
  abilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  abilityBadge: {
    backgroundColor: COLORS.darkBg,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  abilityText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  pathsContainer: {},
  pathCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkBg,
    padding: 15,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pathIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  pathInfo: {
    flex: 1,
  },
  pathName: {
    fontSize: SIZES.h6,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  pathDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  buttonContainer: {
    gap: 15,
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

export default CharacterSelectionScreen;
