import React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, dimensions, scaleSize, spacing } from "../theme"
import Animated, {
  SharedValue,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import Lottie from "lottie-react-native"
import imagePlaceholder from "@assets/animations/image-loading.json"
import { NewsSnapshotOut } from "@app/models"
import { Text } from "./Text"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { formatDateTime } from "@utils/formatDate"
export interface NewsItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  news: NewsSnapshotOut
}

/**
 * Describe your component here
 */

const DEFAULT_IMAGE_WIDTH = dimensions.width * 0.9
const DEFAULT_IMAGE_HEIGHT = DEFAULT_IMAGE_WIDTH * 0.8

export const NewsItem = observer(function NewsItem(props: NewsItemProps) {
  const { style, news } = props
  const $styles = [$container, style]
  const navigation = useNavigation()
  const imageHeight: SharedValue<number> = useSharedValue(DEFAULT_IMAGE_HEIGHT)
  const [isLoadingImage, setLoadingImage] = React.useState<boolean>(true)

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
      <Animated.View entering={SlideInDown.duration(400)} style={$styles}>
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
            <View style={$rowLocaltion}>
              <View>
                <Ionicons name="location-sharp" size={scaleSize(40)} color={colors.tint} />
              </View>
              <Text weight="medium" size="md" numberOfLines={2} style={$localtion}>
                {news.title}
              </Text>
            </View>
            <Text weight="light" size="sm" numberOfLines={4}>
              {news.subtitle}
            </Text>
            <Text weight="normal" size="xs" numberOfLines={4} style={$date}>
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
  shadowOffset: { width: -2, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 1,
}
const $content: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.4)",
}
const $rowLocaltion: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  flex: 1,
}
const $localtion: TextStyle = {
  flex: 1,
}
const $descContent: ViewStyle = {
  padding: spacing.smaller,
  minHeight: dimensions.small,
  width: DEFAULT_IMAGE_WIDTH,
}
const $image: ImageStyle = {
  width: DEFAULT_IMAGE_WIDTH,
  justifyContent: "center",
  alignItems: "center",
  maxHeight: DEFAULT_IMAGE_WIDTH * 1.2,
  height: DEFAULT_IMAGE_HEIGHT,
  borderRadius: spacing.smaller,
}
const $loadingImgae: ViewStyle = {
  position: "absolute",
  zIndex: 100,
  top: 0,
  width: DEFAULT_IMAGE_WIDTH,
  height: DEFAULT_IMAGE_HEIGHT,
  overflow: "hidden",
}
const $date: TextStyle = {
  color: colors.textDim,
  alignSelf: "flex-end",
}
