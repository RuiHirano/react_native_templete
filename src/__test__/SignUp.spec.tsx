import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react-native';
import { newUser } from '../types';
import { useSignUp } from '../views/sign/SignUp';
import { renderHook } from '@testing-library/react-hooks'
//import userEvent from '@testing-library/user-event';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper'); //useNativeDriverWarningを非表示
jest.mock('../api/index');
const mockUser = newUser()
/*jest.mock('../api/index', () => {
    return jest.fn().mockImplementation(() => {
        return { fetchUser: () => mockUser }
    });
});*/

const SignUp: React.FC = () => {
    const { renderSignUp } = useSignUp({
        onSignUpFeilure: (errMsg) => {
        },
        onSignUpSuccess: (user) => {
        },
        onMoveToSignIn: () => { }
    })
    return renderSignUp()
}


describe('SignUp Page', () => {
    beforeAll(() => {
    });


    it('SignUpコンポーネントのレンダリング', () => {
        render(<SignUp />);
    })


    describe('SignUp Button', () => {
        it('SignUpボタンが存在する', () => {
            const { getByText } = render(<SignUp />);
            expect(getByText("登録する"));
        })

        /*it('パスワードとユーザーIDが正しければ、登録するに成功する', async () => {
            const { queryByText, getByText, getByTestId, findByText, debug } = render(
                <APIProvider>
                    <SnackbarProvider>
                        <SignUp/>
                    </SnackbarProvider>
                </APIProvider>
            );

            AwsAPI.mockImplementation(() => {
                return {
                    fetchUser: async () => {
                        return mockUser
                    }
                }
            });

            const loginButton = getByText("登録する")
            const userIdInput = getByTestId("userId")
            fireEvent.changeText(userIdInput, "testuser")  // 正しいemail入力
            const passwordInput = getByTestId("password")
            fireEvent.changeText(passwordInput, "testuserpw")   // 正しいpassword入力
            expect(queryByText("登録するしました")).toBeNull();
            fireEvent.press(loginButton)
            expect(await findByText("登録するしました")).not.toBeNull();
        })*/

        /*it('初期時、SignUpボタンをクリックできないようにする', () => {
            const { getByRole } = render(<SignUp/>);
            const button = getByRole("button", { name: "登録する" })
            expect(button).toBeDisabled();
        })

        it('SignUpボタンをクリックした場合のみdialogが表示される', () => {
            const { getByRole, queryByText, getByText, getByTestId } = render(<SignUp/>);
            const button = getByRole("button", { name: "登録する" })
            const emailInput = getByTestId("emailField")
            fireEvent.type(emailInput, "test@test.com")  // 正しいemail入力
            const passwordInput = getByTestId("passwordField")
            userEvent.type(passwordInput, "testuser")   // 正しいpassword入力
            expect(queryByText("登録するしました")).toBeNull();
            userEvent.click(button)
            expect(getByText("登録するしました")).toBeInTheDocument();
        })

        it('dialogにEmailが表示される', () => {
            const { getByRole, queryByText, getByText, getByTestId } = render(<SignUp/>);
            const button = getByRole("button", { name: "登録する" })
            const emailInput = getByTestId("emailField")
            userEvent.type(emailInput, "test@test.com")  // 正しいemail入力
            const passwordInput = getByTestId("passwordField")
            userEvent.type(passwordInput, "testuser")   // 正しいpassword入力
            userEvent.click(button)
            expect(queryByText("Email: test@test.com")).toBeInTheDocument();
        })

        it('errorsがある場合、SignUpボタンをクリックできないようにする', () => {
            const { getByRole, getByTestId } = render(<SignUp/>);
            const emailInput = getByTestId("emailField")
            userEvent.type(emailInput, "test")
            const button = getByRole("button", { name: "登録する" })
            expect(button).toBeDisabled();
        })*/
    })

    describe('UserID Field', () => {

        it('UserIDテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignUp />);
            expect(getByTestId("userId"));
        })

        /*it('Emailテキストフィールドに初期値ではhelperTextが表示されない', () => {
            const { queryByText } = render(<SignUp/>);
            expect(queryByText("Emailを入力してください")).toBeNull();
        })*/

        it('空白で登録するを押した場合、"ユーザーIDを入力してください"が表示される', async () => {
            const { getByTestId, getByText, queryByText, debug, findByText } = render(<SignUp />);
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("ユーザーIDを入力してください")).not.toBeNull();
        })

        it('UserIDテキストフィールドが6文字未満の場合のみ”6文字以上にしてください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const userIdInput = getByTestId("userId")
            fireEvent.changeText(userIdInput, "test")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("6文字以上にしてください")).not.toBeNull();
            fireEvent.changeText(userIdInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('6文字以上にしてください'))  // 非同期になくなるのを確認する場合
        })

        it('半角英数字以外を使用した場合のみ”半角英数字を使用してください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const userIdInput = getByTestId("userId")
            fireEvent.changeText(userIdInput, "test#####")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("半角英数字を使用してください")).not.toBeNull();
            fireEvent.changeText(userIdInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('半角英数字を使用してください'))  // 非同期になくなるのを確認する場合
        })

    })

    describe('Email Field', () => {

        it('Emailテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignUp />);
            expect(getByTestId("email"));
        })

        /*it('Emailテキストフィールドに初期値ではhelperTextが表示されない', () => {
            const { queryByText } = render(<SignUp/>);
            expect(queryByText("Emailを入力してください")).toBeNull();
        })*/

        it('空白で登録するを押した場合、"メールアドレスを入力してください"が表示される', async () => {
            const { getByTestId, getByText, queryByText, debug, findByText } = render(<SignUp />);
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("メールアドレスを入力してください")).not.toBeNull();
        })

        it('メールアドレスが正しくない場合のみ”メールアドレスが正しくありません”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const emailInput = getByTestId("email")
            fireEvent.changeText(emailInput, "test")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("メールアドレスが正しくありません")).not.toBeNull();
            fireEvent.changeText(emailInput, "test@test.com")
            await waitForElementToBeRemoved(() => queryByText('メールアドレスが正しくありません'))  // 非同期になくなるのを確認する場合
        })

    })


    describe('Password Field', () => {

        it('Passwordテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignUp />);
            expect(getByTestId("password"));
        })

        it('空白で登録するを押した場合、"パスワードを入力してください"が表示される', async () => {
            const { getByText, findByText } = render(<SignUp />);
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("パスワードを入力してください")).not.toBeNull();
        })

        it('パスワードテキストが8文字未満の場合のみ”8文字以上にしてください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const passwordInput = getByTestId("password")
            fireEvent.changeText(passwordInput, "test")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("8文字以上にしてください")).not.toBeNull();
            fireEvent.changeText(passwordInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('8文字以上にしてください'))  // 非同期になくなるのを確認する場合
        })

        it('パスワードテキストが16文字より大きい場合のみ”16文字以下にしてください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const passwordInput = getByTestId("password")
            fireEvent.changeText(passwordInput, "testusertestusertest")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("16文字以下にしてください")).not.toBeNull();
            fireEvent.changeText(passwordInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('16文字以下にしてください'))  // 非同期になくなるのを確認する場合
        })

        /*it('Passwordテキストフィールドに初期値ではhelperTextが表示されない', () => {
            const { queryByText } = render(<SignUp/>);
            expect(queryByText("Passwordを入力してください")).toBeNull();
        })*/

        it('半角英数字以外を使用した場合のみ”半角英数字を使用してください”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const passwordInput = getByTestId("password")
            fireEvent.changeText(passwordInput, "test#####")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("半角英数字を使用してください")).not.toBeNull();
            fireEvent.changeText(passwordInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('半角英数字を使用してください'))  // 非同期になくなるのを確認する場合
        })
    })

    describe('Password Confirm Field', () => {
        it('Password Confirmテキストフィールドが存在する', () => {
            const { getByTestId } = render(<SignUp />);
            expect(getByTestId("passwordConfirm"));
        })

        it('空白で登録するを押した場合、"パスワードをもう一度入力してください"が表示される', async () => {
            const { getByText, findByText } = render(<SignUp />);
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("パスワードをもう一度入力してください")).not.toBeNull();
        })

        it('パスワードが正しくない場合のみ”パスワードが正しくありません”が表示される', async () => {
            const { getByTestId, queryByText, findByText, getByText } = render(<SignUp />);
            const passwordInput = getByTestId("password")
            fireEvent.changeText(passwordInput, "testuser")
            const passwordConfirmInput = getByTestId("passwordConfirm")
            fireEvent.changeText(passwordConfirmInput, "wronguser")
            const loginButton = getByText("登録する")
            fireEvent.press(loginButton)
            expect(await findByText("パスワードが正しくありません")).not.toBeNull();
            fireEvent.changeText(passwordConfirmInput, "testuser")
            await waitForElementToBeRemoved(() => queryByText('パスワードが正しくありません'))  // 非同期になくなるのを確認する場合
        })
    })
});