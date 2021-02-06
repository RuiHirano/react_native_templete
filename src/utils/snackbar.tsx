import React, { createContext } from 'react';
import { useCallback, useState } from 'react';
import { Snackbar } from 'react-native-paper';


type SnackbarType = "SUCCESS" | "ERROR"
type SnackbarStatus = { type: SnackbarType, visible: boolean, message: string }



// use this now
type ContextValue = {
    showSnackbar: (type: SnackbarType, message: string) => void
}
export const SnackbarContext = createContext({} as ContextValue)

export const SnackbarProvider: React.FC<{}> = ({ children }) => {

    const [status, setStatus] = useState<SnackbarStatus>({ type: "SUCCESS", visible: false, message: "" });

    const showSnackbar = (type: SnackbarType, message: string) => setStatus({ type: type, visible: true, message: message });

    const onDismissSnackbar = () => setStatus({ ...status, visible: false });



    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                visible={status.visible}
                onDismiss={onDismissSnackbar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {status.message}
            </Snackbar>
        </SnackbarContext.Provider>
    )
}