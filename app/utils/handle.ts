import { NewsStoreSnapshotOut } from "@app/models"

type INewsModel = Omit<NewsStoreSnapshotOut, "keyword">

const getInitModel = (): INewsModel => ({
  breakingNews: [],
  experience: { accommodation: [], cuisine: [], entertainment: [], shopping: [], sport: [] },
  support: { driver: [], finance: [], media: [], medical: [], other: [] },
  tourism: { architecture: [], craftVillage: [], culture: [], nature: [], other: [] },
})

export const newsDistribution = (listNews: NewsType[]) => {
  const newsModel = getInitModel()
  listNews.forEach((news) => {
    const category = news.category as keyof INewsModel
    if (!category) return

    news.sub_category.forEach((subName) => {
      if (subName === "breakingNews") {
        newsModel.breakingNews.push(news)
        return
      }

      ;(newsModel[category][subName] as NewsType[]).push(news)
    })
  })
  return newsModel
}
