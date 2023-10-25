const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    validateRequire: "This field cannot be empty",
    resultSearchIsEmpty: "No search results",
    newsOfCatogeryIsEmpty: "There are currently no posts on this category",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  makeNews: {
    makeNews: "Make News",
    title: "Title",
    titleFieldPlaceholder: "Enter your title",
    content: "Content",
    imageUrl: "Image Url",
    category: "Category",
    sub_categories: "Sub Categories",
    mapUrl: "Map URL",
    subTitle: "Sub Title",
    videoUrl: "Video URL",
    htmlContent: "Html Content",
    phoneNumber: "Phone NumberContact",
    breakingNews: "Breaking News",
    selectPlaceholder: "--Please select--",
    mapsInfo: "Maps",
    latitude: "Latitude",
    longitude: "Longitude",
  },
  tourism: {
    culture: "Culture",
    craftVillage: "Craft Village",
    nature: "Nature",
    architecture: "Architecture",
    other: "Other",
  },
  experience: {
    sport: "Sport",
    cuisine: "Cuisine",
    shopping: "Shopping",
    entertainment: "Entertainment",
    accommodation: "Accommodation",
  },
  support: {
    medical: "medical",
    driver: "Driver",
    finance: "Finance",
    media: "Media",
    other: "Other",
  },
  adminListNews: {
    title: "List News",
  },
  categoryTitle: { tourism: "Tourism", experience: "Experience", support: "Support" },
  newsDetail: {
    getDirections: "Get Directions",
  },
}

export default en
export type Translations = typeof en
