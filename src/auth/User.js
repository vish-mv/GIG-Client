import {AuthStore} from "./AuthStore";

const authStorage= localStorage;

export function getAuthUser() {
  return authStorage.getItem(AuthStore.user)
}

export function setAuthUser(user) {
  authStorage.setItem(AuthStore.user,user)
}

export function getAuthToken() {
  return authStorage.getItem(AuthStore.token)
}

export function setAuthToken(token) {
  authStorage.setItem(AuthStore.token,token)
}

export function logout() {
  for (const [key,value] of Object.entries(AuthStore)) {
    authStorage.removeItem(value);
  }
}
