// Metin2 Mobile - Theme Constants

export const COLORS = {
  // Kingdom Colors (from Metin2)
  SHINSOO: {
    primary: '#3B82F6',    // Blue Kingdom
    dark: '#1E40AF',
    light: '#60A5FA',
    glow: '#93C5FD',
  },
  CHUNJO: {
    primary: '#EAB308',    // Yellow Kingdom
    dark: '#A16207',
    light: '#FDE047',
    glow: '#FEF08A',
  },
  JINNO: {
    primary: '#EF4444',    // Red Kingdom
    dark: '#991B1B',
    light: '#F87171',
    glow: '#FCA5A5',
  },

  // General Colors
  background: '#0A0A0F',
  darkBg: '#12121A',
  cardBg: '#1A1A26',

  primary: '#D4AF37',      // Gold
  secondary: '#8B4513',    // Bronze

  text: '#F5F5F5',
  textSecondary: '#A0A0A0',
  textDark: '#404040',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  border: '#2A2A3A',
  borderLight: '#3A3A4A',

  shadow: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const FONTS = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

export const SIZES = {
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  small: 12,
  tiny: 10,

  // Spacing
  padding: 16,
  margin: 16,
  radius: 12,

  // Screen
  screenPadding: 20,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

export default { COLORS, FONTS, SIZES, SHADOWS, ANIMATIONS };
