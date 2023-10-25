import { useStores } from "@app/models"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"

import { colors, dimensions, spacing } from "../theme"
import goButton from "@assets/animations/go-button.json"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Lottie from "lottie-react-native"
import Animated, { LightSpeedInLeft } from "react-native-reanimated"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { BreakingNewsItem } from "@components"
const GoButton = ({ onPress }) => {
  return (
    <Animated.View entering={LightSpeedInLeft.delay(2000).duration(500)}>
      <TouchableOpacity onPress={onPress} style={$buttonGo}>
        <Lottie source={goButton} autoPlay={true} loop />
      </TouchableOpacity>
    </Animated.View>
  )
}

interface WelcomeScreenProps {}
export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $insestsStyle = useSafeAreaInsetsStyle(["top", "bottom"])
  const navigation = useNavigation()
  const {
    newsStore: { breakingNewsList },
  } = useStores()
  const endPointColumn1 = breakingNewsList.length / 2
  const startPointColumn2 = breakingNewsList.length / 2

  const goToHome = () => {
    navigation.navigate("HomeBottomTab")
    navigation.dispatch((state) => {
      // Remove the StatisticDay route from the stack
      const routes = state.routes.filter((r) => r.name !== "Welcome")
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }
  return (
    <>
      <ScrollView style={$container} contentContainerStyle={[$content, { ...$insestsStyle }]}>
        <View style={$columnContent}>
          {
            // column1
            breakingNewsList.slice(0, endPointColumn1).map((news) => (
              <BreakingNewsItem key={news.image_url + "_clm1"} news={news} />
            ))
          }
        </View>
        <View style={$columnContent}>
          {
            // column2
            breakingNewsList.slice(startPointColumn2, breakingNewsList.length + 1).map((news) => (
              <BreakingNewsItem key={news.image_url + "_clm2"} news={news} />
            ))
          }
        </View>
      </ScrollView>
      <GoButton onPress={goToHome} />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $content: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  minHeight: dimensions.height,
  paddingHorizontal: spacing.smaller,
}
const $columnContent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const $buttonGo: ViewStyle = {
  position: "absolute",
  zIndex: 100,
  width: dimensions.huge,
  height: dimensions.huge,
  bottom: spacing.medium,
  right: spacing.medium,
}
