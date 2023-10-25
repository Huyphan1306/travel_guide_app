import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { colors, screenWidth, spacing } from "../theme"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { translate } from "@app/i18n"

export const AdminListNewsScreen: FC<AppStackScreenProps<"AdminListNews">> = observer(
  function AdminListNewsScreen(props) {
    const [listNews, setListNews] = useState<ListNewsItem[]>([])

    useEffect(() => {
      const unListener = firestore()
        .collection<ListNewsItem>("news")
        .onSnapshot(({ docs }) => {
          const listNews = docs.map((tourist) => {
            const date = tourist.data().date as unknown as FirebaseFirestoreTypes.Timestamp
            return { id: tourist.id, ...tourist.data(), date: date?.toDate()?.getTime() }
          })
          setListNews(listNews)
        })
      return unListener
    }, [])

    const moveToMakeNews = (news?: ListNewsItem) => props.navigation.navigate("MakeNews", news)

    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={$rowView}>
          <Text tx="adminListNews.title" preset="heading" style={{ maxWidth: screenWidth * 0.7 }} />
          <Button preset="reversed" tx="makeNews.makeNews" onPress={() => moveToMakeNews()} />
        </View>

        {listNews.map((news) => (
          <TouchableOpacity
            key={news.id}
            style={$containerNewsStyle}
            onPress={() => moveToMakeNews(news)}
          >
            <View
              style={[
                $containerCategory,
                {
                  backgroundColor:
                    CATEGORY_COLORS[news.category as any] || colors.palette.primary400,
                },
              ]}
            >
              <Text>{translate(("categoryTitle." + news.category) as any)}</Text>
            </View>
            <Image style={$imageStyle} source={{ uri: news.image_url || news.video_url }} />
            <Text text={news.title} style={titleNewsStyle} preset="subheading" />
            <Text text={news.subtitle} numberOfLines={3} style={titleNewsStyle} />
          </TouchableOpacity>
        ))}
      </Screen>
    )
  },
)

const CATEGORY_COLORS = {
  tourism: colors.palette.accent400,
  experience: colors.palette.angry100,
  support: colors.palette.secondary200,
}

const $containerCategory: ViewStyle = {
  position: "absolute",
  right: spacing.smaller,
  top: spacing.smaller,
  borderRadius: spacing.medium,
  paddingVertical: spacing.tiny,
  paddingHorizontal: spacing.medium,
  zIndex: 100,
}

const $imageStyle: ImageStyle = {
  flex: 1,
  aspectRatio: 2,
  borderRadius: spacing.small,
}
const $containerNewsStyle: ViewStyle = {
  marginBottom: spacing.medium,
}
const titleNewsStyle: TextStyle = { textAlign: "justify" }

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.medium,
}
const $rowView: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.medium,
}
