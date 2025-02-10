import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const stepperService = {
  getCountries: (): Promise<{ data: { name: string; iso2: string }[] }> => {
    return axiosClient.get(URLs.countries.get)
  },
  getCities: (country: string): Promise<{ name: string }[]> => {
    return axiosClient.get(`${URLs.countries.get}/${country}/cities`)
  }
}
