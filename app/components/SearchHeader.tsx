import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, dimensions, scaleFont } from "../theme"
import { Ionicons } from "@expo/vector-icons"
import { TextField } from "./TextField"
import { useNavigation } from "@react-navigation/native"
import { Header } from "@react-navigation/elements"
import { useStores } from "@app/models"

export interface SearchHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const SearchHeader = observer(function SearchHeader(props: SearchHeaderProps) {
  const { style } = props
  const navigation = useNavigation()
  const {
    newsStore: { setKeyword, keyword },
  } = useStores()
  const renderHeaderLeft = () => {
    return (
      <View style={$searchContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
            setKeyword("")
          }}
        >
          <Ionicons name="chevron-back" size={26} color={"#fff"} />
        </TouchableOpacity>
        <TextField
          style={$textField}
          containerStyle={$textFieldContainer}
          inputWrapperStyle={$inputWrapper}
          placeholder={"Tìm kiếm"}
          placeholderTextColor="#fff"
          cursorColor={"#fff"}
          autoFocus
          onChangeText={setKeyword}
          value={keyword}
        />
      </View>
    )
  }

  return <Header headerStyle={[$container, style]} headerLeft={renderHeaderLeft} title={""} />
})

const $container: ViewStyle = {
  backgroundColor: colors.primary,
}
const $searchContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: dimensions.width * 0.92,
}
const $textFieldContainer: ViewStyle = {
  flex: 1,
  borderColor: "rgba(255,255,255,0.4)",
}
const $inputWrapper: ViewStyle = {
  backgroundColor: colors.transparent,
  borderWidth: 0,
}
const $textField: TextStyle = {
  color: "#fff",
  fontSize: scaleFont(16),
}
