import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl } from 'react-native';
import { ListItem, Avatar, Button, Card, Input } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { Message, User } from '../../types';
//import Amplify from '@aws-amplify/core';
//import Auth from '@aws-amplify/auth';
//import moment, { Moment } from "moment";
//import { createUser } from '../../utils/util';
//import { userActions } from '../../redux/module/user';
//import { useDispatch } from 'react-redux';
//import config from '../../../aws-exports.js';
//const config = require('../../../aws-exports').config;
//Amplify.configure(config);

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: "blue"
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    content: {
        width: 500,
        height: 500,
    },
    container: {
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        height: 200,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})

const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'


interface SignupProps {
    onChangePage: (tgtpage: "Signup" | "Signin") => void
}
const Signup: React.FC<SignupProps> = (props) => {
    const { onChangePage } = props
    const [data, setData] = useState({ username: "", password: "", email: "", code: "" })
    const [status, setStatus] = useState("Signup")
    //const dispatch = useDispatch();



    const submit = () => {
        console.log("submit ", data)
        /*Auth.signUp({
            username: data.username,
            password: data.password,
            attributes: {
                email: data.email,
            },
        }).then(() => {
            setStatus("Confirm")
            //Actions.reset("tabbar")
        }).catch(error => {
            console.log("err: ", error)
            switch (error.code) {
                case 'UsernameExistsException':
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    setStatus("Confirm")
                case 'InvalidPasswordException':
                // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
                case 'InvalidParameterException':
                // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
                // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
                default:
                    // その他のエラー
                    console.log(error)
            }
        });*/
    }

    const confirm = () => {
        console.log("confirm ", data)
        /*Auth.confirmSignUp(
            data.username,
            data.code,
        ).then(async () => {
            console.log("data: ", data)
            Auth.signIn({
                username: data.username,
                password: data.password,
            }).then(async () => {
                //await Auth.currentAuthenticatedUser()

                const userInfo = await Auth.currentUserInfo()
                console.log("userInfo", userInfo)
                const user: User = {
                    id: userInfo.id,
                    name: data.username,
                    description: "",
                    email: data.email,
                    avatar: mockImageUrl,
                    birthday: undefined,
                    messages: [],
                    sex: "NONE",
                    createdAt: moment(),
                    updatedAt: moment(),
                }
                await createUser(user)
                dispatch(userActions.updateUser(user))
                Actions.reset("tabbar")
            }).catch(err => console.log("err: ", err));
            //const user = await Auth.currentAuthenticatedUser()
            //console.log("user", user)
            //setStatus("Confirm")

            //onChangePage("Signin")
        }).catch(error => {
            console.log("error: ", error)
            switch (error.code) {
                case 'CodeMismatchException':
                // 無効なコードが入力された場合に起こる。
                case 'LimitExceededException':
                // コードを間違え続けた場合に起こる。
                case 'ExpiredCodeException':
                // コードが期限切れ（24時間をオーバー）した場合に起こる。
                // 注) username が存在しない・無効化されている場合にも起こる。
                case 'NotAuthorizedException':
                // 既にステータスが CONFIRMED になっている場合に起こる。
                case 'CodeDeliveryFailureException':
                // 検証コードの送信に失敗した場合に起こる。
                default:
                    // その他のエラー
                    console.log(error)
            };
        })*/
    }

    const resendCode = async () => {
        /*await Auth.resendSignUp(
            data.username  // singUp時に入力したuserId
        )*/
    }

    if (status === "Confirm") {
        return (
            <View>
                <Text>Code</Text>
                <Input defaultValue={data.code} onChangeText={(value) => setData({ ...data, code: value })} />
                <Button onPress={confirm} title="確認する" />
                <Button onPress={resendCode} type="clear" title="コードを再送する" />
                <Button onPress={() => setStatus("Signup")} type="clear" title="戻る" />
            </View>
        )
    }

    return (
        <ScrollView>
            <Text>Username</Text>
            <Input defaultValue={data.username} onChangeText={(value) => setData({ ...data, username: value })} />
            <Text>Email</Text>
            <Input defaultValue={data.email} onChangeText={(value) => setData({ ...data, email: value })} />
            <Text>Password</Text>
            <Input defaultValue={data.password} onChangeText={(value) => setData({ ...data, password: value })} />
            <Button onPress={submit} title="Signup" />
            <Button onPress={() => onChangePage("Signin")} type="clear" title="ログインする" />
        </ScrollView>
    )

}

interface SigninProps {
    onChangePage: (tgtpage: "Signup" | "Signin") => void
}
const Signin: React.FC<SigninProps> = (props) => {
    const { onChangePage } = props
    const [data, setData] = useState({ username: "", password: "" })
    const [status, setStatus] = useState("Signin")
    //const dispatch = useDispatch();


    const submit = () => {
        console.log("submit ", data)
        /*Auth.signIn({
            username: data.username,
            password: data.password,
        })
            .then(async () => {
                const userInfo = await Auth.currentUserInfo()
                console.log("userInfo", userInfo)
                const user: User = {
                    id: userInfo.id,
                    name: data.username,
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
            })
            .catch(err => console.log("err: ", err));*/
    }



    return (
        <View>
            <Text>Username</Text>
            <Input onChangeText={(value) => setData({ ...data, username: value })} />
            <Text>Password</Text>
            <Input onChangeText={(value) => setData({ ...data, password: value })} />
            <Button onPress={submit} title="ログイン" />
            <Button onPress={() => onChangePage("Signup")} type="clear" title="ユーザを作成する" />
        </View>
    )

}


const SignPage: React.FC = () => {
    const [page, setPage] = useState<"Signup" | "Signin">("Signin")

    const onChangePage = (tgtpage: "Signup" | "Signin") => {
        setPage(tgtpage)
    }

    useEffect(() => {
        console.log("mount")
        const user = true
        if (user) {
            console.log("go timeline")
            //Actions.push("tabbar")
        }
    }, [])

    switch (page) {
        case "Signin":
            return <Signin onChangePage={onChangePage} />
        case "Signup":
            return <Signup onChangePage={onChangePage} />
    }
}

export default SignPage