/* @flow */

export type Car = {
  plate: string,
  vehicle?: string | number,
  brand?: string,
  model?: string,
  size?: string
}

export type User = {
  name: string,
  car: Car
}

export type ParkingSpot = {
  building: string,
  number: string,
  address: string,
  size: 'S' | 'M' | 'L',
  cost: number,
  active: boolean,
  coords?: {
    lat: number,
    long: number
  },
  comments?: string
}

export type Owner = {
  id: string,
  name: string,
  email: string,
  bank: string,
  parkingSpots: Array<ParkingSpot>
}

export type Account = {
  account: string,
  bank: string,
  beneficiary: string,
  id: string,
}

export type payments = 'Pending' | 'Paid'

export type GlobalContext = {
  user: User,
  updateUser: (User) => void,
};
