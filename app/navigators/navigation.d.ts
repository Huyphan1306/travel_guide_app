import type { AppStackParamList } from "./AppNavigator"

export type StackParams = {
  [key in NavigateScreenName<keyof typeof screen>]: any
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
