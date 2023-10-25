import React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { dimensions, spacing } from "../theme"
import Animated, {
  SharedValue,
  SlideInDown,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import Lottie from "lottie-react-native"
import imagePlaceholder from "@assets/animations/image-loading.json"
import { NewsSnapshotOut } from "@app/models"
import { Text } from "./Text"
import { useNavigation } from "@react-navigation/native"
export interface SupportNewsItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  news: NewsSnapshotOut
}

/**
 * Describe your component here
 */

const DEFAULT_IMAGE_WIDTH = dimensions.width * 0.45
const DEFAULT_IMAGE_HEIGHT = DEFAULT_IMAGE_WIDTH * 0.8

export const SupportNewsItem = observer(function SupportNewsItem(props: SupportNewsItemProps) {
  const { style, news } = props
  const navigation = useNavigation()

  const $styles = [$container, style]
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
  return (
    <TouchableOpacity onPress={() => navigation.navigate("NewsDetail", news)}>
      <Animated.View entering={SlideInDown.duration(400)} style={$styles}>
        <Animated.View style={$content}>
          <Animated.Image
            source={{
              uri: news.image_url,
            }}
            style={$image}
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
              <Text weight="medium" numberOfLines={2} style={$localtion}>
                {news.title}
              </Text>
            </View>
            <Text weight="light" size="xs" numberOfLines={4} style={{ marginTop: spacing.tiny }}>
              {news.subtitle}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "flex-end",
  alignItems: "center",
  alignSelf: "center",
  marginVertical: spacing.smaller,
  shadowColor: "#171717",
  shadowOffset: { width: -2, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 1,
  flex: 1,
  marginHorizontal: (dimensions.width - 2 * DEFAULT_IMAGE_WIDTH - spacing.small) / 4,
}
const $content: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
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
  minHeight: dimensions.medium,

  width: DEFAULT_IMAGE_WIDTH,
}
const $image: ImageStyle = {
  width: DEFAULT_IMAGE_WIDTH,
  justifyContent: "center",
  alignItems: "center",
  maxHeight: DEFAULT_IMAGE_WIDTH * 1.2,

  height: DEFAULT_IMAGE_HEIGHT,
}
const $loadingImgae: ViewStyle = {
  position: "absolute",
  zIndex: 100,
  top: 0,
  width: DEFAULT_IMAGE_WIDTH,
  height: DEFAULT_IMAGE_HEIGHT,

  overflow: "hidden",
}
