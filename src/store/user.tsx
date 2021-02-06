import React, {
	createContext,
	useEffect,
	useReducer,
} from 'react'
import { newUser, User } from '../types'
import moment, { Moment } from "moment";

const mockUser: User = newUser()

export enum UserActionType {
	UPDATE_USER = "UPDATE_USER",
}

export type UserAction = {
	type: UserActionType
	user: User
}

type ContextValue = {
	state: UserState
	dispatch: (action: UserAction) => void
}

type UserState = typeof initialState

const initialState = {
	user: mockUser,
}

export const UserStore = createContext({} as ContextValue)

export const UserProvider: React.FC<{}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state: UserState, action: UserAction) => {
			switch (action.type) {
				case UserActionType.UPDATE_USER:
					//console.log("User State: ", action.user)
					return { ...state, user: action.user }
				default:
					throw new Error()
			};
		},
		initialState,
	)

	// for debug
	useEffect(() => {
		//console.log("New User State: ", state)
	}, [state])

	return (
		<UserStore.Provider value={{ state, dispatch }}>
			{children}
		</UserStore.Provider>
	)
}