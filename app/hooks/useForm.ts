import { useState, useCallback } from "react"
import { translate } from "../i18n"
import { isEmptyList, resetToDefaultValue } from "../utils"
import { ValidateReturnType } from "../utils/validate"

type ValidateRules<T> = (input: T | undefined, data?: any) => ValidateReturnType

type TypeInputData<T> =
  | []
  | [ValidateRules<T>[] | undefined]
  | [/* Validate */ ValidateRules<T>[] | undefined, /* Default Value */ T | null]
type Props<T> = {
  [key in keyof T]?: TypeInputData<T[key]>
} & {
  initData?: T
}
export type ValidateParams = {
  hideError?: boolean
}
export type ValidateFunc<T> = (params?: ValidateParams) => ReturnTypeValidate<T>

export const useForm = <T>({ initData, ...props }: Props<T>) => {
  // Init Data in form
  const [formData, setFormData] = useState<FormDataType<T>>(
    (() => {
      const formObject: FormDataType<T> = {} as FormDataType<T>
      Object.keys(props).forEach((key) => {
        formObject[key] = initData?.[key]
      })
      return formObject
    })(),
  )
  const [errors, setErrors] = useState<FormDataOptionalType<T>>({})

  const onValidateField = <Key extends keyof T>(key: Key, value?: T[Key]) => {
    const [validateList] = props[key]
    let errorMessage = ""
    validateList &&
      (validateList as any[])?.every((funcValidate) => {
        const errMessage = funcValidate(value, formData)
        errMessage && (errorMessage = translate(errMessage))
        return !errorMessage
      })
    return errorMessage
  }

  const onChange = useCallback(
    <Key extends keyof T>(key: Key) => {
      return (value?: T[Key]) => {
        const errorsValidate: FormDataOptionalType<T> = { ...errors, [key]: undefined }
        const errorMessage = onValidateField(key, value)
        errorMessage && (errorsValidate[key] = errorMessage)

        setErrors({ ...errorsValidate })
        setFormData({ ...formData, [key]: value })
      }
    },
    [formData, errors],
  )

  const onValidate = useCallback(
    ({ hideError }: ValidateParams = {}): ReturnTypeValidate<T> => {
      // Error Object
      const errorsValidate: FormDataOptionalType<T> = {}
      // Loop for object and assign error
      for (const [key, value] of Object.entries(formData) as [keyof T, T[keyof T]][]) {
        const errorMessage = onValidateField(key, value)
        errorMessage && (errorsValidate[key] = errorMessage)
      }
      !hideError && setErrors(errorsValidate)
      return [!Object.keys(errorsValidate).length, formData]
    },
    [formData],
  )
  const setError = (errs: FormDataOptionalType<T>) =>
    !isEmptyList(Object.keys(errs)) && setErrors((_errs) => ({ ..._errs, ...errs }))

  const register = useCallback(
    <Key extends keyof T>(key: Key) => ({
      value: formData[key],
      errorMessage: errors[key],
      onChangeText: onChange(key),
    }),
    [onChange, formData, errors],
  )

  const setFormValue = useCallback((_data: FormDataType<T>) => {
    let data: FormDataType<T>
    const formKeys = Object.keys(props)
    Object.entries(_data).forEach(
      ([key, value]) => formKeys.includes(key) && (data = { ...data, [key]: value }),
    )
    setFormData((formData) => ({ ...formData, ...data }))
  }, [])

  const reset = useCallback(() => {
    let data: FormDataType<T>

    Object.entries(formData).forEach(([key, value]) => {
      data = { ...data, [key]: resetToDefaultValue(value) }
    })

    setFormData(data)

    setErrors({})
  }, [formData])

  return {
    data: formData,
    errors,
    onChange,
    onValidate,
    register,
    reset,
    setErrors: setError,
    setFormData: setFormValue,
  }
}
