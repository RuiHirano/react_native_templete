import { API, graphqlOperation } from "aws-amplify"
//import * as queries from '../graphql/queries' // read
//import * as mutations from '../graphql/mutations' // create, update, delete
import moment, { Moment } from "moment";
import { CreateAccountTransactionMutationVariables, CreateForexTransactionMutationVariables, CreateUserMutationVariables, DeleteAccountTransactionMutationVariables, DeleteForexTransactionMutationVariables, GetUserQueryVariables, UpdateAccountTransactionMutationVariables, UpdateForexTransactionMutationVariables, UpdateUserMutationVariables } from "./API";
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import Amplify from '@aws-amplify/core';
import { v4 as uuid } from 'uuid';
import { newUser, User } from "../types";
//const config = require('../../aws-exports').default
//Amplify.configure(config);
//console.log(config)

interface AwsAPIInterface {
    fetchUser(userId: string): Promise<User>
}

export default class AwsAPI implements AwsAPIInterface {
    constructor() {

    }

    fetchUser = async (userId: string) => {
        // fetch user from aws
        /*const variables: GetUserQueryVariables = {
            id: userId
        };
        const res: any = await API.graphql(
            graphqlOperation(queries.getUser, variables)
        )
        const userJson = res.data.getUser

        const user: User = {
            id: userJson.id,
            name: userJson.name,
            description: userJson.description,
            email: userJson.email,
            avatar: userJson.avatar,
            birthday: moment(userJson.birthday),
            sex: userJson.sex,
            settings: userJson.settings,
            transactions: [...forexTransactions, ...accountTransactions],
            createdAt: moment(userJson.createdAt),
            updatedAt: moment(userJson.updatedAt),
        }*/
        const user = newUser()
        return user
    }

