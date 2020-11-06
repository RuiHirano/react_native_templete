import React, {
	createContext,
	useEffect,
	useReducer,
} from 'react'


export enum UserAction {
	UPDATE_USER = "UPDATE_USER",
}

type ContextValue = {
	state: UserState
	dispatch: (newState: UserAction) => void
}

type UserState = typeof initialState

const initialState = {
	count: 0,
}

export const UserStore = createContext({} as ContextValue)

export const UserProvider: React.FC<{}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state: UserState, action: UserAction) => {
			switch (action) {
				case UserAction.UPDATE_USER:
					return { ...state, count: state.count + 1 }
				default:
					throw new Error()
			};
		},
		initialState,
	)

	useEffect(() => {
		// count が変更された場合の処理
	}, [state.count])

	return (
		<UserStore.Provider value={{ state, dispatch }}>
			{children}
		</UserStore.Provider>
	)
}