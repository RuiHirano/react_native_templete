import React, { createContext } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";


type DialogStatus = { visible: boolean, message: string, title: string, callback: () => void }

// use this now
type ContextValue = {
    showDialog: (message: string, title: string, callback: () => void) => void
}
export const DialogContext = createContext({} as ContextValue)

export const DialogProvider: React.FC<{}> = ({ children }) => {

    const [status, setStatus] = useState<DialogStatus>({ visible: false, message: "", title: "", callback: () => { } });

    const showDialog = (message: string, title: string, callback: () => void) => setStatus({ visible: true, message: message, title: title, callback: callback });

    const dismissDialog = () => setStatus({ ...status, visible: false });

    const handleOK = () => {
        dismissDialog()
        status.callback()
    }

    return (
        <DialogContext.Provider value={{ showDialog }}>
            {children}
            <View>
                <Dialog.Container visible={status.visible}>
                    <Dialog.Title>{status.title}</Dialog.Title>
                    <Dialog.Description>
                        {status.message}
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={dismissDialog} />
                    <Dialog.Button label="OK" onPress={handleOK} />
                </Dialog.Container>
            </View>
        </DialogContext.Provider>
    )
}