import React, { useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { useContext } from "react";
import { User } from '../../types';
import { SnackbarContext } from '../../utils/snackbar';
import { useSignIn } from './SignIn';
import { useSignUp } from './SignUp';
import { useConfirm } from './Confirm';

const SignPage: React.FC = () => {

    const [page, setPage] = useState<"Signup" | "Signin" | "Confirm">("Confirm")
    const { showSnackbar } = useContext(SnackbarContext);

    const { renderConfirm } = useConfirm({
        onConfirmFeilure: (errMsg: string) => {
            console.log("feilure")
            showSnackbar("ERROR", errMsg)
        },
        onConfirmSuccess: (user: User) => {
            console.log("success")
            showSnackbar("SUCCESS", "登録に成功しました")
            Actions.reset("main")
        },
        onResendFeilure: (errMsg: string) => {
            console.log("feilure")
            showSnackbar("ERROR", errMsg)
        },
        onResendSuccess: () => {
            console.log("success")
            showSnackbar("SUCCESS", "再送しました")
        },
    })

    const { renderSignIn } = useSignIn({
        onSignInFeilure: (errMsg: string) => {
            console.log("feilure")
            showSnackbar("ERROR", errMsg)
        },
        onSignInSuccess: (user: User) => {
            console.log("success")
            showSnackbar("SUCCESS", "ログインしました")
            Actions.reset("main")
        },
        onMoveToSignUp: () => {
            setPage("Signup")
        }
    })

    const { renderSignUp } = useSignUp({
        onSignUpFeilure: (errMsg: string) => {
            console.log("feilure")
            showSnackbar("ERROR", errMsg)
        },
        onSignUpSuccess: (user: User) => {
            console.log("success")
            showSnackbar("SUCCESS", "新規登録しました")
            Actions.reset("main")
        },
        onMoveToSignIn: () => {
            setPage("Signin")
        }
    })

    switch (page) {
        case "Signin":
            return renderSignIn()
        case "Signup":
            return renderSignUp()
        case "Confirm":
            return renderConfirm()
        default:
            return renderSignIn()
    }
}

export default SignPage