import React, { createContext, useContext, useState } from 'react';
import * as StoreReview from 'expo-store-review';
import { AppActionType, AppStore } from '../store/app';
import moment, { Moment } from "moment";
import { Transaction } from '../types';


export type StoreReviewState = { lastReviewDate: Moment, minDateNum: number, minItemNum: number, isReviewed: boolean }
export const useStoreReview = (transactions: Transaction[]) => {

    const { state, dispatch } = useContext(AppStore);

    const showStoreReview = async () => {
        const isOK = await StoreReview.isAvailableAsync();
        const url = StoreReview.storeUrl();
        console.log("store review", isOK, url)
        if (StoreReview.hasAction()) {
            console.log("action!")
            StoreReview.requestReview();
        }
        // もしレビューしたらもう表示しない
        const isReviewed = false
        if (isReviewed) {
            dispatch({ type: AppActionType.UPDATE_APP, app: { ...state.app, reviewStatus: { ...state.app.reviewStatus, isReviewed: true } } })
        }
    }

    const checkStoreReview = () => {
        const reviewStatus = state.app.reviewStatus
        let uploadItemNum = 0

        transactions.forEach((trans) => {
            if (moment(trans.createdAt).isAfter(moment(reviewStatus.lastReviewDate))) {
                // lastReviewDateより過ぎていれば+1
                uploadItemNum += 1
            }
        })
        // 経過日数がminDateNumより大きいかつ、新規投稿したアイテムもminItemNumより大きい、かつ今までレビューをしたことがなければ
        const isOverMinDate = moment().diff(reviewStatus.lastReviewDate) > reviewStatus.minDateNum
        const isOverMinItem = uploadItemNum > reviewStatus.minItemNum
        if (isOverMinDate && isOverMinItem && !reviewStatus.isReviewed) {
            showStoreReview()
            dispatch({ type: AppActionType.UPDATE_APP, app: { ...state.app, reviewStatus: { ...state.app.reviewStatus, lastReviewDate: moment() } } })
        }

    }

    return { "checkStoreReview": checkStoreReview, }
}

