import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

import { NewsSnapshotOut } from "@app/models"
import { NewsItem } from "./NewsItem"
import Animated from "react-native-reanimated"
import { SupportNewsItem } from "./SupportNewsItem"
import { Empty } from "./Empty"
import { spacing } from "@theme"

export interface NewsListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  list: Array<NewsSnapshotOut>
  isSupport?: boolean
}

/**
 * Describe your component here
 */
export const NewsList = function NewsList(props: NewsListProps) {
  const { style, list = [], isSupport = false } = props
  const $styles = [$container, style]
  const renderItem = ({ item }) => {
    return isSupport ? <SupportNewsItem news={item} /> : <NewsItem news={item} />
  }

  return (
    <Animated.FlatList
      numColumns={isSupport ? 2 : undefined}
      style={$styles}
      data={list}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={isSupport && $rowItemStyle}
      ListEmptyComponent={Empty}
    />
  )
}
const $container: ViewStyle = {
  flex: 1,
}

const $rowItemStyle: ViewStyle = {
  justifyContent: "flex-start",
  marginHorizontal: spacing.small / 2,
}
