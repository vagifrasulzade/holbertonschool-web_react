import React from "react"

const user = {
  email: '',
  password: '',
  isLoggedIn: false,
}

export function logOut() {}

const newContext = React.createContext({
  user,
  logOut
});

export default newContext;
