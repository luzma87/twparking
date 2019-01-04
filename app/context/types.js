/* @flow */

export type Car = {
  plate: string
}

export type User = {
  name: string,
  car: Car
}

export type GlobalContext = {
  user: User,
  updateUser: (User) => void,
};
