import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NewsModel } from "./News"

export const TourismModel = types
  .model("Tourism")
  .props({
    culture: types.optional(types.array(NewsModel), []),
    craftVillage: types.optional(types.array(NewsModel), []),
    nature: types.optional(types.array(NewsModel), []),
    architecture: types.optional(types.array(NewsModel), []),
    other: types.optional(types.array(NewsModel), []),
  })
  .actions(withSetPropAction)

export type ITourismModel = SnapshotOut<Instance<typeof TourismModel>>

export const ExperienceModel = types
  .model("Experience", {
    sport: types.optional(types.array(NewsModel), []),
    cuisine: types.optional(types.array(NewsModel), []),
    shopping: types.optional(types.array(NewsModel), []),
    entertainment: types.optional(types.array(NewsModel), []),
    accommodation: types.optional(types.array(NewsModel), []),
  })
  .actions(withSetPropAction)
export type IExperienceModel = SnapshotOut<Instance<typeof TourismModel>>

export const SupportModel = types
  .model("Support", {
    medical: types.optional(types.array(NewsModel), []),
    driver: types.optional(types.array(NewsModel), []),
    finance: types.optional(types.array(NewsModel), []),
    media: types.optional(types.array(NewsModel), []),
    other: types.optional(types.array(NewsModel), []),
  })
  .actions(withSetPropAction)

export type ISupportModel = SnapshotOut<Instance<typeof TourismModel>>
