import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { useDynamicIcon } from "../hooks/useDynamicIcon";
import { apiGetIcons } from "../services/icons";
import { IconOptionType } from "../types";

interface IconSelectorProps {
  selectedIcon: any;
  onSelectIcon: (icon: string) => void;
}

export const IconSelector = memo<IconSelectorProps>(
  ({ selectedIcon, onSelectIcon }) => {
    const { data: iconsList } = apiGetIcons();

    const handleSelect = useCallback(
      (icon: string) => {
        onSelectIcon(icon);
      },
      [onSelectIcon]
    );

    return (
      <View style={styles.container}>
        {iconsList?.map((option: any) => (
          <IconOption
            key={option?._id}
            npm={option?.npm}
            icon={option?.icon}
            bgColor={option?.bgColor}
            title={option?.title}
            color={option?.color}
            selected={selectedIcon?._id === option?._id}
            onPress={() => handleSelect(option)}
          />
        ))}
      </View>
    );
  }
);

IconSelector.displayName = "IconSelector";

interface IconOptionProps extends IconOptionType {
  selected: boolean;
  onPress: () => void;
}

const IconOption = memo<IconOptionProps>(
  ({ title, npm, icon, bgColor, color = COLORS.cardBg, selected, onPress }) => {
    const { RenderIcon } = useDynamicIcon();
    return (
      <TouchableOpacity
        style={[
          styles.iconOption,
          { backgroundColor: bgColor },
          selected && styles.selectedIcon,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {npm !== "Custom" && (
          <RenderIcon npm={npm} name={icon} size={24} color={color} />
        )}
      </TouchableOpacity>
    );
  }
);

IconOption.displayName = "IconOption";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  iconOption: {
    width: 52,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedIcon: {
    borderColor: COLORS.darkBg,
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },
});
