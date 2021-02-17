import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { Control, Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import AwsAPI from '../../api';
import { newUser, User } from '../../types';

type FormData = {
    code: string;
};

interface ConfirmProps {
    onConfirmSuccess: (user: User) => void
    onConfirmFeilure: (errMsg: string) => void
    onResendSuccess: () => void
    onResendFeilure: (errMsg: string) => void
}

export const useConfirm = (props: ConfirmProps) => {
    const { onConfirmFeilure, onConfirmSuccess, onResendFeilure, onResendSuccess } = props
    const [loading, setLoading] = useState(false)
    //const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    //const [data, setData] = useState({ password: "", userId: "", email: "" })
    const confirm = async (code: string) => {

        setLoading(true)
        try {
            //await api.confirmSignUp(data.userId, code, data.password)
            //await api.signIn(data.userId, data.password)

            /*const user = newUser()
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
            dispatchItem({ type: ItemActionType.UPDATE_ITEM, items: user.items })*/
            const user = newUser()
            onConfirmSuccess(user)

        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "NotAuthorizedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    if (err.message === "User cannot be confirmed. Current status is CONFIRMED") {
                        onConfirmFeilure("すでに確認されています.ログインしてください.")
                    }
                    break

                case 'InvalidPasswordException':
                    // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
                    onConfirmFeilure("パスワードが脆弱です")
                    break
                case 'InvalidParameterException':
                    // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
                    // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
                    onConfirmFeilure("項目が正しくありません")
                    break
                default:
                    // その他のエラー
                    onConfirmFeilure("エラーが発生しました")
            }
            setLoading(false)
        }
    }

    const [cordInputRefs, setCordInputRefs] = useState<React.MutableRefObject<Input | null>[]>([useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)])

    const confirmSchema = Yup.object().shape({
        code: Yup.string()
            .length(6, "6文字にしてください")
            .matches(/^\d+$/, '数字のみにしてください'),
    });
    const { handleSubmit, errors, control } = useForm<FormData>({
        resolver: yupResolver(confirmSchema)
    });
    const onSubmit = handleSubmit(async ({ code }) => {
        console.log("code", code)
        confirm(code)
    });

    const resend = async () => {
        try {
            //api.resendCode(data.userId)
            onResendSuccess()
        } catch (err) {
            onResendFeilure("再送に失敗しました")
        }

    }

    const renderConfirm = useCallback(() => {

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
                                                    testID={"input" + index}
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
                                                            //console.log("value", oneValue, value, nextValue)
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
    }, [control, errors])

    return { "renderConfirm": renderConfirm }
}


