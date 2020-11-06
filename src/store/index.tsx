import React from 'react'
import { UserProvider } from './user'
import { ItemProvider } from './item'

const StoreProvider: React.FC<{}> = ({ children }) => {

	return (
		<UserProvider>
			<ItemProvider>
				{children}
			</ItemProvider>
		</UserProvider>
	)
}

export default StoreProvider