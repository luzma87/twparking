/* @flow */

export type User = {
  name: string
}

export type Car = {
  plate: string
}

export type GlobalContext = {
  user: User,
  updateUser: (User) => void,
};
