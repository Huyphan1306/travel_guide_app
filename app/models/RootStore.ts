import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NewsStoreModel } from "./NewsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  newsStore: types.optional(NewsStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
