import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const languagesService = {
  getLanguages: (): Promise<{ name: string }> => {
    return axiosClient.get(URLs.languages.get)
  }
}
