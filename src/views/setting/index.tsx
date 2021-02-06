import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Alert, DeviceEventEmitter, NativeEventEmitter, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Button, Card, Input, Divider, CheckBox } from 'react-native-elements'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const styles = StyleSheet.create({
    sectionText: {
        fontSize: 14,
        color: "#555555",
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 10
    },
    item_side: {
        backgroundColor: 'cornflowerblue',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: 50,
        height: 20,
    },
    text_side: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text_date: {
        textAlign: 'left',
    },
    text_pl: {
        textAlign: 'right',
        fontSize: 20,
    },
    text_instrument: {
        textAlign: 'left',
        paddingRight: 20,
    },
    text_lot: {
        textAlign: 'left',
    },
    item_comment: {
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: "blue"
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    content: {
        width: 500,
        height: 500,
    },
    container: {
        flex: 1,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
    },
    backgroundImage: {
        height: 200,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})

const SettingPage: React.FC = () => {

    return (
        <View>
            <Text style={styles.sectionText}>{"一般"}</Text>
            <Divider />
            <ListItem bottomDivider onPress={() => console.log("press")}>
                <MCIcon name='account-circle' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"通知設定"}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
            </ListItem>
            <ListItem bottomDivider onPress={() => console.log("press")}>
                <MCIcon name='account-circle' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"アカウント設定"}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
            </ListItem>

        </View>
    )
}

export default SettingPage