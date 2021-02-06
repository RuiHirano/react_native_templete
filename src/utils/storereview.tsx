import React, { createContext, useContext, useState } from 'react';
import * as StoreReview from 'expo-store-review';
import moment, { Moment } from "moment";


export type StoreReviewState = { lastReviewDate: Moment, minDateNum: number, minItemNum: number, isReviewed: boolean }
export const useStoreReview = () => {

    //const { state, dispatch } = useContext(AppStore);

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
            //dispatch({ type: AppActionType.UPDATE_APP, app: { ...state.app, reviewStatus: { ...state.app.reviewStatus, isReviewed: true } } })
        }
    }

    const checkStoreReview = () => {


    }

    return { "checkStoreReview": checkStoreReview, }
}

