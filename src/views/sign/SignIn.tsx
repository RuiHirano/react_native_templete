import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { Control, Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Actions } from 'react-native-router-flux';
import { useContext } from "react";
import { SnackbarContext } from '../../utils/snackbar';
import { SpinnerContext } from '../../utils/spinner';

interface Props {
    label: string
    errorMessage: string | undefined
    control: Control<FormData>
    id: string
}

const LabelInput: React.FC<Props> = ({ label, errorMessage, control, id }) => {
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

const SignIn: React.FC = () => {
    const [page, setPage] = useState<"Signup" | "Signin" | "Confirm">("Signin")
    const [loading, setLoading] = useState(false)
    const { showSnackbar } = useContext(SnackbarContext);
    const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    const [data, setData] = useState({ password: "", userId: "", email: "" })

    const login = (userId: string, password: string) => {
        setLoading(true)
        showSpinner("ログインしています...")
        setData({ ...data, password: password, userId: userId })
        try {
            //console.log("logindata: ", userId, password)
            //await api.signIn(userId, password)
            const user = //await api.fetchUser(userId)
                // update to store
                //dispatch({ type: UserActionType.UPDATE_USER, user: user })
                //dispatchTrans({ type: TransactionActionType.UPDATE_TRANSACTIONS, transactions: user.transactions })
                Actions.reset("main")
            showSnackbar("SUCCESS", "ログインしました")

            //history.push("/userhome")
        } catch (err) {
            console.log("err: ", err)
            switch (err.code) {
                case "UserNotConfirmedException":
                    // ユーザープール内に既に同じ username が存在する場合に起こる。
                    setPage("Confirm")
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
        //login(userId, password)
    });

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
                    label="パスワード"
                    errorMessage={errors.password ? errors.password.message : ""}
                    control={control}
                    id={"password"}
                />

                <Button onPress={() => onSubmit()} title="ログイン" disabled={loading} loading={loading} />

            </View>
        </View>
    )

}

export default SignIn