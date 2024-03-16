import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE=[
  {
    id: "awdddd",
    name: 'Yazmanito Doe',
    email: 'yazmanito@gmail.com',
    github: "yazmanito",
  },
  {
    id: "adaw",
    name: 'Leo Doe',
    email: 'leo@gmail.com',
    github: "Leo",
  },
  {
    id: "dawd",
    name: 'David Clark',
    email: 'david@gmail.com',
    github: "david"
  },
]

export type UserId = string

export interface User {
  name: string,
  email: string,
  github: string,
}

export interface UserWithId extends User {
  id: UserId
} 

const initialState: Array<UserWithId>=(()=>{
  const persistenceState = localStorage.getItem("__redux__state__")
  if(persistenceState){
    return JSON.parse(persistenceState).users
  }
  return DEFAULT_STATE
})()

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createNewUser: (state, action: PayloadAction<User>) => {
      return [
        ...state, 
        {...action.payload, id: crypto.randomUUID()}
      ]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      
      const id = action.payload 
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)

      if(!isUserAlreadyDefined) {

        return [...state, action.payload]
      }
    }
  }
})

export default UserSlice.reducer
export const {deleteUserById, createNewUser, rollbackUser} = UserSlice.actions
