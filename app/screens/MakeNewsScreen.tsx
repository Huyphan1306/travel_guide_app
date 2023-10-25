import React, { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import {
  Button,
  DropdownItemType,
  DropdownPicker,
  DropdownPickerRef,
  Screen,
  Text,
  TextField,
} from "../components"
import { useForm } from "../hooks/useForm"
import { colors, spacing } from "../theme"
import { DocumentReference, getCollection } from "../firebase/firestore"
import { removeUndefinedField, validateRequire } from "../utils"
import { translate } from "@app/i18n"
import en from "@app/i18n/en"

export const MakeNewsScreen: FC<AppStackScreenProps<"MakeNews">> = observer(
  function MakeNewsScreen({ route, navigation }) {
    const initData: NewsInputType = useMemo(() => {
      const params = route.params

      if (!params) return {} as NewsInputType
      return {
        ...params,
        sub_category: params.sub_category?.join(", "),
        category: "",
      }
    }, [])

    const [itemsSubCategories, setItemsSubCategories] = useState([])
    const refSubCategoryPicker = useRef<DropdownPickerRef>()
    const refCategoryPicker = useRef<DropdownPickerRef>()

    const { register, onValidate, setFormData, onChange, data } = useForm<NewsInputType>({
      title: [[validateRequire], ""],
      subtitle: [[validateRequire]],
      category: [[validateRequire], ""],
      content: [[validateRequire]],
      image_url: [[]],
      video_url: [[]],
      sub_category: [],
      lat: [],
      long: [],
      initData,
    })

    useLayoutEffect(() => {
      if (route.params?.id) {
        getCollection<NewsType>("contents")
          .doc(route.params.id)
          .get()
          .then((doc) => setFormData(doc.data() as any))
      }
    }, [])

    const onSuccessCreated = () => navigation.goBack()

    /**
     * @param isSave true: `Save` function
     * @param isSave false: `Create` function
     */
    const onMakeNews = (isSave?: boolean) => {
      const [isValid, data] = onValidate()
      if (isValid) {
        const { content, ...subData } = data
        let documentID = isSave && route.params.id

        const news = {
          date: isSave ? new Date(initData.date) : new Date(),
          ...removeUndefinedField(subData),
          sub_category: refSubCategoryPicker?.current?.getValue(),
        }

        const session = isSave
          ? getCollection("news").doc(documentID).set(news)
          : getCollection("news").add(news)

        session.then(
          /** Save content then show success dialog */
          (data) => {
            if (!isSave) documentID = (data as DocumentReference).id

            getCollection("contents").doc(documentID).set({ content }).then(onSuccessCreated)
          },
          (reason) => Alert.alert("Failed", reason),
        )
      }
    }

    const onDelete = () => {
      getCollection("news")
        .doc(route.params.id)
        .delete()
        .then(
          () => getCollection("contents").doc(route.params.id).delete().then(onSuccessCreated),
          (reason) => Alert.alert("Failed", reason),
        )
    }

    const onPickerCategory = (category: DropdownItemType, isInit?: boolean) => {
      onChange("category")(category.value)
      if (category.value === data.category) return

      !isInit && refSubCategoryPicker.current?.setValue([])

      const itemsSubCategories = Object.keys(en[category.value]).map<DropdownItemType>(
        (subCategoryValue) => ({
          label: translate((category.value + "." + subCategoryValue) as any),
          value: subCategoryValue,
        }),
      )
      itemsSubCategories.push({ label: translate("makeNews.breakingNews"), value: "breakingNews" })

      setItemsSubCategories(itemsSubCategories)
    }

    useEffect(() => {
      route.params?.category && onPickerCategory({ value: route.params?.category }, true)
    }, [])

    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={$rowView}>
          <Text tx="makeNews.makeNews" preset="heading" />
          {route.params?.id && (
            <Button
              preset="reversed"
              text="Delete"
              style={{ backgroundColor: colors.error }}
              onPress={onDelete}
            />
          )}
        </View>

        <TextField
          {...register("title")}
          multiline
          containerStyle={$textField}
          labelTx="makeNews.title"
          placeholderTx="makeNews.titleFieldPlaceholder"
        />
        <TextField
          {...register("subtitle")}
          multiline
          containerStyle={$textField}
          labelTx="makeNews.subTitle"
          placeholderTx="makeNews.subTitle"
        />
        <TextField
          {...register("image_url")}
          containerStyle={$textField}
          labelTx="makeNews.imageUrl"
          keyboardType="url"
          placeholderTx="makeNews.imageUrl"
        />
        <TextField
          {...register("video_url")}
          containerStyle={$textField}
          labelTx="makeNews.videoUrl"
          keyboardType="url"
          placeholderTx="makeNews.videoUrl"
        />

        <DropdownPicker
          {...register("category")}
          zIndex={2}
          ref={refCategoryPicker}
          labelTx="makeNews.category"
          items={categoryItems}
          initValue={route.params?.category}
          onSelectItem={onPickerCategory}
        />
        <DropdownPicker
          labelTx="makeNews.sub_categories"
          zIndex={1}
          ref={refSubCategoryPicker}
          items={itemsSubCategories}
          initValue={route.params?.sub_category || []}
          multiple
        />
        <Text tx="makeNews.mapsInfo" preset="subheading" />
        <View style={$buttonContainer}>
          <TextField
            {...register("lat")}
            containerStyle={$buttonStyle}
            labelTx="makeNews.latitude"
            placeholderTx="makeNews.latitude"
          />
          <TextField
            {...register("long")}
            containerStyle={$buttonStyle}
            labelTx="makeNews.longitude"
            placeholderTx="makeNews.longitude"
          />
        </View>
        <TextField
          {...register("content")}
          containerStyle={$textField}
          labelTx="makeNews.content"
          placeholderTx="makeNews.content"
          multiline
        />
        <View style={$buttonContainer}>
          <Button
            text="Save"
            style={!route.params ? $hideButton : $buttonStyle}
            preset="reversed"
            onPress={() => onMakeNews(true)}
          />
          <Button
            style={$buttonStyle}
            text="Create News"
            preset="reversed"
            onPress={() => onMakeNews(false)}
          />
        </View>
      </Screen>
    )
  },
)

const categoryItems = ["tourism", "experience", "support"].map<DropdownItemType>((type) => ({
  label: translate(("categoryTitle." + type) as any),
  value: type,
}))

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
}
const $textField: ViewStyle = {
  marginBottom: spacing.medium,
}
const $rowView: ViewStyle = {
  marginTop: spacing.smaller,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const $hideButton: ViewStyle = {
  display: "none",
}
const $buttonStyle: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.tiny,
}
const $buttonContainer: ViewStyle = {
  ...$rowView,
  marginBottom: spacing.medium,
}
