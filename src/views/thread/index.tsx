import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements'
import { Message } from '../../types';
import { v4 as uuid } from 'uuid';
import moment, { Moment } from "moment";

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: "blue"
    },
})

const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'

const mockReplies = [
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
    message: Message
}
const ThreadPage: React.FC<Props> = (props) => {
    const { message } = props

    return (
        <View>
            <View>
                <ListItem key={message.id} bottomDivider >
                    <ListItem.Content >
                        <View style={{ flexDirection: "row" }}>
                            <Avatar source={{ uri: message.user.avatar }} />
                            <ListItem.Title>{message.user.name}</ListItem.Title>
                        </View>
                        <Text>{message.content}</Text>
                        <ListItem.Subtitle>{message.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>

                    </ListItem.Content>
                </ListItem>
            </View>
            <View>
                <ListItem key={message.id} bottomDivider >

                    <Text>{"234 いいね"}</Text>
                </ListItem>
            </View>
            <View>
                {mockReplies.map((item: Message, index: number) => (
                    <ListItem key={index} bottomDivider >
                        <Avatar source={{ uri: item.user.avatar }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.user.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
                }
            </View>
        </View>
    )
}

export default ThreadPage