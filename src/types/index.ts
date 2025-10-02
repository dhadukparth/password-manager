export type IconNpmType =
  | "MaterialCommunityIcons"
  | "Ionicons"
  | "Feather"
  | "FontAwesome"
  | "Entypo"
  | "AntDesign"
  | "Custom";

export interface PasswordType {
  _id: number;
  site: string;
  username: string;
  password: string;
  url: string;
  note: string;
  icon: IconOptionType;
}

export interface IconOptionType {
  npm: IconNpmType;
  icon: string;
  bgColor: string;
  color?: string;
  size?: number;
  title: string;
}
