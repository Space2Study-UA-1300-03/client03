import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { ItemsWithCount, Offer } from '~/types'

export const offerService = {
  getOffer: (
    search?: string,
    categoryId?: string,
    subjectId?: string
  ): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(`${URLs.offers.get}`, {
      params: { search, categoryId, subjectId }
    })
  }
}
