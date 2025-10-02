import { Feather } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

interface CreateBtnProps {
  onPress: () => void;
}

export const CreateBtn = memo<CreateBtnProps>(({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7}>
      <Feather name="plus" size={24} color={COLORS.cardBg} />
    </TouchableOpacity>
  );
});

CreateBtn.displayName = "CreateBtn";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
