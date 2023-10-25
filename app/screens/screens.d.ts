declare type NewsType = {
  title: string
  subtitle: string
  date: number
  image_url: string
  video_url: string
  category: string
  sub_category: string[]
  map_url: string
  content: string
  id: string
  lat: string
  long: string
}
declare type NewsInputType = Omit<NewsType, "sub_category" | "date"> & {
  sub_category: string
  date: number
}
declare type ListNewsItem = Omit<NewsType, "date"> & {
  date: number
}
declare type IContents = {
  content: string
}
