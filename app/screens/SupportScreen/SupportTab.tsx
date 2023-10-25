import React, { useCallback } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NewsSnapshotOut, useStores } from "@app/models"
import { observer } from "mobx-react-lite"
import { NewsList } from "@components"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, scaleFont, typography } from "@theme"
import { translate } from "@app/i18n"

const Tab = createMaterialTopTabNavigator()
export const SupportTab = observer(() => {
  const { newsStore } = useStores()
  const {
    medicalNewsList,
    driverNewsList,
    financeNewsList,
    mediaNewsList,
    otherOfSupportNewsList,
  } = newsStore
  const renderList = useCallback(
    // eslint-disable-next-line react/display-name
    (spectifyList: Array<NewsSnapshotOut>) => (props: any) =>
      <NewsList list={spectifyList} {...props} isSupport />,
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
          name="Medical"
          component={renderList(medicalNewsList)}
          options={{
            title: translate("support.medical"),
          }}
        />
        <Tab.Screen
          name="Driver"
          component={renderList(driverNewsList)}
          options={{
            title: translate("support.driver"),
          }}
        />
        <Tab.Screen
          name="Finace"
          component={renderList(financeNewsList)}
          options={{
            title: translate("support.finance"),
          }}
        />
        <Tab.Screen
          name="Media"
          component={renderList(mediaNewsList)}
          options={{
            title: translate("support.media"),
          }}
        />
        {/* <Tab.Screen
          name="OtherOfSupport"
          component={renderList(otherOfSupportNewsList)}
          options={{
            title: translate("support.other"),
          }}
        /> */}
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
