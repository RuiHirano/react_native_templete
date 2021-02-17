import React, { createContext } from 'react';
import AwsAPI from '../api';

type ContextValue = {
    api: AwsAPI
}
export const APIContext = createContext({} as ContextValue)

export const APIProvider: React.FC<{}> = ({ children }) => {

    const api = new AwsAPI()

    return (
        <APIContext.Provider value={{ api }}>
            {children}
        </APIContext.Provider>
    )
}