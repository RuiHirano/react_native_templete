import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl, Alert } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { Community, Message } from '../../types';
import moment, { Moment, updateLocale } from "moment";
import { Location as LocationType } from "./../../types"
//import { GetCommunityQueryVariables } from '../../API';
//import { API, graphqlOperation } from 'aws-amplify';
//import * as queries from '../../graphql/queries' // read
//import * as subscriptions from '../../graphql/subscriptions' // 監視
//import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const styles = StyleSheet.create({
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
        width: "100%",
        height: "100%",
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

async function timeout(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
    return
}

const getLocation = async () => {
    const loc: LocationType = {
        "longitude": 127.000,
        "latitude": 35.000,
    }
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log("permission is not allowed")
    }
    let location = await Location.getCurrentPositionAsync({});
    loc.latitude = location.coords.latitude
    loc.longitude = location.coords.longitude
    return loc
}

const sortMessages = (messages: Message[]) => {
    function compare(mes1: Message, mes2: Message) {
        let comparison = 0;

        if (mes1.createdAt.isBefore(mes2.createdAt)) {
            comparison = 1;
        } else if (mes2.createdAt.isBefore(mes1.createdAt)) {
            comparison = -1;
        }

        return comparison;
    }
    messages.sort(compare)
    return messages
}

const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'

const mockMessages = [
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "rui", id: uuid() },
        images: [],
        content: "良い",
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "rui2", id: uuid() },
        images: [],
        content: "最高",
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "rui3", id: uuid() },
        images: [],
        content: "いいね",
        createdAt: moment(),
        updatedAt: moment(),
    }
]

interface Props {
    community: Community
}
const TimelinePage: React.FC<Props> = (props) => {
    const { community } = props
    console.log("com ID: ", community.id)
    const userId = "0000"
    const [messages, setMessages] = useState<Message[]>(mockMessages)
    const [refreshing, setRefreshing] = React.useState(false);


    useEffect(() => {
        console.log("useEffect fetchMessages")
        /*fetchMessages();

        console.log("useEffect subscript")
        const subscription = (API.graphql(
            graphqlOperation(subscriptions.onCreateMessage)
        ) as any).subscribe({
            next: ({ value: { data } }: any) => {
                const m = data.onCreateMessage;
                
                const message: Message = {
                    id: m.id,
                    user: { avatar: mockImageUrl, name: "rui", id: uuid() },
                    images: [],
                    content: m.content,
                    createdAt: moment(m.createdAt),
                    updatedAt: moment(m.updatedAt),
                }
                console.log("subscript: ", messages, message)
                setMessages((preMsgs) => [...preMsgs, message])
            },
        });
        return () => subscription.unsubscribe();*/
    }, []);

    const fetchMessages = async () => {
        console.log("fetchMessages")
        /*const variables: GetCommunityQueryVariables = {
            id: community.id,
        };
        const res: any = await API.graphql(
            graphqlOperation(queries.getCommunity, variables)
        )
        console.log("messages: ", res.data)
        const messages = res.data.getCommunity.messages.items
        console.log("messages: ", messages)*/
        const msgs: Message[] = []
        messages.forEach((m: any) => {
            msgs.push({
                id: m.id,
                user: { avatar: mockImageUrl, name: "rui", id: uuid() },
                images: [],
                content: m.content,
                createdAt: moment(m.createdAt),
                updatedAt: moment(m.updatedAt),
            })
        });
        sortMessages(msgs)
        setMessages(msgs)

    }

    const keyExtractor = (item: any, index: any) => index.toString()

    const renderItem = (data: any) => {
        const item: Message = data.item
        const index: number = data.index
        console.log("item: ", item)
        return (
            <ListItem key={index} bottomDivider onPress={() => Actions.push("thread", { message: item })}>
                <Avatar source={{ uri: item.user.avatar }} />
                <ListItem.Content>
                    <ListItem.Title>{item.user.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    const onPressFormButton = () => {
        console.log("press")
        Actions.push("form", { communityId: community.id })
    }

    const handleAttend = () => {
        console.log('attend')
        Alert.alert(
            "コミュニティの参加",
            "参加しますか？",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={{ height: "100%" }}>
            <Text>Timeline</Text>
            {community.status === "Available" ?
                <Button title="参加する" onPress={handleAttend} /> : <View />
            }
            <ScrollView
                style={{ height: "100%", width: "100%" }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />
                }
            >
                <FlatList
                    keyExtractor={keyExtractor}
                    data={messages}
                    renderItem={renderItem}
                />

            </ScrollView>
            {community.status === "Attending" ?
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={onPressFormButton}
                /> : <View />
            }
        </View>
    )
}

export default TimelinePage