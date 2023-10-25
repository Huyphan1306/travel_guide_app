import firestore, { FirebaseFirestoreTypes as Type } from "@react-native-firebase/firestore"

export type DocumentData = Type.DocumentData
export type DocumentReference = Type.DocumentReference

export const getCollection = <T extends DocumentData = DocumentData>(
  path?: string,
  document?: Type.DocumentReference<T>,
) => {
  if (!document) return firestore().collection<T>(path)
  return document.collection(path)
}
