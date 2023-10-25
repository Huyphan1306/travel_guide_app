import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Empty, ResultSearchNewsItem, SearchHeader } from "../components"
import { useStores } from "@app/models"
import { colors, spacing } from "@theme"
import { translate } from "@app/i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Search: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Search" component={SearchScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SearchScreen: FC<StackScreenProps<AppStackScreenProps, "Search">> = observer(
  function SearchScreen() {
    const {
      newsStore: { resultSearchNewsList, isKeywordEmpty },
    } = useStores()
    const renderEmpty = () => {
      return isKeywordEmpty ? null : <Empty label={translate("common.resultSearchIsEmpty")} />
    }
    return (
      <>
        <SearchHeader />
        <FlatList
          keyboardDismissMode="interactive"
          style={$container}
          contentContainerStyle={$content}
          data={resultSearchNewsList}
          renderItem={({ item }) => <ResultSearchNewsItem news={item} />}
          ListEmptyComponent={renderEmpty}
        />
      </>
    )
  },
)
const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $content: ViewStyle = {
  paddingVertical: spacing.small,
}
