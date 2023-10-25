import { Dimensions as RNDimenstions } from "react-native"

export const scaleFont = (size: number) => size * (WIDTH_DEVICE / 390)
const WIDTH_DEVICE = RNDimenstions.get("screen").width

export const scaleSize = (size: number) => (WIDTH_DEVICE / 390) * size
