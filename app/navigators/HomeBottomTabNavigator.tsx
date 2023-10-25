import React from "react"
import { ExperienceScreen, SupportScreen, TouristDestinationScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { colors, scaleFont, scaleSize, spacing, typography } from "@theme"
import { Ionicons } from "@expo/vector-icons"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from "@components"
import { useNavigation } from "@react-navigation/native"
import { translate } from "@app/i18n"

function TouristDestinationIcon(props) {
  return <Ionicons name="home" size={scaleSize(26)} color={props.color} />
}
function ExperienceIcon(props) {
  return <Ionicons name="heart" size={scaleSize(26)} color={props.color} />
}
function SupportIcon(props) {
  return <Ionicons name="options" size={scaleSize(26)} color={props.color} />
}

export type HomeBottomTabNavigatorParamList = {
  TouristDestination: undefined
  Experience: undefined
  Support: undefined
}

const Tab = createBottomTabNavigator<HomeBottomTabNavigatorParamList>()
export const HomeBottomTabNavigator = () => {
  const navigation = useNavigation()
  const renderHeaderLeft = () => (
    <TouchableOpacity style={$searchButton} onPress={() => navigation.navigate("Search")}>
      <Ionicons name="search" size={20} color={"#fff"} />
      <Text size="md" style={$textSearch}>
        Tìm kiếm
      </Text>
    </TouchableOpacity>
  )
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        headerTitle: "",
        headerLeft: renderHeaderLeft,
        headerStyle: $header,
        tabBarStyle: {},
        tabBarLabelStyle: $tabBarLabel,
        tabBarAllowFontScaling: false,
      }}
    >
      <Tab.Screen
        name="TouristDestination"
        component={TouristDestinationScreen}
        options={{
          title: translate("categoryTitle.tourism"),
          tabBarIcon: TouristDestinationIcon,
        }}
      />
      <Tab.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{
          title: translate("categoryTitle.experience"),
          tabBarIcon: ExperienceIcon,
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: translate("categoryTitle.support"),
          tabBarIcon: SupportIcon,
        }}
      />
    </Tab.Navigator>
  )
}

const $searchButton: ViewStyle = {
  flexDirection: "row",
  marginLeft: spacing.smaller,
  alignItems: "center",
}
const $textSearch: TextStyle = {
  color: "#fff",
  marginLeft: spacing.small,
}

const $tabBarLabel: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: scaleFont(12),
  paddingBottom: scaleFont(4),
}

const $header: ViewStyle = {
  backgroundColor: colors.primary,
}
