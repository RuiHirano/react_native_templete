import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

const SplashPage: React.FC = () => {


    //const dispatch = useDispatch();

    //const [auth, setAuth] = useState<boolean>(false)
    useEffect(() => {
        //Actions.reset("sign")
        (async () => {
            console.log("auth")
            Actions.reset("main")
            /*Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(async () => {
                console.log("go timeline")
                const userInfo = await Auth.currentUserInfo()
                console.log("userInfo", userInfo)
                const user: User = {
                    id: userInfo.id,
                    name: userInfo.username,
                    description: "",
                    email: userInfo.email,
                    avatar: mockImageUrl,
                    birthday: undefined,
                    messages: [],
                    sex: "NONE",
                    createdAt: moment(),
                    updatedAt: moment(),
                }
                dispatch(userActions.updateUser(user))
                Actions.reset("tabbar")
            }).catch(err => {
                console.log("go sign")
                Actions.reset("sign")
            });*/
        })();
    }, [])

    return (
        <View style={{ "backgroundColor": "#FFE4B5", flex: 1, alignItems: 'center', justifyContent: "center" }}>
            <ActivityIndicator size="large" color={"#0066ff"} />
        </View>
    )
}

export default SplashPage