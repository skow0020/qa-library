export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(email) {
  return {
    type: SET_AUTHED_USER,
    email
  }
}