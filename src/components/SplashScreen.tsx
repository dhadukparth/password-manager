import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export const CustomSplashScreen = () => {
  return (
    <>
      <StatusBar
        animated
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="shield-lock" size={80} color="#fff" />
          </View>

          <Text style={styles.title}>Password Manager</Text>
          <Text style={styles.subtitle}>Secure • Simple • Reliable</Text>

          <ActivityIndicator size="large" color="#fff" style={styles.loader} />

          <Text style={styles.loadingText}>Loading...</Text>
        </View>

        <Text style={styles.footer}>
          Your passwords are encrypted and secure
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 0.5,
    fontFamily: FONTS.RobotoBold
},
subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 40,
    letterSpacing: 1,
    fontFamily: FONTS.NotoSansMedium
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    fontFamily: FONTS.NotoSansRegular
  },
  footer: {
    position: "absolute",
    bottom: 50,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: FONTS.NotoSansRegular
  },
});
