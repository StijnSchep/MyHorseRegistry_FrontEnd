import { Reservation } from 'src/app/reservation-management/models/reservation.model'

export class Horse {
  _id: string
  status: string
  officialName: string
  commonName: string
  category: string
  yearOfBirth: number
  gender: string
  color: string
  height: number
  price: number
  date_added: Date
  date_sold: Date
  title: string
  description: string
  active_reservation: Reservation

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
