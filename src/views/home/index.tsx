import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Divider } from 'react-native-elements';
import RNMonthly from "react-native-monthly";
import { useCalendar } from './Calendar';
import { useConsult } from './Consult';
import { DentalImage } from "../../constants/Images";

const { width, height } = Dimensions.get("screen");

// 診察データ
export interface ConsultData {
    date: Moment
    images: Image[]
}

export interface Image {
    url: string,
    marks: Mark[]
}

export interface Mark {
    id: number
    x: number
    y: number
    description: string
}

const mockItems: ConsultData[] = [
    {
        date: moment(),
        images: [
            {
                url: DentalImage,
                marks: [
                    { id: 0, x: 0.1, y: 0.1, description: "test" },
                    { id: 1, x: 0.2, y: 0.2, description: "test2" },
                    { id: 2, x: 0.3, y: 0.3, description: "test3" },
                ]
            },
            {
                url: DentalImage,
                marks: [
                    { id: 0, x: 0.1, y: 0.1, description: "test" },
                    { id: 1, x: 0.2, y: 0.2, description: "test2" },
                    { id: 2, x: 0.3, y: 0.3, description: "test3" },
                ]
            },
        ]
    },
    {
        date: moment().add(1, "days"),
        images: [
            {
                url: DentalImage,
                marks: [
                    { id: 3, x: 0.1, y: 0.1, description: "test" },
                    { id: 4, x: 0.2, y: 0.2, description: "test2" },
                    { id: 5, x: 0.3, y: 0.3, description: "test3" },
                ]
            }
        ]
    }
]

interface Props {
}
const Home: React.FC<Props> = (props) => {
    const [tgtItem, setTgtItem] = useState<undefined | ConsultData>(undefined)
    const items = mockItems

    const { renderCalendar } = useCalendar({
        onSelectItem: (index: number) => {
            console.log("selected", index)
            setTgtItem(items[0])
        },
        activeDays: items.map((item) => item.date.get("D"))
    })

    const { renderConsult } = useConsult({})

    return (
        <ScrollView>
            {renderCalendar()}
            {renderConsult(tgtItem)}
        </ScrollView>
    )
}

export default Home