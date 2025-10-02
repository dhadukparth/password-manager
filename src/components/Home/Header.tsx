import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="shield-lock" size={24} color="#fff" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Password Manager</Text>
          <Text style={styles.headerSubtitle}>
            Secure storage for all your passwords
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
    header: {
    backgroundColor: COLORS.darkBg,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 4,
    fontFamily: FONTS.RobotoBold,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    fontFamily: FONTS.PoppinsRegular,
  },
})