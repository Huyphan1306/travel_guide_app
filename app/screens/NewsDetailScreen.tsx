/* eslint-disable react/display-name */
import React, { FC, memo, useCallback, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native"
import { Icon } from "../components"
import { AppStackScreenProps } from "@navigators"
import { getCollection } from "@app/firebase/firestore"
import { NewsSnapshotOut } from "@app/models"
import { colors, scaleSize, spacing, withSize } from "@theme"
import WebView from "react-native-webview"
import { formatDateTime } from "@utils/formatDate"
import { useSafeAreaInsetsStyle } from "@utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import newsLoading from "@assets/animations/news-loading.json"
import Lottie from "lottie-react-native"
import openMap from "react-native-open-maps"

export const NewsDetailScreen: FC<AppStackScreenProps<"NewsDetail">> = observer(
  function NewsDetailScreen({ route }) {
    const [contents, setContents] = useState<IContents>()
    const { bottom } = useSafeAreaInsets()
    const news = route.params || ({} as NewsSnapshotOut)

    const openMaps = useCallback(() => {
      openMap({ latitude: +news.lat, longitude: +news.long })
    }, [])
    const showMapsIcon = useMemo(() => !!(news.lat && news.long), [])

    useLayoutEffect(() => {
      if (route.params?.id) {
        getCollection<IContents>("contents")
          .doc(route.params.id)
          .get()
          .then((doc) => setContents(doc.data() as IContents))
      }
    }, [])

    const mediaHtml = news.video_url
      ? `<video controls preload="metadata"><source src="${news.video_url}#t=0.1"></video>`
      : `<img src="${news.image_url}"/>`

    return (
      <View style={$root}>
        <Header onOpenMaps={openMaps} showMapsIcon={showMapsIcon} />
        <WebView
          javaScriptEnabled={true}
          source={{
            html: `<html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                  crossorigin="anonymous"
                />
                <script
                  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
                  integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
                  crossorigin="anonymous"
                ></script>
              </head>
              <style>
                body {
                  background-color: ${colors.background};
                  transition: opacity 0.5s ease-in-out;
                  padding-bottom:${bottom}px;
                }
                body.appear-component-visible {
                  opacity: 1;
                }
                img {
                  width: 100%;
                  height: auto;
                  border-radius: ${spacing.small}px;
                  margin-top: 2vw;
                }
                video {
                  width: 100%;
                  height: auto;
                  border-radius: ${spacing.small}px;
                  margin-top: 2vw;
                }
                #root {
                  font-size: 4.7vw;
                }
                br {
                  content: "" !important;
                  display: block !important;
                  margin-bottom: 1em !important;
                }
                h4 {
                  font-style: oblique;
                  font-weight: bold;
                }
              </style>
              <body>
                <h1>${news.title}</h1>
                <p>${formatDateTime(news.date)}</p>
                ${mediaHtml}
                
                <div id="root">
                ${contents?.content || ""}
                </div>
              </body>
            </html>
            `,
          }}
          startInLoadingState
          renderLoading={() => (
            <View
              style={{
                backgroundColor: colors.background,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Lottie source={newsLoading} autoPlay loop />
            </View>
          )}
          containerStyle={{ backgroundColor: colors.background }}
          showsVerticalScrollIndicator={false}
          style={$webView}
          scalesPageToFit={false}
        />
      </View>
    )
  },
)

type HeaderProps = ViewProps & { onOpenMaps?: () => void; showMapsIcon?: boolean }

const Header = memo(({ style, onOpenMaps, showMapsIcon, ...otherProps }: HeaderProps) => {
  const safeStyle = useSafeAreaInsetsStyle(["top"], "padding")
  const { goBack } = useNavigation()
  const $style = [safeStyle, $headerStyle, style]
  return (
    <View style={$style} {...otherProps}>
      <TouchableOpacity onPress={goBack}>
        <Icon style={$backIcon} icon="back" />
      </TouchableOpacity>
      {showMapsIcon && (
        <TouchableOpacity onPress={onOpenMaps}>
          <Icon style={$mapIcon} icon="map" />
        </TouchableOpacity>
      )}
    </View>
  )
})

const $backIcon: ImageStyle = withSize(scaleSize(30))
const $mapIcon: ImageStyle = withSize(scaleSize(25))

const $headerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingRight: spacing.small,
  marginBottom: spacing.smaller,
}

const $root: ViewStyle = { flex: 1, paddingHorizontal: spacing.smaller }
const $webView: ViewStyle = {
  flexShrink: 1,
  backgroundColor: colors.background,
}
