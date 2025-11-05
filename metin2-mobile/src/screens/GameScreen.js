import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useGame } from '../context/GameContext';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const StatDisplay = ({ label, value, icon, color }) => (
  <View style={styles.statDisplay}>
    <Text style={styles.statDisplayIcon}>{icon}</Text>
    <View style={styles.statDisplayInfo}>
      <Text style={styles.statDisplayLabel}>{label}</Text>
      <Text style={[styles.statDisplayValue, { color }]}>{value}</Text>
    </View>
  </View>
);

const ActionButton = ({ icon, label, onPress, color = COLORS.primary }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={[color, color + 'AA']}
      style={styles.actionButtonGradient}
    >
      <Text style={styles.actionButtonIcon}>{icon}</Text>
      <Text style={styles.actionButtonLabel}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const GameScreen = ({ navigation }) => {
  const { player, resetGame } = useGame();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await resetGame();
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[COLORS.cardBg, COLORS.darkBg]}
            style={styles.headerGradient}
          >
            <View style={styles.headerLeft}>
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={styles.kingdomBadge}>
                <Text style={styles.kingdomBadgeText}>
                  {player.kingdom?.flag} {player.kingdom?.name}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Character Info Card */}
          <View style={styles.characterCard}>
            <LinearGradient
              colors={[COLORS.cardBg, COLORS.darkBg]}
              style={styles.cardGradient}
            >
              {/* Character Icon and Info */}
              <View style={styles.characterHeader}>
                <View style={styles.characterIconContainer}>
                  <Text style={styles.characterIcon}>
                    {player.character?.icon}
                  </Text>
                </View>
                <View style={styles.characterInfo}>
                  <Text style={styles.characterName}>
                    {player.character?.name}
                  </Text>
                  <Text style={styles.characterClass}>
                    Level {player.level}
                  </Text>
                  <View style={styles.goldContainer}>
                    <Text style={styles.goldIcon}>💰</Text>
                    <Text style={styles.goldAmount}>{player.gold} Yang</Text>
                  </View>
                </View>
              </View>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <StatDisplay
                  label="STR"
                  value={player.stats?.strength || 10}
                  icon="💪"
                  color="#EF4444"
                />
                <StatDisplay
                  label="INT"
                  value={player.stats?.intelligence || 10}
                  icon="🧠"
                  color="#3B82F6"
                />
                <StatDisplay
                  label="DEX"
                  value={player.stats?.dexterity || 10}
                  icon="⚡"
                  color="#10B981"
                />
                <StatDisplay
                  label="VIT"
                  value={player.stats?.vitality || 10}
                  icon="❤️"
                  color="#F59E0B"
                />
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <ActionButton
                icon="⚔️"
                label="Hunt"
                onPress={() => {}}
                color="#EF4444"
              />
              <ActionButton
                icon="🗺️"
                label="Explore"
                onPress={() => {}}
                color="#3B82F6"
              />
              <ActionButton
                icon="🛡️"
                label="Quests"
                onPress={() => {}}
                color="#10B981"
              />
              <ActionButton
                icon="🏪"
                label="Shop"
                onPress={() => {}}
                color="#F59E0B"
              />
            </View>
          </View>

          {/* Game Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Features</Text>

            <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.cardBg, COLORS.darkBg]}
                style={styles.featureGradient}
              >
                <Text style={styles.featureIcon}>📦</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Inventory</Text>
                  <Text style={styles.featureDescription}>
                    Manage your items and equipment
                  </Text>
                </View>
                <Text style={styles.featureArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.cardBg, COLORS.darkBg]}
                style={styles.featureGradient}
              >
                <Text style={styles.featureIcon}>👥</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Guild</Text>
                  <Text style={styles.featureDescription}>
                    Join or create a guild
                  </Text>
                </View>
                <Text style={styles.featureArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.cardBg, COLORS.darkBg]}
                style={styles.featureGradient}
              >
                <Text style={styles.featureIcon}>🏆</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Achievements</Text>
                  <Text style={styles.featureDescription}>
                    Track your progress and rewards
                  </Text>
                </View>
                <Text style={styles.featureArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Developer Info */}
          <View style={styles.devInfo}>
            <Text style={styles.devInfoText}>
              🎮 This is a demo version of Metin2 Mobile
            </Text>
            <Text style={styles.devInfoText}>
              Full gameplay features coming soon!
            </Text>
          </View>
        </ScrollView>

        {/* Menu Overlay */}
        {showMenu && (
          <View style={styles.menuOverlay}>
            <TouchableOpacity
              style={styles.menuOverlayBackground}
              activeOpacity={1}
              onPress={() => setShowMenu(false)}
            >
              <View style={styles.menuContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setShowMenu(false)}
                >
                  <Text style={styles.menuItemText}>Settings ⚙️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}
                >
                  <Text style={styles.menuItemText}>Logout 🚪</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemCancel]}
                  onPress={() => setShowMenu(false)}
                >
                  <Text style={styles.menuItemText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
  header: {
    paddingTop: 50,
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 15,
    ...SHADOWS.medium,
  },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: SIZES.radius,
  },
  headerLeft: {
    flex: 1,
  },
  playerName: {
    fontSize: SIZES.h4,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  kingdomBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.darkBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  kingdomBadgeText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.darkBg,
  },
  menuIcon: {
    fontSize: 24,
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.screenPadding,
  },
  characterCard: {
    marginTop: 20,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  cardGradient: {
    padding: 20,
  },
  characterHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  characterIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    ...SHADOWS.small,
  },
  characterIcon: {
    fontSize: 40,
  },
  characterInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: SIZES.h3,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  characterClass: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  goldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goldIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  goldAmount: {
    fontSize: SIZES.h6,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statDisplay: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkBg,
    padding: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statDisplayIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  statDisplayInfo: {
    flex: 1,
  },
  statDisplayLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  statDisplayValue: {
    fontSize: SIZES.h5,
    fontWeight: '700',
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: SIZES.h5,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - SIZES.screenPadding * 2 - 12) / 2,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  actionButtonGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  actionButtonLabel: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  featureCard: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: 12,
    ...SHADOWS.small,
  },
  featureGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: SIZES.h6,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  featureArrow: {
    fontSize: 24,
    color: COLORS.textSecondary,
    marginLeft: 10,
  },
  devInfo: {
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  devInfoText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  menuOverlayBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: 20,
    ...SHADOWS.large,
  },
  menuItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemCancel: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  menuItemText: {
    fontSize: SIZES.h5,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default GameScreen;
