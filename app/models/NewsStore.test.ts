import { NewsStoreModel } from "./NewsStore"

test("can be created", () => {
  const instance = NewsStoreModel.create({})

  expect(instance).toBeTruthy()
})
