import { IS_LOADING } from "../const/appConst"

export const isLoading = (data: any) => {
  return {
    type: IS_LOADING,
    data,
  }
}