export const resetToDefaultValue = (value: any) => {
  switch (typeof value) {
    case "string":
      return ""
    case "number":
      return 0
    default:
      return null
  }
}
export const isEmptyList = (arr: any[]) => arr?.length === 0
export const removeUndefinedField = (obj: object) => {
  Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}
