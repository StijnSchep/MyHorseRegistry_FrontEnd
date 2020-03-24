import { Horse } from 'src/app/horse-management/models/horse.model'

export class Reservation {
  _id: string
  horseId: string
  horse: Horse
  active: string
  activated_on: Date
  deactivated_on: Date
  customerName: string
  customerCountry: string

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
