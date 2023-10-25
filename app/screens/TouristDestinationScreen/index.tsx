import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"

import { TouristDestinationTab } from "./TouristDestinationTab"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TouristDestination: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TouristDestination" component={TouristDestinationScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const TouristDestinationScreen = observer(function TouristDestinationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <TouristDestinationTab />
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
