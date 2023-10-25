import React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, dimensions, spacing } from "../theme"
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomInEasyUp,
} from "react-native-reanimated"
import Lottie from "lottie-react-native"
import imagePlaceholder from "@assets/animations/image-loading.json"
import { NewsSnapshotOut } from "@app/models"
import { Text } from "./Text"
import { useNavigation } from "@react-navigation/native"
import { formatDateTime } from "@utils/formatDate"

export interface BreakingNewsItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  news: NewsSnapshotOut
}

/**
 * Describe your component here
 */

const DEFAULT_IMAGE_WIDTH = (dimensions.width * 0.9) / 2
const DEFAULT_IMAGE_HEIGHT = DEFAULT_IMAGE_WIDTH * 0.8

export const BreakingNewsItem = observer(function BreakingNewsItem(props: BreakingNewsItemProps) {
  const { style, news } = props
  const $styles = [$container, style]
  const imageHeight: SharedValue<number> = useSharedValue(DEFAULT_IMAGE_HEIGHT)
  const [isLoadingImage, setLoadingImage] = React.useState<boolean>(true)
  const navigation = useNavigation()
  const resizeImage = (width: number, height: number) => {
    const imageRatio = height / width
    const newHeight = DEFAULT_IMAGE_WIDTH * imageRatio
    imageHeight.value = withSpring(newHeight)
  }

  const onCompleteLoadImage = ({
    nativeEvent: {
      source: { width, height },
    },
  }) => {
    setLoadingImage(false)
    resizeImage(width, height)
  }
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(imageHeight.value),
  }))
  return (
    <TouchableOpacity onPress={() => navigation.navigate("NewsDetail", news)}>
      <Animated.View entering={ZoomInEasyUp.duration(400).randomDelay()} style={$styles}>
        <Animated.View style={$content}>
          <Animated.Image
            source={{
              uri: news.image_url,
            }}
            style={[$image, imageAnimatedStyle]}
            resizeMode="cover"
            blurRadius={isLoadingImage ? 2 : 0}
            onLoad={onCompleteLoadImage}
          />
          {isLoadingImage && (
            <View style={$loadingImgae}>
              <Lottie source={imagePlaceholder} autoPlay loop />
            </View>
          )}
          <View style={$descContent}>
            <Text weight="medium" size="md" numberOfLines={2}>
              {news.title}
            </Text>
            <Text weight="light" size="sm" numberOfLines={2}>
              {news.subtitle}
            </Text>
            <Text weight="medium" size="xs" numberOfLines={2} style={$date}>
              {formatDateTime(news.date)}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginVertical: spacing.smaller,
  shadowColor: "#171717",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
}
const $content: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
const $descContent: ViewStyle = {
  padding: spacing.smaller,
  minHeight: dimensions.medium,
  backgroundColor: colors.background,
  borderBottomRightRadius: dimensions.smaller,
  borderBottomLeftRadius: dimensions.smaller,
  width: DEFAULT_IMAGE_WIDTH,
}
const $image: ImageStyle = {
  width: DEFAULT_IMAGE_WIDTH,
  justifyContent: "center",
  alignItems: "center",
  borderTopRightRadius: dimensions.smaller,
  borderTopLeftRadius: dimensions.smaller,
  height: DEFAULT_IMAGE_HEIGHT,
  borderWidth: 1,
}
const $loadingImgae: ViewStyle = {
  position: "absolute",
  zIndex: 100,
  top: 0,
  width: DEFAULT_IMAGE_WIDTH,
  height: DEFAULT_IMAGE_HEIGHT,
  borderTopRightRadius: dimensions.smaller,
  borderTopLeftRadius: dimensions.smaller,
  overflow: "hidden",
}

const $date: TextStyle = {
  textAlign: "right",
  color: colors.textDim,
}
