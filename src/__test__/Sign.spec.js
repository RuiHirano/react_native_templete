import React from 'react';
import SignIn from '../views/sign/SignIn'
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react-native';
//import userEvent from '@testing-library/user-event';

describe('SignIn Page', () => {

    it('SignInコンポーネントのレンダリング', () => {
        render(<SignIn />);
        //screen.debug()
    })


    describe('SignIn Button', () => {
        it('SignInボタンが存在する', () => {
            const { getByText } = render(<SignIn />);
            expect(getByText("ログイン"));
        })

        /*it('初期時、SignInボタンをクリックできないようにする', () => {
            const { getByRole } = render(<SignIn />);
            const button = getByRole("button", { name: "ログイン" })
            expect(button).toBeDisabled();
        })

        it('SignInボタンをクリックした場合のみdialogが表示される', () => {
            const { getByRole, queryByText, getByText, getByTestId } = render(<SignIn />);
            const button = getByRole("button", { name: "ログイン" })
            const emailInput = getByTestId("emailField")
            userEvent.type(emailInput, "test@test.com")  // 正しいemail入力
            const passwordInput = getByTestId("passwordField")
            userEvent.type(passwordInput, "testuser")   // 正しいpassword入力
            expect(queryByText("ログインしました")).toBeNull();
            userEvent.click(button)
            expect(getByText("ログインしました")).toBeInTheDocument();
        })

        it('dialogにEmailが表示される', () => {
            const { getByRole, queryByText, getByText, getByTestId } = render(<SignIn />);
            const button = getByRole("button", { name: "ログイン" })
            const emailInput = getByTestId("emailField")
            userEvent.type(emailInput, "test@test.com")  // 正しいemail入力
            const passwordInput = getByTestId("passwordField")
            userEvent.type(passwordInput, "testuser")   // 正しいpassword入力
            userEvent.click(button)
            expect(queryByText("Email: test@test.com")).toBeInTheDocument();
        })

        it('errorsがある場合、SignInボタンをクリックできないようにする', () => {
            const { getByRole, getByTestId } = render(<SignIn />);
            const emailInput = getByTestId("emailField")
            userEvent.type(emailInput, "test")
            const button = getByRole("button", { name: "ログイン" })
            expect(button).toBeDisabled();
        })*/
    })

    describe('UserID Field', () => {
        it('UserIDラベルが存在する', () => {
            const { getByText } = render(<SignIn />);
            expect(getByText("ユーザーID (英数字含め6文字以上)"));
        })

        it('UserIDテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignIn />);
            expect(getByTestId("userId"));
        })

        /*it('Emailテキストフィールドに初期値ではhelperTextが表示されない', () => {
            const { queryByText } = render(<SignIn />);
            expect(queryByText("Emailを入力してください")).toBeNull();
        })*/

        it('空白でログイン押した場合、"必須項目です"が表示される', async () => {
            const { getByTestId, getByText, queryByText, debug, findByText } = render(<SignIn />);
            const loginButton = getByText("ログイン")
            fireEvent.press(loginButton)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("ユーザーIDを入力してください")).not.toBeNull();
        })

        it('UserIDテキストフィールドが6文字未満の場合のみ”6文字以上にしてください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignIn />);
            const userIdInput = getByTestId("userId")
            fireEvent.changeText(userIdInput, "test")
            const loginButton = getByText("ログイン")
            fireEvent.press(loginButton)
            expect(await findByText("6文字以上にしてください")).not.toBeNull();
            fireEvent.changeText(userIdInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('6文字以上にしてください'))  // 非同期になくなるのを確認する場合
        })

        it('半角英数字以外を使用した場合のみ”半角英数字を使用してください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignIn />);
            const userIdInput = getByTestId("userId")
            fireEvent.changeText(userIdInput, "test#####")
            const loginButton = getByText("ログイン")
            fireEvent.press(loginButton)
            expect(await findByText("半角英数字を使用してください")).not.toBeNull();
            fireEvent.changeText(userIdInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('半角英数字を使用してください'))  // 非同期になくなるのを確認する場合
        })

    })


    describe('Password Field', () => {

        it('Passwordラベルが存在する', () => {
            const { getByText } = render(<SignIn />);
            expect(getByText("パスワード"));
        })

        it('Passwordテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignIn />);
            expect(getByTestId("password"));
        })

        /*it('Passwordテキストフィールドに初期値ではhelperTextが表示されない', () => {
            const { queryByText } = render(<SignIn />);
            expect(queryByText("Passwordを入力してください")).toBeNull();
        })

        it('Passwordテキストフィールドが8文字未満の場合のみ”パスワードが短すぎます”と表示される', () => {
            const { getByTestId, queryByText } = render(<SignIn />);
            const passwordInput = getByTestId("passwordField")
            userEvent.type(passwordInput, "test")
            expect(queryByText("パスワードが短すぎます")).toBeInTheDocument();
            userEvent.type(passwordInput, "testuser")
            expect(queryByText("パスワードが短すぎます")).toBeNull();
        })*/
    })
});