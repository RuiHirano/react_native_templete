import React, { createContext } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


type SpinnerStatus = { visible: boolean, message: string }

// use this now
type ContextValue = {
    showSpinner: (message: string) => void
    dismissSpinner: () => void
}
export const SpinnerContext = createContext({} as ContextValue)

export const SpinnerProvider: React.FC<{}> = ({ children }) => {

    const [status, setStatus] = useState<SpinnerStatus>({ visible: false, message: "" });

    const showSpinner = (message: string) => setStatus({ visible: true, message: message });

    const dismissSpinner = () => setStatus({ ...status, visible: false });

    return (
        <SpinnerContext.Provider value={{ showSpinner, dismissSpinner }}>
            {children}
            <Spinner
                visible={status.visible}
                textContent={status.message}
                textStyle={{ color: "white" }}
                overlayColor={"rgba(0,0,0,0.50)"}
            />
        </SpinnerContext.Provider>
    )
}