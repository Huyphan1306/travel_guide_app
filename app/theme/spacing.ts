import { scaleSize } from "./utils"

import { Dimensions } from "react-native"

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */

export const spacing = {
  none: scaleSize(0),
  tiny: scaleSize(4),
  smaller: scaleSize(8),
  small: scaleSize(12),
  medium: scaleSize(24),
  mediumPlus: scaleSize(36),
  large: scaleSize(64),
  huge: scaleSize(124),
  massive: scaleSize(234),
}

export type Spacing = keyof typeof spacing
