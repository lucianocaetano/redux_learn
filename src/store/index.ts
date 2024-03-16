import { Middleware, configureStore } from "@reduxjs/toolkit"
import UserReducer, { rollbackUser, UserWithId } from "./users/users.slice"
import {toast} from "sonner"

const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

export const syncWitchDatabase: Middleware = (store) => (next) => (action) => {
  const previousState = store.getState()
  const { type, payload } = action
  next(action)

  if(type === "users/deleteUserById") {
    const userToRemove = previousState.users.find((user: UserWithId) => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      "method": "DELETE"
    })
      .then(res => {
        if(res.ok){
          toast.success(`Usuario ${payload} Eliminado correctamente`)
        }
      })
      .catch(err => {
        toast.error("Error al eliminar el usuario")
        if (userToRemove) {
          store.dispatch(rollbackUser(userToRemove))
        }
        console.error(err)
      })
  }
}


export const store = configureStore({
  reducer: {
    users: UserReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistenceMiddleware).concat(syncWitchDatabase),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
