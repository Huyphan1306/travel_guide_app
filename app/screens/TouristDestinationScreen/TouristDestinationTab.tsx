import React, { useCallback } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NewsSnapshotOut, useStores } from "@app/models"
import { observer } from "mobx-react-lite"
import { NewsList } from "@components"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, scaleFont, typography } from "@theme"
import { translate } from "@app/i18n"

const Tab = createMaterialTopTabNavigator()
export const TouristDestinationTab = observer(() => {
  const { newsStore } = useStores()
  const {
    cultureNewsList,
    craftVillageNewsList,
    natureNewsList,
    architectureNewsList,
    otherOfCultureNewsList,
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
          animationEnabled: true,
          tabBarItemStyle: $tabBarItem,
          tabBarIndicatorStyle: $tabBarIndicator,
          tabBarStyle: $tabBar,
          lazy: true,
          tabBarAllowFontScaling: false,
          tabBarScrollEnabled: true,
          tabBarInactiveTintColor: colors.textDim,
          tabBarActiveTintColor: colors.primary,
          tabBarPressColor: colors.pressPrimary,
        }}
      >
        <Tab.Screen
          name="Culture"
          component={renderList(cultureNewsList)}
          options={{
            title: translate("tourism.culture"),
          }}
        />
        <Tab.Screen
          name="CraftVillage"
          component={renderList(craftVillageNewsList)}
          options={{
            title: translate("tourism.craftVillage"),
          }}
        />
        <Tab.Screen
          name="Nature"
          component={renderList(natureNewsList)}
          options={{
            title: translate("tourism.nature"),
          }}
        />
        <Tab.Screen
          name="Architecture"
          component={renderList(architectureNewsList)}
          options={{
            title: translate("tourism.architecture"),
          }}
        />
        <Tab.Screen
          name="OtherOfCulture"
          component={renderList(otherOfCultureNewsList)}
          options={{
            title: translate("tourism.other"),
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
