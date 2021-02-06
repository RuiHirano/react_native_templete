import React, { createContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import moment, { Moment } from "moment";
import Swiper from 'react-native-swiper'

export type PeriodType = "year" | "months" | "days" | "all"

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: 'white',
    },
    child: {
        height: height * 0.5,
        width,
        justifyContent: 'center',
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center',
    },
})

type DateSwiperStatus = { visible: boolean, message: string, title: string, callback: () => void }

// use this now
type ContextValue = {
    date: Moment
    period: PeriodType
    updatePeriod: (period: PeriodType) => void
}
export const DateSwiperContext = createContext({} as ContextValue)

interface Props {
    defaultPeriod: PeriodType,
    firstDate: Moment,
    lastDate: Moment,
    children: React.ReactElement
}
export const DateSwiper: React.FC<Props> = ({ children, defaultPeriod, firstDate, lastDate }) => {
    const createDates = (period: PeriodType) => {
        if (period === "all") {
            return [moment()]
        }

        let date = firstDate.clone()
        const num = lastDate.diff(firstDate, period)

        const dates = []
        const nextLastDate = lastDate.clone().add(1, period)  // 1つ進める
        while (date.isBefore(nextLastDate, period)) {
            dates.push(date)
            const nextDate = date.clone().add(1, period)
            date = nextDate
        }
        console.log("dates", dates, firstDate, lastDate, nextLastDate, num)
        return dates
    }

    const [status, setStatus] = useState<{ period: PeriodType, dates: Moment[] }>({ period: defaultPeriod, dates: createDates(defaultPeriod) })

    const swiper = useRef(null)
    const updatePeriod = (newPeriod: PeriodType) => {
        setStatus({ period: newPeriod, dates: createDates(newPeriod) })
    }

    return (
        <Swiper
            showsButtons={false}
            loop={false}
            index={status.dates.length - 1}
            key={status.period}
            //onMomentumScrollEnd={(state) => test(state)}
            showsPagination={false}
            loadMinimalSize={1}
            loadMinimal
            ref={swiper}
            bounces={true}
        >
            {status.dates.map((date: Moment, index: number) => {
                return (
                    <DateSwiperContext.Provider key={date.toString()} value={{ date, period: status.period, updatePeriod }}>
                        <View key={date.toISOString() + status.period}>
                            {children}
                        </View>
                    </DateSwiperContext.Provider>
                )
            })}
        </Swiper>
    )

    // react native swiperはdot positionの動作がおかしくなり、期間を変更すると見れないページができる
    // react native flatlist swiperは全てロードするため、遅い
    // 最後のページに行けるためreact native swiperを採用
    // Viewで囲んでkey指定でうまくいった
}