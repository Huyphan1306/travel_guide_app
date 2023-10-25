import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const NewsModel = types
  .model("News")
  .props({
    id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    subtitle: types.optional(types.string, ""),
    image_url: types.optional(types.string, ""),
    video_url: types.optional(types.string, ""),
    category: types.optional(types.string, ""),
    sub_category: types.optional(types.array(types.string), []),
    map_url: types.optional(types.string, ""),
    lat: types.optional(types.string, ""),
    long: types.optional(types.string, ""),
    date: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface News extends Instance<typeof NewsModel> {}
export interface NewsSnapshotOut extends SnapshotOut<typeof NewsModel> {}
export interface NewsSnapshotIn extends SnapshotIn<typeof NewsModel> {}
export const createNewsDefaultModel = () => types.optional(NewsModel, {})
