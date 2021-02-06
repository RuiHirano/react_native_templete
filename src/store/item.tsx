import React, {
	createContext,
	useCallback,
	useEffect,
	useReducer,
} from 'react'
import { newItem, Item } from '../types'
import moment, { Moment } from "moment";

export enum ItemActionType {
	UPDATE_ITEMS = "UPDATE_ITEMS",
	UPDATE_ITEM = "UPDATE_ITEM",
	CREATE_ITEM = "CREATE_ITEM",
	DELETE_ITEM = "DELETE_ITEM",
}

export type ItemAction = {
	type: ItemActionType
	item?: Item
	items?: Item[]
}

type ContextValue = {
	state: ItemState
	dispatch: (action: ItemAction) => void
}

type ItemState = typeof initialState

const initialState = {
	items: [] as Item[],
	//drafts : [] as Item[],
}

export const ItemStore = createContext({} as ContextValue)

export const ItemProvider: React.FC<{}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state: ItemState, action: ItemAction) => {
			switch (action.type) {
				case ItemActionType.UPDATE_ITEMS:
					//console.log("Item State: ", action.items)
					const items = action.items ? action.items : []
					return { ...state, items: items }
				case ItemActionType.UPDATE_ITEM:
					//console.log("Item State: ", action.item)
					const item = action.item ? action.item : newItem()
					const newItems: Item[] = [...state.items]
					state.items.forEach((trans, index) => {
						if (trans.id === item.id) {
							newItems[index] = item
						}
					})
					return { ...state, items: newItems }
				case ItemActionType.CREATE_ITEM:
					//console.log("Item State: ", action.item)
					const trans = action.item ? action.item : newItem()
					const newTranss = [...state.items]
					newTranss.push(trans)
					return { ...state, items: newTranss }
				case ItemActionType.DELETE_ITEM:
					//console.log("Item State: ", action.item, state.items)
					const tran = action.item ? action.item : newItem()
					// delete
					const newTrans: Item[] = []
					state.items.forEach((trans) => {
						if (trans.id !== tran.id) {
							newTrans.push(trans)
						}
					})
					return { ...state, items: newTrans }
				default:
					throw new Error()
			};
		},
		initialState,
	)

	// for debug
	useEffect(() => {
		//console.log("New Item State: ", state)

	}, [state])

	return (
		<ItemStore.Provider value={{ state, dispatch }}>
			{children}
		</ItemStore.Provider>
	)
}