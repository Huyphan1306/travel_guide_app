/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore, useStores } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"

import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import Config from "./config"

setupReactotron({
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  logInitialState: true,
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    MakeNews: "makeNews",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

function App(props: AppProps) {
  const { hideSplashScreen } = props
  const { onNavigationStateChange, isRestored: isNavigationStateRestored } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  const { newsStore } = useStores()
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 100)
  })

  useEffect(() => {
    if (Config.isAdmin) return

    const unListenerNews = firestore()
      .collection<ListNewsItem>("news")
      .onSnapshot(({ docs }) => {
        const listNews = docs.map((tourist) => {
          const date = tourist.data().date as unknown as FirebaseFirestoreTypes.Timestamp
          return { id: tourist.id, ...tourist.data(), date: date?.toDate()?.getTime() }
        })

        newsStore.setNewsList(listNews)
      })
    return unListenerNews
  }, [])

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = {
    prefixes: [prefix],
    config,
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator linking={linking} onStateChange={onNavigationStateChange} />
    </SafeAreaProvider>
  )
}

export default App
