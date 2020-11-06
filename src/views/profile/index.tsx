import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements'
import { Input } from 'react-native-elements';
import { User } from '../../types';
import moment, { Moment, updateLocale } from "moment";
//import { ReduxState } from '../../redux/module';
//import { useSelector } from 'react-redux';


const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: "blue"
    }
})

interface Profile {
    name: string
    description: string
    email: string
    avatar: string
    birthday: Moment | undefined
    sex: "MALE" | "FEMALE" | "NONE"
}
const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'

const mockUser: User = {
    id: "testtest",
    name: "平野　流",
    description: "名古屋大学M2",
    email: "r.hrn.0930@gmail.com",
    avatar: mockImageUrl,
    birthday: moment(),
    sex: "MALE",
    messages: [],
    createdAt: moment(),
    updatedAt: moment()
}

const ProfilePage: React.FC = () => {
    const user = mockUser
    const [profile, setProfile] = useState<Profile>({ name: user.name, description: user.description, email: user.email, avatar: user.avatar, birthday: user.birthday, sex: user.sex })

    console.log("user data: ", user)
    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <Avatar rounded source={{ uri: profile.avatar }} containerStyle={{ height: 100, width: 100 }} />
                <Button
                    title="プロフィール写真を変更"
                    type="clear"
                    containerStyle={{ marginLeft: 60, marginRight: 60 }}
                />
            </View>
            <Text>名前</Text>
            <Input
                defaultValue={profile.name}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, name: value }))
                }}
            />
            <Text>自己紹介</Text>
            <Input
                defaultValue={profile.description}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, description: value }))
                }}
            />
            <Text>生年月日</Text>
            <Input
                defaultValue={profile.birthday ? profile.birthday.toLocaleString() : ""}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, birthday: moment() }))
                }}
            />
            <Text>性別</Text>
            <Input
                defaultValue={profile.sex}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, sex: "MALE" }))
                }}
            />
            <Text>メールアドレス</Text>
            <Input
                defaultValue={profile.email}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, email: value }))
                }}
            />
            <Button
                title="保存する"
                containerStyle={{ marginLeft: 60, marginRight: 60 }}
            />
        </ScrollView>
    )
}

export default ProfilePage