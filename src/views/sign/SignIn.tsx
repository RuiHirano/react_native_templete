import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { Control, Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import AwsAPI from '../../api';
import { User } from '../../types';

const api = new AwsAPI()

interface LabelInputProps {
    label: string
    errorMessage: string | undefined
    control: Control<FormData>
    id: string
}

const LabelInput: React.FC<LabelInputProps> = ({ label, errorMessage, control, id }) => {
    return (
        <Controller
            render={({ onChange, onBlur, value }) => (
                <View>
                    <Text>{label}</Text>
                    <Input
                        testID={id}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        errorMessage={errorMessage}
                    />
                </View>
            )}
            name={id}
            control={control}
            helperText={errorMessage}
            error={errorMessage ? true : false}
            defaultValue=""
        />
    )
}

type FormData = {
    userId: string;
    password: string;
};

interface SignInProps {
    onSignInSuccess: (user: User) => void
    onSignInFeilure: (errMsg: string) => void
    onMoveToSignUp: () => void
}

export const useSignIn = (props: SignInProps) => {
    const { onSignInFeilure, onSignInSuccess, onMoveToSignUp } = props
    const [loading, setLoading] = useState(false)
    //const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    //const [data, setData] = useState({ password: "", userId: "", email: "" })

    const login = async (userId: string, password: string) => {
        setLoading(true)
        //showSpinner("ログインしています...")
        //setData({ ...data, password: password, userId: userId })
        try {
            //console.log("logindata: ", userId, password)
            //await api.signIn(userId, password)
            const user = await api.fetchUser(userId)
            // update to store
            //dispatch({ type: UserActionType.UPDATE_USER, user: user })
            //dispatchTrans({ type: TransactionActionType.UPDATE_TRANSACTIONS, transactions: user.transactions })
            onSignInSuccess(user)
        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "UserNotConfirmedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    onSignInFeilure("メールアドレス認証が完了していません")
                    break

                case 'UserNotFoundException':
                    // ユーザーが存在しない場合
                    onSignInFeilure("ユーザーが存在しません")
                    break
                default:
                    // その他のエラー
                    onSignInFeilure("不明なエラーが発生しました")
            }
        }
        setLoading(false)
        //dismissSpinner()
    };


    const signInSchema = Yup.object().shape({
        userId: Yup.string()
            .required("ユーザーIDを入力してください")
            .min(6, "6文字以上にしてください")
            .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
        password: Yup.string()
            .required("パスワードを入力してください")
            .min(8, "8文字以上にしてください")
            .max(16, "16文字以下にしてください")
            .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
    });

    const { handleSubmit, errors, control } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });

    const onSubmit = handleSubmit(({ userId, password }) => {
        login(userId, password)
    });

    const renderSignIn = useCallback(() => {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ width: '80%', marginTop: '20%' }}>
                    <LabelInput
                        label="ユーザーID (英数字含め6文字以上)"
                        errorMessage={errors.userId ? errors.userId.message : ""}
                        control={control}
                        id={"userId"}
                    />

                    <LabelInput
                        label="パスワード(英数字含め8文字以上)"
                        errorMessage={errors.password ? errors.password.message : ""}
                        control={control}
                        id={"password"}
                    />

                    <Button onPress={() => onSubmit()} title="ログイン" disabled={loading} loading={loading} />
                    <Button onPress={() => onMoveToSignUp()} type="clear" title="ユーザを作成する" />

                </View>
            </View>
        )
    }, [control, errors])

    return { "renderSignIn": renderSignIn }
}


