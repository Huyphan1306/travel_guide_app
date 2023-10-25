import { Dimensions as RNDimenstions, PixelRatio } from "react-native"
import { scaleSize } from "./utils"

export const dimensions = {
  ...RNDimenstions.get("screen"),

  none: scaleSize(0),
  tiny: scaleSize(4),
  smaller: scaleSize(8),
  small: scaleSize(12),
  medium: scaleSize(24),
  mediumPlus: scaleSize(36),
  large: scaleSize(64),
  huge: scaleSize(124),
  massive: scaleSize(234),
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
} as const

export type Dimensions = keyof typeof dimensions
