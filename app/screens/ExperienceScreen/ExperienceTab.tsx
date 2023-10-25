import React, { useCallback } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NewsSnapshotOut, useStores } from "@app/models"
import { observer } from "mobx-react-lite"
import { NewsList } from "@components"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, scaleFont, typography } from "@theme"
import { translate } from "@app/i18n"

const Tab = createMaterialTopTabNavigator()
export const ExperienceTab = observer(() => {
  const { newsStore } = useStores()
  const {
    sportsNewsList,
    cuisineNewsList,
    shoppingNewsList,
    entertainmentNewsList,
    accommodationNewsList,
  } = newsStore
  const renderList = useCallback(
    // eslint-disable-next-line react/display-name
    (spectifyList: Array<NewsSnapshotOut>) => (props: any) =>
      <NewsList list={spectifyList} {...props} />,
    [],
  )
  return (
    <View style={$container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: $tabBarLabel,
          tabBarItemStyle: $tabBarItem,
          tabBarIndicatorStyle: $tabBarIndicator,
          tabBarStyle: $tabBar,
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarAllowFontScaling: false,
          tabBarInactiveTintColor: colors.textDim,
          tabBarActiveTintColor: colors.primary,
          tabBarPressColor: colors.pressPrimary,
        }}
      >
        <Tab.Screen
          name="Sports"
          component={renderList(sportsNewsList)}
          options={{
            title: translate("experience.sport"),
          }}
        />
        <Tab.Screen
          name="Cuisine"
          component={renderList(cuisineNewsList)}
          options={{
            title: translate("experience.cuisine"),
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={renderList(shoppingNewsList)}
          options={{
            title: translate("experience.shopping"),
          }}
        />
        <Tab.Screen
          name="Entertainment"
          component={renderList(entertainmentNewsList)}
          options={{
            title: translate("experience.entertainment"),
          }}
        />
        <Tab.Screen
          name="Accommodation"
          component={renderList(accommodationNewsList)}
          options={{
            title: translate("experience.accommodation"),
          }}
        />
      </Tab.Navigator>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
const $tabBarLabel: TextStyle = {
  fontFamily: typography.primary.normal,
  textTransform: "none",
  fontSize: scaleFont(14),
}
const $tabBarItem: ViewStyle = {
  width: "auto",
}
const $tabBarIndicator: ViewStyle = {
  backgroundColor: colors.primary,
}
const $tabBar: ViewStyle = {
  shadowColor: "#171717",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 10,
}
