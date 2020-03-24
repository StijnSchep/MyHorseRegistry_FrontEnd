import { Horse } from 'src/app/horse-management/models/horse.model'

export class Website {
  _id: string
  name: string
  URL: string
  monthlyPrice: number
  pricePerAd: number
  horses: Array<Horse>

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
