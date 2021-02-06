import React, { createContext, useContext, useEffect } from 'react';
import { useCallback, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SnackbarContext } from './snackbar';


type NetinfoType = "OFFLINE" | "WIFI" | "CELLULAR"
type NetinfoStatus = { type: NetinfoType }



// オンラインかオフラインかを判定するprovider
type ContextValue = {
    netInfoType: NetinfoType
}
export const NetinfoContext = createContext({} as ContextValue)

export const NetinfoProvider: React.FC<{}> = ({ children }) => {

    const [status, setStatus] = useState<NetinfoStatus>({ type: "CELLULAR" });
    const { showSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        console.log("subscribe!")
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type, status.type);
            console.log('Is connected?', state.isConnected);
            if (!state.isConnected) {
                console.log("offline")
                setStatus({ ...status, type: "OFFLINE" })
                showSnackbar("ERROR", "オフラインになりました。ネットワークを確認してください。")
            } else {
                setStatus((preStatus) => {
                    if (preStatus.type === "OFFLINE") {
                        console.log("success connecting")
                        showSnackbar("SUCCESS", "オンラインに復帰しました。")
                    }
                    if (state.type === "wifi") {
                        return { ...status, type: "WIFI" }
                    } else {
                        return { ...status, type: "CELLULAR" }
                    }
                })
            }
        });

        // Specify how to clean up after this effect:
        return function cleanup() {
            console.log("cleanup")
            unsubscribe()
        };
    }, [])

    return (
        <NetinfoContext.Provider value={{ netInfoType: status.type }}>
            {children}
        </NetinfoContext.Provider>
    )
}