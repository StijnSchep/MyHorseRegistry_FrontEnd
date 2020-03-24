export class User {
  _id: string
  name: string
  role: number
  password: string

  constructor(values = {}) {
    Object.assign(this, values)
  }

  getRole() {
    switch (this.role) {
      case 1:
        return 'Admin'
      case 2:
        return 'Adverteerder'
      case 3:
        return 'Medewerker'
    }
  }
}
