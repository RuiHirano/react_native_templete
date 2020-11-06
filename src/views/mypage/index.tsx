import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { ListItem, Avatar, Button, Card, ButtonGroup } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { v4 as uuid } from 'uuid';
import moment, { Moment } from "moment";
import { Community, Message } from '../../types';

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
    }

})


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

const mockCommunities: Community[] = [
    {
        id: uuid(),
        name: "名古屋大学IB講義室105号室",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 35.000, longitude: 127.000, radius: 10 },
        users: [],
        status: "None",
        closedAt: moment(),
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        name: "日本ガイシホール AcidBlackCherry",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 35.000, longitude: 127.000, radius: 10 },
        users: [],
        status: "None",
        closedAt: moment(),
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        name: "ディズニーランド",
        avatar: mockImageUrl,
        description: "",
        location: { latitude: 35.000, longitude: 127.000, radius: 10 },
        users: [],
        status: "None",
        closedAt: moment(),
        createdAt: moment(),
        updatedAt: moment(),
    },
]

const mockFavorites = [
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "satoru", id: uuid() },
        images: [],
        content: "Acid Black Charryのライブ行ってきた〜",
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "eriko", id: uuid() },
        images: [],
        content: "ちょっと休憩!",
        createdAt: moment(),
        updatedAt: moment(),
    },
    {
        id: uuid(),
        user: { avatar: mockImageUrl, name: "tomoki", id: uuid() },
        images: [],
        content: "楽勝じゃん",
        createdAt: moment(),
        updatedAt: moment(),
    }
]


const MyPage: React.FC = () => {

    const MyPostView: React.FC = () => {

        const handleRefresh = async () => {

        }

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={handleRefresh} />
                }>
                {mockMessages.map((item: Message, index: number) => (
                    <ListItem key={index} bottomDivider onPress={() => Actions.push("thread", { message: item })}>
                        <Avatar source={{ uri: item.user.avatar }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.user.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        )
    }

    const MyFavoriteView: React.FC = () => {
        const handleRefresh = async () => {

        }
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={handleRefresh} />
                }>
                {mockFavorites.map((item: Message, index: number) => (
                    <ListItem key={index} bottomDivider onPress={() => Actions.push("thread", { message: item })}>
                        <Avatar source={{ uri: item.user.avatar }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.user.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        )
    }

    const MyCommunityView: React.FC = () => {
        const handleRefresh = async () => {

        }
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={handleRefresh} />
                }>
                {mockCommunities.map((item: Community, index: number) => (
                    <ListItem key={index} bottomDivider onPress={() => {
                        Actions.push("timeline", { communityId: item.id })
                    }}>
                        <Avatar source={{ uri: item.avatar }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{"参加者：" + item.users.length + "人"}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.createdAt.format("M/DD kk:mm:ss")}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        )
    }

    const buttons = ['投稿', 'コミュニティ', 'いいね']
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    return (
        <View>
            <View style={{ height: "30%" }}>
                <View style={{ height: "80%", flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Avatar
                            rounded
                            containerStyle={{ width: "100%", height: "100%", padding: 30 }}
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                        />
                    </View>
                    <View style={{ flex: 2, padding: 20, marginTop: 10, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#333333" }}>平野 流</Text>
                        <Text style={{ fontSize: 14, color: 'dimgray' }}>Nagoya University/ DII二期生/ </Text>
                        <Button containerStyle={{ marginTop: 20 }} type="outline" title="プロフィールを編集" onPress={() => Actions.push("profile")} />
                    </View>

                </View>
                <View style={{ height: "20%", flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "lightgrey" }}>
                    <ButtonGroup
                        onPress={(index) => setSelectedIndex(index)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        textStyle={{ fontSize: 13, color: 'black' }}
                        containerStyle={{ flex: 1 }}
                    />
                </View>

            </View>
            <View style={{ height: "70%", backgroundColor: "lightgrey" }}>
                {selectedIndex === 0 ? <MyPostView /> : <View />}
                {selectedIndex === 1 ? <MyCommunityView /> : <View />}
                {selectedIndex === 2 ? <MyFavoriteView /> : <View />}
            </View>
        </View >
    )
}

export default MyPage