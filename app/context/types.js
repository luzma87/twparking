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

export type GlobalContext = {
  user: User,
  updateUser: (User) => void,
};
