import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NewsModel } from "./News"
import { ExperienceModel, SupportModel, TourismModel } from "./CategoriesModel"
import { newsDistribution } from "@utils/handle"
import { isEmpty, unionBy } from "lodash"
/**
 * Model description here for TypeScript hints.
 */
export const NewsStoreModel = types
  .model("NewsStore")
  .props({
    breakingNews: types.optional(types.array(NewsModel), []),
    keyword: types.optional(types.string, ""),
    tourism: types.optional(TourismModel, {}),
    experience: types.optional(ExperienceModel, {}),
    support: types.optional(SupportModel, {}),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isKeywordEmpty() {
      return store.keyword.match(/^ *$/) !== null
    },
  }))
  .views((store) => ({
    get breakingNewsList() {
      return store.breakingNews
    },
    get cultureNewsList() {
      return store.tourism.culture
    },
    get craftVillageNewsList() {
      return store.tourism.craftVillage
    },
    get natureNewsList() {
      return store.tourism.nature
    },
    get architectureNewsList() {
      return store.tourism.architecture
    },
    get otherOfCultureNewsList() {
      return store.tourism.other
    },
    get sportsNewsList() {
      return store.experience.sport
    },
    get cuisineNewsList() {
      return store.experience.cuisine
    },
    get shoppingNewsList() {
      return store.experience.shopping
    },
    get entertainmentNewsList() {
      return store.experience.entertainment
    },
    get accommodationNewsList() {
      return store.experience.accommodation
    },
    get medicalNewsList() {
      return store.support.medical
    },
    get driverNewsList() {
      return store.support.driver
    },
    get financeNewsList() {
      return store.support.finance
    },
    get mediaNewsList() {
      return store.support.media
    },
    get otherOfSupportNewsList() {
      return store.support.other
    },
    get resultSearchNewsList() {
      const {
        keyword,
        breakingNews,
        tourism: { culture, craftVillage, nature, architecture, other: otherOfTourism },
        experience: { sport, cuisine, shopping, entertainment, accommodation },
        support: { medical, driver, finance, media, other: otherOfSupprot },
      } = store
      const newsList = unionBy(
        breakingNews,
        culture,
        craftVillage,
        nature,
        architecture,
        otherOfTourism,
        sport,
        cuisine,
        shopping,
        entertainment,
        accommodation,
        medical,
        driver,
        finance,
        media,
        otherOfSupprot,
        "id",
      )
      if (store.isKeywordEmpty) {
        return []
      }
      const words = keyword.split(" ").filter((word) => !isEmpty(word))
      console.log(words)
      return newsList.filter((news) => {
        let isValid = false
        words.forEach((word) => {
          isValid =
            isValid ||
            [news.title, news.subtitle]
              .join(" ")
              .toLocaleLowerCase()
              .split(" ")
              .includes(word.toLocaleLowerCase())
        })
        return isValid
      })
    },
  }))
  .actions((store) => ({
    setNewsList(list: NewsType[]) {
      const newsModel = newsDistribution(list)

      applySnapshot(store, { ...store, ...newsModel })
    },
    setKeyword: (text: string) => {
      store.keyword = text
    },
  }))

export interface NewsStore extends Instance<typeof NewsStoreModel> {}
export interface NewsStoreSnapshotOut extends SnapshotOut<typeof NewsStoreModel> {}
export interface NewsStoreSnapshotIn extends SnapshotIn<typeof NewsStoreModel> {}
export const createNewsStoreDefaultModel = () => types.optional(NewsStoreModel, {})
