import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, dimensions, scaleFont, typography } from "../theme"
import { Text } from "./Text"
import { translate } from "@app/i18n"

export interface EmptyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label?: string
}

/**
 * Describe your component here
 */
export const Empty = observer(function Empty(props: EmptyProps) {
  const { style, label = translate("common.newsOfCatogeryIsEmpty") } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text}>{label}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: dimensions.height * 0.5,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: scaleFont(16),
  color: colors.textDim,
}
