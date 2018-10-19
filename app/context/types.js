/* @flow */

export type User = {
  name: string
}

export type GlobalContext = {
  user: User,
  updateUser: (User) => void
};
