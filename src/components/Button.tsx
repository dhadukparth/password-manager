import React, { memo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button = memo<ButtonProps>(
  ({ title, onPress, variant = 'primary', icon, loading, disabled, style }) => {
    const buttonStyle = [
      styles.button,
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      variant === 'success' && styles.success,
      variant === 'danger' && styles.danger,
      (disabled || loading) && styles.disabled,
      style,
    ];

    const textStyle = [
      styles.text,
      variant === 'secondary' && styles.secondaryText,
    ];

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            {icon}
            <Text style={textStyle}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 8,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.border,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    fontFamily: FONTS.PoppinsSemiBold,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
});