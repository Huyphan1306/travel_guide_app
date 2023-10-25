import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, dimensions, scaleFont, spacing } from "../theme"
import { Text } from "./Text"
import { NewsSnapshotOut } from "@app/models"
import { useNavigation } from "@react-navigation/native"

export interface ResultSearchNewsItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  news?: NewsSnapshotOut
}

/**
 * Describe your component here
 */
export const ResultSearchNewsItem = observer(function ResultSearchNewsItem(
  props: ResultSearchNewsItemProps,
) {
  const { style, news } = props
  const $styles = [$container, style]
  const navigation = useNavigation()
  const goToNewsDetail = () => {
    navigation.navigate("NewsDetail", news)
  }
  return (
    <TouchableOpacity style={$styles} onPress={goToNewsDetail}>
      <Image
        source={{
          uri: news.image_url,
          cache: "force-cache",
        }}
        style={$image}
        resizeMode="cover"
        blurRadius={2}
      />
      <Text style={$text} numberOfLines={2}>
        {news.title}
      </Text>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderTopWidth: dimensions.borderWidth,
  backgroundColor: "#fff",
  borderColor: colors.border,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.small,
  marginTop: -dimensions.borderWidth,
  flex: 1,
}

const $text: TextStyle = {
  fontSize: scaleFont(14),
  marginHorizontal: spacing.small,
  flex: 1,
}
const $image: ImageStyle = {
  width: dimensions.width / 10,
  justifyContent: "center",
  alignItems: "center",
  height: dimensions.width / 10,
}
