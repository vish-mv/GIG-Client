// import React from "react";
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

export function logout(setUserState) {
  if (!setUserState){
    console.log("user set state function is undefined. This might cause the App to not function properly.")
  }
  setUserState("");
  for (const [key,value] of Object.entries(AuthStore)) {
    console.log("removing auth data:",key);
    authStorage.removeItem(value);
  }
}
