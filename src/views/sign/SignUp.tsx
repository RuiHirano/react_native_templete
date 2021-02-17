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
    email: string;
    password: string;
    passwordConfirm: string;
};

interface SignUpProps {
    onSignUpSuccess: (user: User) => void
    onSignUpFeilure: (errMsg: string) => void
    onMoveToSignIn: () => void
}

export const useSignUp = (props: SignUpProps) => {
    const { onSignUpFeilure, onSignUpSuccess, onMoveToSignIn } = props
    const [loading, setLoading] = useState(false)
    //const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    //const [data, setData] = useState({ password: "", userId: "", email: "" })

    const signup = async (userId: string, email: string, password: string) => {
        setLoading(true)
        //showSpinner("ログインしています...")
        //setData({ ...data, password: password, userId: userId })
        try {
            //console.log("logindata: ", userId, password)
            //await api.signUp(userId, password)
            const user = await api.fetchUser(userId)
            // update to store
            //dispatch({ type: UserActionType.UPDATE_USER, user: user })
            //dispatchTrans({ type: TransactionActionType.UPDATE_TRANSACTIONS, transactions: user.transactions })
            onSignUpSuccess(user)
        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "UserNotConfirmedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    onSignUpFeilure("メールアドレス認証が完了していません")
                    break

                case 'UserNotFoundException':
                    // ユーザーが存在しない場合
                    onSignUpFeilure("ユーザーが存在しません")
                    break
                default:
                    // その他のエラー
                    onSignUpFeilure("不明なエラーが発生しました")
            }
        }
        setLoading(false)
        //dismissSpinner()
    };


    const signUpSchema = Yup.object().shape({
        userId: Yup.string()
            .required("ユーザーIDを入力してください")
            .min(6, "6文字以上にしてください")
            .max(16, "16文字以下にしてください")
            .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
        email: Yup.string()
            .required("メールアドレスを入力してください")
            .email("メールアドレスが正しくありません"),
        password: Yup.string()
            .required("パスワードを入力してください")
            .min(8, "8文字以上にしてください")
            .max(16, "16文字以下にしてください")
            .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
        passwordConfirm: Yup.string()
            .required("パスワードをもう一度入力してください")
            .oneOf(
                [Yup.ref("password")],
                "パスワードが正しくありません"
            )
    });

    const { handleSubmit, errors, control } = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    });

    const onSubmit = handleSubmit(({ userId, email, password }) => {
        signup(userId, email, password)
    });

    const renderSignUp = useCallback(() => {

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
                        label="メールアドレス"
                        errorMessage={errors.email ? errors.email.message : ""}
                        control={control}
                        id={"email"}
                    />

                    <LabelInput
                        label="パスワード(英数字含め8文字以上)"
                        errorMessage={errors.password ? errors.password.message : ""}
                        control={control}
                        id={"password"}
                    />

                    <LabelInput
                        label="パスワード(確認)"
                        errorMessage={errors.passwordConfirm ? errors.passwordConfirm.message : ""}
                        control={control}
                        id={"passwordConfirm"}
                    />

                    <Button onPress={() => onSubmit()} title="登録する" disabled={loading} loading={loading} />
                    <Button onPress={() => onMoveToSignIn()} type="clear" title="ログインする" />

                </View>
            </View>
        )
    }, [control, errors])

    return { "renderSignUp": renderSignUp }
}


