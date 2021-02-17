import React from 'react';
import { useConfirm } from '../views/sign/Confirm'
import { render, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react-native';
import { newUser } from '../types';

//import userEvent from '@testing-library/user-event';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper'); //useNativeDriverWarningを非表示
jest.mock('../api/index');
const mockUser = newUser()
/*jest.mock('../api/index', () => {
    return jest.fn().mockImplementation(() => {
        return { fetchUser: () => mockUser }
    });
});*/


const Confirm = () => {
    const { renderConfirm } = useConfirm({
        onConfirmFeilure: (errMsg) => {
        },
        onConfirmSuccess: (user) => {
        },
        onResendFeilure: (errMsg) => {
        },
        onResendSuccess: () => {
        },
    })
    return renderConfirm()
}


describe('Confirm Page', () => {
    beforeAll(() => {


    });


    it('Confirmコンポーネントのレンダリング', () => {
        render(<Confirm />);
    })


    describe('Confirm Button', () => {
        it('登録ボタンが存在する', () => {
            const { getByText } = render(<Confirm />);
            expect(getByText("登録"));
        })

        it('6文字でない場合、"6文字にしてください"が表示される', async () => {
            const { getByTestId, getByText, queryByText, debug, findByText } = render(<Confirm />);
            const button = getByText("登録")
            fireEvent.press(button)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("6文字にしてください")).not.toBeNull();
        })

        it('数字以外を入力した場合、"数字のみにしてください"が表示される', async () => {
            const { getByTestId, getByText, queryByText, debug, findByText } = render(<Confirm />);
            const input0 = getByTestId("input0")
            const input1 = getByTestId("input1")
            const input2 = getByTestId("input2")
            const input3 = getByTestId("input3")
            const input4 = getByTestId("input4")
            const input5 = getByTestId("input5")
            fireEvent.changeText(input0, "0")
            fireEvent.changeText(input1, "0")
            fireEvent.changeText(input2, "0")
            fireEvent.changeText(input3, "k")
            fireEvent.changeText(input4, "0")
            fireEvent.changeText(input5, "0")
            const button = getByText("登録")
            fireEvent.press(button)
            // hook-formのvalidationは全て非同期のためfindByText
            expect(await findByText("数字のみにしてください")).not.toBeNull();
        })


    })

});