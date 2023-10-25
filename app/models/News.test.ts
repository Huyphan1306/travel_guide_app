import { NewsModel } from "./News"

test("can be created", () => {
  const instance = NewsModel.create({})

  expect(instance).toBeTruthy()
})