    /*fetchTransactions = async (userId: string) => {

        // fetch transactions from aws
        const resAT: any = await API.graphql(
            graphqlOperation(queries.listAccountTransactions)
        )
        const resFT: any = await API.graphql(
            graphqlOperation(queries.listForexTransactions)
        )
        const transactions: (ForexTransaction | AccountTransaction)[] = []
        const fts = resFT.data.listForexTransactions.items
        fts.forEach((ft: any) => {
            transactions.push({
                id: ft.id,
                orderTime: moment(ft.orderTime),
                closeTime: moment(ft.closeTime),
                side: ft.side,
                isRecord: ft.isRecord,
                instrument: ft.instrument,
                lot: ft.lot,
                price: ft.price,
                takeProfit: ft.takeProfit,
                stopLoss: ft.stopLoss,
                close: ft.close,
                pl: ft.pl,
                preComment: ft.preComment,
                postComment: ft.postComment,
                tags: ft.tags,
                images: ft.images,
                updatedAt: moment(ft.updatedAt),
                createdAt: moment(ft.createdAt),
            });
        })

        const ats = resAT.data.listAccountTransactions.items
        ats.forEach((at: any) => {
            transactions.push({
                id: at.id,
                time: moment(at.orderTime),
                type: at.type,
                amount: at.amount,
                comment: at.comment,
                tags: at.tags,
                images: at.images,
                updatedAt: moment(at.updatedAt),
                createdAt: moment(at.createdAt),
            });
        })
        return transactions
    }

    fetchUser = async (userId: string) => {
        // fetch user from aws
        const variables: GetUserQueryVariables = {
            id: userId
        };
        const res: any = await API.graphql(
            graphqlOperation(queries.getUser, variables)
        )
        const userJson = res.data.getUser

        const forexTransactions: ForexTransaction[] = userJson.forexTransactions.items.map((ft: any) => {
            return {
                id: ft.id,
                orderTime: moment(ft.orderTime),
                closeTime: moment(ft.closeTime),
                side: ft.side,
                isRecord: ft.isRecord,
                instrument: ft.instrument,
                lot: ft.lot,
                price: ft.price,
                takeProfit: ft.takeProfit,
                stopLoss: ft.stopLoss,
                close: ft.close,
                pl: ft.pl,
                preComment: ft.preComment,
                postComment: ft.postComment,
                tags: ft.tags,
                images: ft.images,
                updatedAt: moment(ft.updatedAt),
                createdAt: moment(ft.createdAt),
            }
        })
        const accountTransactions: AccountTransaction[] = userJson.accountTransactions.items.map((at: any) => {
            return {
                id: at.id,
                time: moment(at.orderTime),
                type: at.type,
                amount: at.amount,
                comment: at.comment,
                tags: at.tags,
                images: at.images,
                updatedAt: moment(at.updatedAt),
                createdAt: moment(at.createdAt),
            }
        })
        const user: User = {
            id: userJson.id,
            name: userJson.name,
            description: userJson.description,
            email: userJson.email,
            avatar: userJson.avatar,
            birthday: moment(userJson.birthday),
            sex: userJson.sex,
            settings: userJson.settings,
            transactions: [...forexTransactions, ...accountTransactions],
            createdAt: moment(userJson.createdAt),
            updatedAt: moment(userJson.updatedAt),
        }
        return user
    }

    createUser = async (user: User) => {
        // Create CommunityLocation
        const variables: CreateUserMutationVariables = {
            input: {
                id: user.id,
                name: user.name,
                description: user.description,
                email: user.email,
                avatar: user.avatar,
                birthday: user.birthday?.toISOString(),
                sex: user.sex,
                settings: {
                    initAccountBalance: user.settings.initAccountBalance,
                    language: user.settings.language,
                    notification: { email: user.settings.notification.email, push: user.settings.notification.push },
                    instruments: user.settings.instruments,
                    plan: user.settings.plan,
                    device: user.settings.device,
                },
            },
        };
        const res: any = await API.graphql(
            graphqlOperation(mutations.createUser, variables)
        )
        ////console.log("userLocation res: ", res)
    }

    createTransaction = async (userId: string, trans: (ForexTransaction | AccountTransaction)) => {

        if (implementsForexTransaction(trans)) {
            // create ForexTransaction
            const ftVariables: CreateForexTransactionMutationVariables = {

                input: {
                    id: trans.id,
                    userId: userId,
                    orderTime: trans.orderTime.toISOString(),
                    closeTime: trans.closeTime.toISOString(),
                    side: trans.side,
                    isRecord: trans.isRecord,
                    instrument: trans.instrument,
                    lot: trans.lot,
                    price: trans.price,
                    takeProfit: trans.takeProfit,
                    stopLoss: trans.stopLoss,
                    close: trans.close,
                    pl: trans.pl,
                    preComment: trans.preComment,
                    postComment: trans.postComment,
                    tags: trans.tags,
                    images: trans.images,
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.createForexTransaction, ftVariables)
            )
            //console.log("transaction res: ", res)
        } else if (implementsAccountTransaction(trans)) {
            // create AccountTransaction
            const atVariables: CreateAccountTransactionMutationVariables = {
                input: {
                    id: trans.id,
                    userId: userId,
                    time: trans.time.toISOString(),
                    type: trans.type,
                    amount: trans.amount,
                    comment: trans.comment,
                    tags: trans.tags,
                    images: trans.images,
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.createAccountTransaction, atVariables)
            )
            ////console.log("userLocation res: ", res)
        }
    }

    // Update
    updateUser = async (user: User) => {
        // Update CommunityLocation
        const variables: UpdateUserMutationVariables = {
            input: {
                id: user.id,
                name: user.name,
                description: user.description,
                email: user.email,
                avatar: user.avatar,
                birthday: user.birthday?.toISOString(),
                sex: user.sex,
                settings: {
                    initAccountBalance: user.settings.initAccountBalance,
                    language: user.settings.language,
                    notification: { email: user.settings.notification.email, push: user.settings.notification.push },
                    instruments: user.settings.instruments,
                    plan: user.settings.plan,
                    device: user.settings.device,
                },
            },
        };
        const res: any = await API.graphql(
            graphqlOperation(mutations.updateUser, variables)
        )
        ////console.log("userLocation res: ", res)
    }

    updateTransaction = async (trans: (ForexTransaction | AccountTransaction)) => {

        if (implementsForexTransaction(trans)) {
            // Update ForexTransaction
            const ftVariables: UpdateForexTransactionMutationVariables = {

                input: {
                    id: trans.id,
                    orderTime: trans.orderTime.toISOString(),
                    closeTime: trans.closeTime.toISOString(),
                    side: trans.side,
                    isRecord: trans.isRecord,
                    instrument: trans.instrument,
                    lot: trans.lot,
                    price: trans.price,
                    takeProfit: trans.takeProfit,
                    stopLoss: trans.stopLoss,
                    close: trans.close,
                    pl: trans.pl,
                    preComment: trans.preComment,
                    postComment: trans.postComment,
                    tags: trans.tags,
                    images: trans.images,
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.updateForexTransaction, ftVariables)
            )
            ////console.log("userLocation res: ", res)
        } else if (implementsAccountTransaction(trans)) {
            // Update AccountTransaction
            const atVariables: UpdateAccountTransactionMutationVariables = {
                input: {
                    id: trans.id,
                    time: trans.time.toISOString(),
                    type: trans.type,
                    amount: trans.amount,
                    comment: trans.comment,
                    tags: trans.tags,
                    images: trans.images,
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.updateAccountTransaction, atVariables)
            )
            ////console.log("userLocation res: ", res)
        }
    }

    deleteTransaction = async (trans: (ForexTransaction | AccountTransaction)) => {

        if (implementsForexTransaction(trans)) {
            // Update ForexTransaction
            const ftVariables: DeleteForexTransactionMutationVariables = {

                input: {
                    id: trans.id
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.deleteForexTransaction, ftVariables)
            )
            ////console.log("userLocation res: ", res)
        } else if (implementsAccountTransaction(trans)) {
            // Delete AccountTransaction
            const atVariables: DeleteAccountTransactionMutationVariables = {
                input: {
                    id: trans.id,
                },
            };
            const res: any = await API.graphql(
                graphqlOperation(mutations.deleteAccountTransaction, atVariables)
            )
            ////console.log("userLocation res: ", res)
        }
    }

    signIn = async (userId: string, password: string) => {
        try {
            await Auth.signIn(userId, password)
        } catch (error) {
            throw error
        }
    }



    signUp = async (userId: string, password: string, email: string) => {
        try {
            await Auth.signUp(userId, password, email)
        } catch (error) {
            //console.log("err: ", error)
            switch (error.code) {
                case 'UsernameExistsException':
                // ユーザープール内に既に同じ username が存在する場合に起こる。
                case 'InvalidPasswordException':
                // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
                case 'InvalidParameterException':
                // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
                // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
                default:
                // その他のエラー
                //console.log(error)
            }
            throw error
        }
    }

    confirmSignUp = async (userId: string, code: string, password: string) => {
        try {
            await Auth.confirmSignUp(userId, code)

        } catch (error) {
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
                //console.log(error)

            }
            throw error
        }
    }

    resendCode = async (userId: string) => {
        await Auth.resendSignUp(
            userId  // singUp時に入力したuserId
        )
    }

    signOut = async () => {
        await Auth.signOut()
    }

    currentAuthenticatedUser = async () => {
        return await Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
    }

    createImageToStorage = async (userId: string, localUri: string) => {
        const blob = await fetch(localUri).then(res => res.blob())
        let filePath = `${userId}/${moment().toISOString()}${uuid()}.png`;
        const res: any = await Storage.put(filePath, blob, {
            contentType: 'image/png' // file形式
        })
        console.log("res", res.key)
        return res.key
    }

    getImageUriFromStorage = async (key: string) => {
        const url = await Storage.get(key, { level: "public" })
        console.log("url: ", url)
        if (typeof url === "string") {
            return url
        }
        return undefined
    }

    deleteImageFromStorage = async (key: string) => {
        const result = await Storage.remove(key, { level: "public" })
        return result
    }*/
}