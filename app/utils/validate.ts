import { TxKeyPath } from "../i18n"

export type ValidateReturnType = TxKeyPath | false | ""

export const validateRequire = (text: string): ValidateReturnType =>
  (!text || !/^(?!\s*$).+/.test(text)) && "common.validateRequire"
