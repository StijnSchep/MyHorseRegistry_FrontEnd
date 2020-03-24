export class Todo {
  _id: string
  user = 'anonymous'
  created_at: Date
  updated_at: Date
  updated: boolean
  title: string
  content: string
  doBefore: Date

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
