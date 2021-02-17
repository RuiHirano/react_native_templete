import React, { useCallback } from 'react';
import { Dimensions, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle, } from 'react-native';
import { Divider } from 'react-native-elements';
//import RNMonthly from "react-native-monthly";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";

const { width, height } = Dimensions.get("screen");
const NORMAL_DAYS_PERCENTAGE = "14.2857142857%";
export const _monthlyCalendarContainer = (
    index: number,
    numberOfDays: number,
    flexBasisPercentage: string,
): ViewStyle => ({
    marginTop: 8,
    flexBasis:
        index > numberOfDays - (numberOfDays === 28 ? 0 : 1)
            ? flexBasisPercentage
            : NORMAL_DAYS_PERCENTAGE,
});

export const _container = (
    backgroundColor: string,
    isToday: boolean,
): ViewStyle => ({
    backgroundColor,
    borderRadius: 12,
    width: width * 0.1,
    height: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: isToday ? 2 : 0,
    borderColor: isToday ? "#f27493" : "transparent",
});

export type CustomTextStyleProp =
    | StyleProp<TextStyle>
    | Array<StyleProp<TextStyle>>;

export type CustomStyleProp =
    | StyleProp<ViewStyle>
    | Array<StyleProp<ViewStyle>>;
interface IRNMonthlyProps extends IMonthlyItemProps {
    style?: CustomStyleProp;
    today?: number;
    numberOfDays?: number;
    activeDays?: Array<number>;
}

const includes = (value: number, array: Array<number>) =>
    array.indexOf(value) > -1;
const RNMonthly: React.FC<IRNMonthlyProps> = ({
    style,
    today,
    numberOfDays = 31,
    activeDays,
    ...rest
}) => {
    if (numberOfDays < 28 || numberOfDays > 31)
        throw new Error("numberOfDays cannot be less than 28 and more than 31");

    const calculateFlexBasisPercentage = () => {
        switch (numberOfDays) {
            case 31:
                return "71%";
            case 30:
                return "85.5%";
            case 29:
                return "100%";
            default:
                return "100%";
        }
    };

    const renderMonthlyItem = (index: number, flexBasisPercentage: string) => (
        <View
            key={index}
            style={_monthlyCalendarContainer(
                index,
                numberOfDays,
                flexBasisPercentage,
            )}
        >
            <MonthlyItem
                {...rest}
                index={index}
                isToday={index === today}
                isActive={activeDays && includes(index, activeDays)}
            />
        </View>
    );

    const renderMonthlyCalendar = (): React.ReactElement => {
        const days: any = Array<JSX.Element>();
        const flexBasisPercentage = calculateFlexBasisPercentage();
        for (let index = 1; index <= numberOfDays; index++) {
            days.push(renderMonthlyItem(index, flexBasisPercentage));
        }
        return days;
    };

    return (
        <View style={[styles.container, style]}>{renderMonthlyCalendar()}</View>
    );
};

interface IMonthlyItemProps {
    index?: number;
    isToday?: boolean;
    isActive?: boolean;
    activeBackgroundColor?: string;
    inactiveBackgroundColor?: string;
    todayTextStyle?: CustomTextStyleProp;
    itemContainerStyle?: CustomStyleProp;
    onPress?: (index: number) => void;
}

const MonthlyItem: React.FC<IMonthlyItemProps> = ({
    onPress,
    index,
    todayTextStyle,
    itemContainerStyle,
    isActive = false,
    isToday = false,
    activeBackgroundColor = "#49c1c2",
    inactiveBackgroundColor = "#f0f0f0",
}) => {
    return (
        <RNBounceable
            style={[
                _container(
                    isActive ? activeBackgroundColor : inactiveBackgroundColor,
                    isToday,
                ),
                itemContainerStyle,
            ]}
            onPress={() => { onPress && index && isActive ? onPress(index) : console.log("onpress") }}
        >
            {isToday && (
                <Text style={[styles.todayTextStyle, todayTextStyle]} >{index}</Text>
            )}
        </RNBounceable>
    );
};

interface Props {
    onSelectItem: (index: number) => void
    activeDays: number[]
}

export const useCalendar = (props: Props) => {
    const { onSelectItem, activeDays } = props

    const renderCalendar = useCallback(() => {

        return (
            <ScrollView>
                <View style={styles.calendar_container}>
                    <View style={styles.calendar_header_container}>
                        <Text style={styles.calendar_title}>This Month</Text>
                        <Text style={styles.calendar_title}>6/12回</Text>
                    </View>
                    <View style={styles.calendar_plot_container}>
                        <RNMonthly
                            numberOfDays={30}
                            activeBackgroundColor="#66cdaa"
                            inactiveBackgroundColor="#f5f5f5"
                            activeDays={activeDays}
                            today={parseInt(moment().format("D"))}
                            todayTextStyle={{ color: "#66cdaa", fontWeight: 'bold' }}
                            itemContainerStyle={{ borderColor: "#66cdaa" }}
                            onPress={(index: number) => onSelectItem(index)}
                        />
                    </View>
                </View>
                <Divider />
            </ScrollView>
        )
    }, [])

    return { "renderCalendar": renderCalendar }
}


const styles = StyleSheet.create({
    calendar_container: {
        alignItems: 'center'
    },
    calendar_plot_container: {
        margin: 20,
    },
    calendar_title: {
        marginTop: 20,
        color: 'gray',
        fontWeight: 'bold',
        flex: 1
    },
    calendar_header_container: {
        flexDirection: 'row',
        width: width * 0.8,
    },
    todayTextStyle: {
        color: "red",
        fontSize: 14,
        fontWeight: "500",
    },
    container: {
        paddingLeft: 12,
        flexWrap: "wrap",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

