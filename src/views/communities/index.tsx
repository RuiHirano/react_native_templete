import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Alert, DeviceEventEmitter, NativeEventEmitter, ScrollView } from 'react-native';
import { ListItem, Avatar, Button, Card, Input } from 'react-native-elements'
import { Community } from '../../types';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
//import Amplify from '@aws-amplify/core';
//import Auth from '@aws-amplify/auth';
import moment, { Moment, updateLocale } from "moment";
//const config = require('../../../aws-exports').config;
//Amplify.configure(config);

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

const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'


const mockCommunities: Community[] = [
    {
        id: "0",
        name: "大学",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 34.97010, longitude: 137.037551, radius: 60 },
        users: [
            {
                id: "111",
                name: "satoru",
                avatar: mockImageUrl,
            },
            {
                id: "222",
                name: "naoko",
                avatar: mockImageUrl,
            },
            {
                id: "333",
                name: "ryuya",
                avatar: mockImageUrl,
            },
        ],
        status: "Attending",
        createdAt: moment(),
        updatedAt: moment(),
        closedAt: undefined,
    },
    {
        id: "0",
        name: "スーパーアリーナ",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 34.97010, longitude: 137.037551, radius: 60 },
        users: [
            {
                id: "111",
                name: "satoru",
                avatar: mockImageUrl,
            },
            {
                id: "222",
                name: "naoko",
                avatar: mockImageUrl,
            },
            {
                id: "333",
                name: "ryuya",
                avatar: mockImageUrl,
            },
        ],
        status: "None",
        createdAt: moment(),
        updatedAt: moment(),
        closedAt: undefined,
    },
    {
        id: "1",
        name: "居酒屋大ちゃん",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 34.968563, longitude: 137.036311, radius: 80 },
        users: [
            {
                id: "111",
                name: "satoru",
                avatar: mockImageUrl,
            },
        ],
        status: "Available",
        createdAt: moment(),
        updatedAt: moment(),
        closedAt: undefined,
    }
]

const CommunitiesPage: React.FC = () => {

    //const communities = useSelector((state: ReduxState) => state.App.communities)
    const communities = mockCommunities

    //const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    //console.log("render communities: ", communities)


    useEffect(() => {
        handleRefresh();
    }, []);

    const handleRefresh = async () => {
        // リフレッシュされたら、communitiesを更新
        setRefreshing(true)
        /*const coms = await fetchCommunities()
        //console.log("coms: ", coms)
        //setCommunityGeofence(coms)
        dispatch(appActions.updateCommunities(coms))*/
        setRefreshing(false)
    }

    const keyExtractor = (item: any, index: any) => index.toString()

    const renderItem = (data: any) => {
        const item: Community = data.item
        const index: number = data.index
        //console.log("item: ", item)
        return (
            <ListItem key={index} bottomDivider onPress={() => {
                console.log("press")
                Actions.push("timeline", { communityId: item.id })
            }}>
                <Avatar source={{ uri: item.avatar }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{"参加者：" + item.users.length + "人"}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    const renderItem2 = (item: Community, index: number) => {
        //console.log("item: ", item)
        return (
            <ListItem key={index} bottomDivider onPress={() => {
                console.log("press")
                Actions.push("timeline", { community: item })
            }}>
                <Avatar source={{ uri: item.avatar }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{"参加者：" + item.users.length + "人"}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            <ScrollView
                style={{ height: "100%" }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <ListItem><Text>参加中のコミュニティ</Text></ListItem>
                {communities.map((com, index) => {
                    if (com.status === "Attending") {
                        return renderItem2(com, index)
                    }
                })}
                <ListItem><Text>参加可能なコミュニティ</Text></ListItem>
                {communities.map((com, index) => {
                    if (com.status === "Available") {
                        return renderItem2(com, index)
                    }
                })}

                <ListItem><Text>近くのコミュニティ</Text></ListItem>

                {communities.map((com, index) => {
                    if (com.status === "None") {
                        return renderItem2(com, index)
                    }
                })}

            </ScrollView>
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => Actions.push("communityForm")}
            />
        </View>
    )
}

export default CommunitiesPage