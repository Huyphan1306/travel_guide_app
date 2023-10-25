import React, { forwardRef, Ref, useImperativeHandle, useState } from "react"
import { observer } from "mobx-react-lite"
import DropDownPickerRN, { ItemType, DropDownPickerProps } from "react-native-dropdown-picker"
import { colors, spacing } from "@theme"
import { TextStyle, ViewStyle } from "react-native"
import { TxKeyPath } from "@app/i18n"
import { Text } from "./Text"

export interface DropdownPickerProps
  extends Pick<
    DropDownPickerProps<any>,
    "style" | "mode" | "disabled" | "dropDownContainerStyle" | "zIndex"
  > {
  items: ItemType<any>[]
  initValue?: any
  multiple?: boolean
  onSelectItem?: (value: ItemType<any>) => void
  labelTx?: TxKeyPath
  labelText?: string
  errorMessage?: string
}
export type DropdownItemType = ItemType<any>

export const DropdownPicker = observer(
  // eslint-disable-next-line react/display-name
  forwardRef((props: DropdownPickerProps, ref: Ref<DropdownPickerRef>) => {
    const {
      initValue,
      items,
      multiple,
      style,
      labelText,
      labelTx,
      errorMessage,
      ...otherDropdownProps
    } = props
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<any>(initValue)

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      getValue: () => value,
      setValue: (value: any) => setValue(value),
    }))

    const $containerStyle = [$dropdownStyle, style]

    return (
      <>
        {labelText || labelTx ? <Text preset="formLabel" text={labelText} tx={labelTx} /> : null}

        <DropDownPickerRN
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          multiple={multiple as false}
          listItemContainerStyle={{ backgroundColor: colors.background }}
          style={$containerStyle}
          listMode="SCROLLVIEW"
          mode={multiple ? "BADGE" : undefined}
          {...otherDropdownProps}
        />

        {!!errorMessage && <Text preset="formHelper" text={errorMessage} style={$errorText} />}
      </>
    )
  }),
)

const $dropdownStyle: ViewStyle = {
  backgroundColor: colors.background,
  borderColor: colors.palette.neutral400,
  marginTop: spacing.smaller,
  marginBottom: spacing.medium,
}

export type DropdownPickerRef = {
  open: () => void
  close: () => void
  getValue: () => any
  setValue: (value: any) => any
}

const $errorText: TextStyle = {
  marginTop: spacing.smaller,
  color: colors.error,
}
