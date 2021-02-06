import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { ListItem, Avatar, Button, Card, Input } from 'react-native-elements'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Actions } from 'react-native-router-flux';
import { useContext } from "react";
import { UserActionType, UserStore } from "../../store/user";
import { newUser, Item } from '../../types';
import { SnackbarContext } from '../../utils/snackbar';
import { DialogContext } from '../../utils/dialog';
import { SpinnerContext } from '../../utils/spinner';
import { ItemActionType, ItemStore } from '../../store/item';
import moment, { Moment } from "moment";
import { v4 as uuid } from 'uuid';

//const api = new AwsAPI()

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

const SCREEN_WIDTH = Dimensions.get('window').width // Window width
const SCREEN_HEIGHT = Dimensions.get('window').height // Window width


const initItems: Item[] = [
    {
        id: moment().toISOString() + uuid(),
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: moment().toISOString() + uuid(),
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: moment().toISOString() + uuid(),
        createdAt: moment(),
        updatedAt: moment(),
    }
]


const SignPage: React.FC = () => {
    const [page, setPage] = useState<"Signup" | "Signin" | "Confirm">("Signin")
    const [loading, setLoading] = useState(false)
    const { showSnackbar } = useContext(SnackbarContext);
    const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    const { dispatch } = useContext(UserStore);
    const { dispatch: dispatchItem } = useContext(ItemStore);
    const [data, setData] = useState({ password: "", userId: "", email: "" })
    const { showDialog } = useContext(DialogContext);

    const confirm = async (code: string) => {

        setLoading(true)
        showSpinner("確認しています...")
        try {
            //await api.confirmSignUp(data.userId, code, data.password)
            //await api.signIn(data.userId, data.password)

            const user = newUser()
            //console.log("data: ", data)
            user.id = data.userId
            user.email = data.email
            user.items = initItems
            // create user to api
            //await api.createUser(user)
            dispatch({ type: UserActionType.UPDATE_USER, user: user })
            // create init trans
            await user.items.forEach(async (trans) => {
                //await api.createItem(user.id, trans)
            })
            dispatchItem({ type: ItemActionType.UPDATE_ITEM, items: user.items })

            //login(data.userId, data.password)
            showSnackbar("SUCCESS", "登録に成功しました")
            Actions.reset("main")

        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "NotAuthorizedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    if (err.message === "User cannot be confirmed. Current status is CONFIRMED") {
                        setPage("Signin")
                        showSnackbar("ERROR", "すでに確認されています.ログインしてください.")
                    }
                    break

                case 'InvalidPasswordException':
                    // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
                    showSnackbar("ERROR", "パスワードが脆弱です")
                    break
                case 'InvalidParameterException':
                    // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
                    // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
                    showSnackbar("ERROR", "項目が正しくありません")
                    break
                default:
                    // その他のエラー
                    showSnackbar("ERROR", "エラーが発生しました")
            }
            setLoading(false)
        }
        dismissSpinner()
    }

    const resend = async () => {
        //api.resendCode(data.userId)
        showSnackbar("SUCCESS", "確認コードを再送しました")
    }

    const signup = async (userId: string, password: string, email: string) => {

        setLoading(true)
        showSpinner("登録しています...")
        //console.log("sign up", userId, email, password, passwordConfirm)
        setData({ ...data, password: password, userId: userId, email: email })
        try {
            //await api.signUp(userId, password, email)

            setPage("Confirm")
            showSnackbar("SUCCESS", "確認コードを送信しました")
            //console.log("finish signUp")
            //Actions.reset("main")

        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "UsernameExistsException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    setPage("Signin")
                    showSnackbar("ERROR", "すでに同じユーザが存在します.ログインしてください.")
                    break

                case 'InvalidPasswordException':
                    // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
                    showSnackbar("ERROR", "パスワードが脆弱です")
                    break
                case 'InvalidParameterException':
                    // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
                    // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
                    showSnackbar("ERROR", "項目が正しくありません")
                    break
                default:
                    // その他のエラー
                    showSnackbar("ERROR", "エラーが発生しました")
            }
        }
        setLoading(false)
        dismissSpinner()
    }

    const login = async (userId: string, password: string) => {

        setLoading(true)
        showSpinner("ログインしています...")
        setData({ ...data, password: password, userId: userId })
        try {
            //console.log("logindata: ", userId, password)
            //await api.signIn(userId, password)
            //const user = await api.fetchUser(userId)
            // update to store
            //dispatch({ type: UserActionType.UPDATE_USER, user: user })
            //dispatchItem({ type: ItemActionType.UPDATE_ITEM, items: user.items })
            Actions.reset("main")
            showSnackbar("SUCCESS", "ログインしました")

            //history.push("/userhome")
        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "UserNotConfirmedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    setPage("Confirm")
                    resend()
                    showSnackbar("ERROR", "メールアドレス認証が完了していません")
                    break

                case 'UserNotFoundException':
                    // ユーザーが存在しない場合
                    showSnackbar("ERROR", "ユーザーが存在しません")
                    break
                default:
                    // その他のエラー
                    showSnackbar("ERROR", "エラーが発生しました")
            }
        }
        setLoading(false)
        dismissSpinner()
    };

    const renderSignInPage = () => {

        const signInSchema = Yup.object().shape({
            userId: Yup.string()
                .required("必須項目です")
                .min(6, "6文字以上にしてください")
                .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
            password: Yup.string()
                .required("必須項目です")
                .min(8, "8文字以上にしてください")
                .max(16, "16文字以下にしてください")
                .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
        });
        type FormData = {
            userId: string;
            password: string;
        };
        const { handleSubmit, errors, control } = useForm<FormData>({
            resolver: yupResolver(signInSchema)
        });

        const onSubmit = handleSubmit(async ({ userId, password }) => {
            login(userId, password)
        });

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ width: '80%', marginTop: '20%' }}>
                    <Text>ユーザーID (英数字含め6文字以上)</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.userId ? errors.userId.message : ""}
                            />
                        )}
                        name="userId"
                        control={control}
                        helperText={errors.userId ? errors.userId.message : ""}
                        error={errors.userId ? true : false}
                        defaultValue=""
                    />
                    <Text>パスワード</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                secureTextEntry
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.password ? errors.password.message : ""}
                            />
                        )}
                        name="password"
                        control={control}
                        helperText={errors.password ? errors.password.message : ""}
                        error={errors.password ? true : false}
                        defaultValue=""
                    />
                    <Button onPress={onSubmit} title="ログイン" disabled={loading} loading={loading} />
                    <Button onPress={() => setPage("Signup")} type="clear" title="ユーザを作成する" />

                </View>
            </View>
        )
    }


    const renderSignUpPage = () => {

        const signUpSchema = Yup.object().shape({
            userId: Yup.string()
                .min(6, "6文字以上にしてください")
                .max(16, "16文字以下にしてください")
                .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください")
                .required("必須項目です"),
            email: Yup.string()
                .email("アドレスが正しくありません")
                .oneOf(
                    [Yup.ref("email")],
                    "メールアドレスが間違っています"
                )
                .required("必須項目です"),
            password: Yup.string()
                .required("必須項目です")
                .min(8, "8文字以上にしてください")
                .max(16, "16文字以下にしてください")
                .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
            passwordConfirm: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    "パスワードが間違っています"
                )
                .required("必須項目です")
        });
        type FormData = {
            userId: string;
            email: string;
            password: string;
            passwordConfirm: string;
        };
        const { handleSubmit, errors, control } = useForm<FormData>({
            resolver: yupResolver(signUpSchema)
        });
        const onSubmit = handleSubmit(async ({ userId, email, password, passwordConfirm }) => {
            signup(userId, password, email)
        });

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ width: '80%', marginTop: '20%' }}>
                    <Text>ユーザーID (英数字含め6文字以上)</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.userId ? errors.userId.message : ""}
                            />
                        )}
                        name="userId"
                        control={control}
                        helperText={errors.userId ? errors.userId.message : ""}
                        error={errors.userId ? true : false}
                        defaultValue=""
                    />
                    <Text>メールアドレス</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.email ? errors.email.message : ""}
                            />
                        )}
                        name="email"
                        control={control}
                        helperText={errors.email ? errors.email.message : ""}
                        error={errors.email ? true : false}
                        defaultValue=""
                    />
                    <Text>パスワード(英数字含め8文字以上)</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                secureTextEntry
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.password ? errors.password.message : ""}
                            />
                        )}
                        name="password"
                        control={control}
                        helperText={errors.password ? errors.password.message : ""}
                        error={errors.password ? true : false}
                        defaultValue=""
                    />
                    <Text>パスワード(確認)</Text>
                    <Controller
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                secureTextEntry
                                onChangeText={value => onChange(value)}
                                value={value}
                                errorMessage={errors.passwordConfirm ? errors.passwordConfirm.message : ""}
                            />
                        )}
                        name="passwordConfirm"
                        control={control}
                        helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ""}
                        error={errors.passwordConfirm ? true : false}
                        defaultValue=""
                    />
                    <Button onPress={onSubmit} title="登録" loading={loading} disabled={loading} />
                    {/*<Button onPress={() => setStatus("Confirm")} type="clear" title="認証コードの入力" />*/}
                    <Button onPress={() => setPage("Signin")} type="clear" title="ログインする" />
                </View>
            </View>
        )
    }

    const [cordInputRefs, setCordInputRefs] = useState<React.MutableRefObject<Input | null>[]>([useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)])

    const renderConfirmPage = () => {
        const confirmSchema = Yup.object().shape({
            code: Yup.string()
                .length(6, "6文字にしてください")
                .matches(/^\d+$/, '数字のみにしてください')
                .required("必須項目です"),
        });
        type FormData = {
            code: string;
        };
        const { handleSubmit, errors, control } = useForm<FormData>({
            resolver: yupResolver(confirmSchema)
        });
        const onSubmit = handleSubmit(async ({ code }) => {
            console.log("code", code)
            confirm(code)
        });

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '80%', marginTop: '20%' }}>
                        <Text>Code (数字6文字)</Text>

                        <Controller
                            render={({ onChange, onBlur, value }) => (
                                <View>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        {cordInputRefs.map((ref: any, index: number) => (
                                            <View style={{ flex: 1 }} key={index}>
                                                <Input
                                                    key={index}
                                                    ref={ref}
                                                    blurOnSubmit={false}
                                                    //onSubmitEditing={() => { console.log("test") }}
                                                    style={{ borderWidth: 1, borderRadius: 10, textAlign: "center" }}
                                                    onBlur={onBlur}
                                                    keyboardType="numeric"
                                                    onChangeText={oneValue => { // 1つの数字
                                                        if (oneValue !== "") {
                                                            let nextValue = value
                                                            if (value.length < 6) {
                                                                nextValue = value + oneValue.substring(oneValue.length - 1, oneValue.length)
                                                            }
                                                            // 入力されたら次へフォーカス
                                                            if (index !== cordInputRefs.length - 1) {
                                                                cordInputRefs[index + 1].current?.focus()
                                                            }
                                                            console.log("value", oneValue, value, nextValue)
                                                            onChange(nextValue)
                                                        }
                                                    }}
                                                    onKeyPress={({ nativeEvent }) => {
                                                        // 削除されたら前へフォーカス
                                                        if (nativeEvent.key === 'Backspace') {
                                                            let nextValue = value
                                                            if (index == 0) {
                                                                // 最初のindexであれば、空白にする
                                                                nextValue = ""
                                                            } else {

                                                                nextValue = value.substring(0, value.length - 1)
                                                                if (value.length === index) {
                                                                    cordInputRefs[index - 1].current?.focus()
                                                                }
                                                            }
                                                            onChange(nextValue)
                                                        }

                                                    }}
                                                    value={value.substring(index, index + 1)}
                                                //errorMessage={errors.code ? errors.code.message : ""}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={{ color: "red" }}>{errors.code ? errors.code.message : ""}</Text>
                                </View>
                            )}
                            name="code"
                            control={control}
                            helperText={errors.code ? errors.code.message : ""}
                            error={errors.code ? true : false}
                            defaultValue=""
                        />

                        <Button onPress={onSubmit} title="登録" loading={loading} disabled={loading} />
                        {/*<Button onPress={() => setStatus("Confirm")} type="clear" title="認証コードの入力" />*/}
                        <Button onPress={resend} type="clear" title="再送する" />
                    </View>
                </View>
            </View>
        )
    }

    switch (page) {
        case "Signin":
            return renderSignInPage()
        case "Signup":
            return renderSignUpPage()
        case "Confirm":
            return renderConfirmPage()
        default:
            return renderSignInPage()
    }
}

export default SignPage