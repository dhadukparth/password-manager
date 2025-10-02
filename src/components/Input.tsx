import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/fonts';

interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export const Input = memo<InputProps>(
  ({ label, required, style, ...props }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.textSecondary}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  required: {
    color: COLORS.danger,
  },
  input: {
    width: '100%',
    paddingHorizontal: 12,
    borderColor: COLORS.border,
    borderRadius: 10,
    fontSize: 13,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.inputBg,
    fontFamily: FONTS.PoppinsRegular,
  },
});