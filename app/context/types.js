/* @flow */

export type Car = {
  plate: string,
  vehicle?: string | number,
  brand?: string,
  model?: string,
  size?: CarSize,
  color?: string,
}

export type User = {
  name: string,
  car?: Car,
  id: string,
  bank: string,
  ci: string,
  phone: string,
  user: string,
  spot?: ParkingSpot,
  parkingStars: number,
  admin: boolean,
  champion: boolean,
  enabled: boolean,
}

export type ParkingSpot = {
  building: string,
  number: string,
  address: string,
  size: 'S' | 'M' | 'L',
  cost: number,
  active: boolean,
  free: boolean,
  coords?: {
    lat: number,
    long: number
  },
  comments?: string
}

export type Owner = {
  id: ?string,
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
  type?: string,
}

export type payments = 'Pending' | 'Paid'

export type CarSize = "S" | "M" | "L" | "XL" | "";

export type GlobalContext = {
  user: User,
  updateUser: (User) => void,
};
