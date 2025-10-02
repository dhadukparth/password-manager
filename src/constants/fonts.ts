export const FONTS = {
  // Roboto
  RobotoRegular: 'Roboto-Regular',
  RobotoMedium: 'Roboto-Medium',
  RobotoBold: 'Roboto-Bold',
  
  // Poppins
  PoppinsRegular: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsBold: 'Poppins-Bold',
  
  // Noto Sans
  NotoSansRegular: 'NotoSans-Regular',
  NotoSansMedium: 'NotoSans-Medium',
  NotoSansBold: 'NotoSans-Bold',
} as const;

// Default font family
export const DEFAULT_FONT_FAMILY = FONTS.PoppinsRegular;