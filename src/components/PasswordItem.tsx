import React, { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { useDynamicIcon } from "../hooks/useDynamicIcon";
import { PasswordType } from "../types";

interface PasswordItemProps {
  password: PasswordType;
  onPress: (password: PasswordType) => void;
}

export const PasswordItem = memo<PasswordItemProps>(
  ({ password, onPress }) => {
    const { RenderIcon } = useDynamicIcon();

    const handlePress = useCallback(() => {
      onPress(password);
    }, [onPress, password]);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.left}>
          <View style={[styles.icon, { backgroundColor: password.icon.bgColor }]}>
            <RenderIcon
              npm={password.icon.npm}
              name={password.icon.icon}
              color={password.icon.color}
              size={32}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{password.site}</Text>
            <Text style={styles.email}>{password.username}</Text>
          </View>
        </View>
        <RenderIcon
          npm="MaterialCommunityIcons"
          name="chevron-right"
          size={24}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps?.password?._id === nextProps?.password?._id
);

PasswordItem.displayName = "PasswordItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.darkBg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.PoppinsRegular,
  },
});
