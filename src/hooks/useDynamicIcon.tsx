import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";

type IconSets = {
  [key: string]: React.ComponentType<any>;
};

const ICON_SETS: IconSets = {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome,
  Entypo,
  AntDesign,
};

interface IconProps {
  npm: keyof typeof ICON_SETS; // which icon family
  name: string; // icon name
  size?: number;
  color?: string;
  style?: any;
}

export function useDynamicIcon() {
  const RenderIcon = ({ npm, name, size = 24, color = "#000", style }: IconProps) => {
    const IconComponent = ICON_SETS[npm];
    if (!IconComponent) {
      console.warn(`Icon set "${npm}" not found. Did you import it in ICON_SETS?`);
      return null;
    }

    return <IconComponent name={name} size={size} color={color} style={style} />;
  };

  return { RenderIcon };
}
