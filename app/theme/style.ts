import { ViewStyle } from "react-native"

export const withSize = (size: number): Pick<ViewStyle, "width" | "height"> => ({
  width: size,
  height: size,
})
