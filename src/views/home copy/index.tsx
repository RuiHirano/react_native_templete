import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Divider } from 'react-native-elements';
import RNMonthly from "react-native-monthly";

const { width, height } = Dimensions.get("screen");
interface Props {
}
const Home: React.FC<Props> = (props) => {


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
                        activeDays={[1, 5, 6, 11, 21, 31]}
                        today={12}
                    />
                </View>
            </View>
            <Divider />
        </ScrollView>
    )
}

export default Home

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
    }
});
