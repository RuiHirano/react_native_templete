import React, { useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { ConsultData } from './index'
import { DentalImage } from "../../constants/Images";
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get("screen");

interface Props {
}

export const useConsult = (props: Props) => {
    const { } = props

    const renderConsult = useCallback((item?: ConsultData) => {

        return (
            <ScrollView>
                <View style={styles.consult_container}>
                    <View style={styles.consult_header_container}>
                        <Text style={styles.consult_title}>{"診断日"}</Text>
                        <Text style={styles.consult_title}>{item?.date.format("YYYY/MM/DD")}</Text>
                    </View>
                </View>
                {item !== undefined && item.images.length > 0 ?
                    <Swiper style={{ height: height * 0.3 }} showsPagination={false} showsButtons loop={false}>
                        {item?.images.map((img) => {
                            return (
                                <View style={{ width: width, alignItems: 'center' }}>
                                    <Image source={DentalImage} style={{}} containerStyle={{ borderRadius: 10, width: width * 0.8, height: height * 0.3 }} />
                                </View>
                            )
                        })}
                    </Swiper>
                    : <View />}
                <View>
                    {item?.images.map((img) => {
                        return img.marks.map((mark) => {
                            return (
                                <Text key={mark.id}>{mark.description}</Text>
                            )
                        })
                    })}
                </View>
                <Divider />
            </ScrollView>
        )
    }, [])

    return { "renderConsult": renderConsult }
}


const styles = StyleSheet.create({
    image_container: {
        alignItems: 'center'
    },
    consult_container: {
        alignItems: 'center'
    },
    consult_plot_container: {
        margin: 20,
    },
    consult_title: {
        marginTop: 20,
        color: 'gray',
        fontWeight: 'bold',
        flex: 1
    },
    consult_header_container: {
        flexDirection: 'row',
        width: width * 0.8,
    }
});

