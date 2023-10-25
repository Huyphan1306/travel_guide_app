declare type ValueForm = string | undefined
declare type FormDataType<T> = { [key in keyof T]: T[key] }
declare type FormDataOptionalType<T> = { [key in keyof T]?: ValueForm }

declare type ReturnTypeValidate<T> = [boolean, FormDataType<T>]
declare type RegisterComponentForm<T> = <Key extends keyof T>(
  key: Key,
) => {
  value: FormDataType<T>[Key]
  errorMessage: FormDataOptionalType<T>[Key]
  onChangeText: (value?: T[Key]) => void
}
