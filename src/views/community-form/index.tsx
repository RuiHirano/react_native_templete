import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements'
import { Input } from 'react-native-elements';
import { Community, User, CommunityLocation } from '../../types';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import moment, { Moment, updateLocale } from "moment";
//import { CreateCommunityLocationMutationVariables, CreateCommunityMutationVariables } from '../../API';
import { Location as LocationType } from "../../types"
import * as Location from 'expo-location';
//import { API, graphqlOperation } from 'aws-amplify';
//import * as mutations from '../../graphql/mutations' // create, update, delete
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: "blue"
    }
})

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

const mockImageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'

const mockUser: User = {
    id: "testtest",
    name: "平野　流",
    description: "名古屋大学M2",
    email: "r.hrn.0930@gmail.com",
    avatar: { id: "0", uri: mockImageUrl, size: 1000 },
    birthday: moment(),
    sex: "MALE",
    messages: [],
    items: [],
    createdAt: moment(),
    updatedAt: moment()
}

interface CommunityProfile {
    name: string
    description: string
    avatar: string
    radius: number
    closedAt: Moment
}

const CommunityFormPage: React.FC = () => {
    const [profile, setProfile] = useState<CommunityProfile>({ name: "", description: "", avatar: mockImageUrl, radius: 10, closedAt: moment() })

    // spinner
    const [spinner, setSpinner] = useState(false)
    const [spinnerText, setSpinnerText] = useState("作成中...")
    const createCommunity = async () => {

        setSpinner(true)
        if (profile.name === "" || profile.description === "") {
            console.log("名前を入力してください")
            return
        }
        const locationId = uuid()
        const communityId = uuid()
        const location = await getLocation()
        // Create CommunityLocation
        /*const clVariables: CreateCommunityLocationMutationVariables = {
            input: {
                id: locationId,
                communityId: communityId,
                longitude: location.longitude,
                latitude: location.latitude,
                radius: profile.radius,
            },
        };
        const resCl: any = await API.graphql(
            graphqlOperation(mutations.createCommunityLocation, clVariables)
        )
        const comLocation = resCl.data.createCommunity // createしたユーザー情報
        console.log("comLocation: ", comLocation)*/
        // Create Community
        /*const variables: CreateCommunityMutationVariables = {
            input: {
                id: communityId,
                name: profile.name,
                avatar: profile.avatar,
                description: profile.description,
                locationId: locationId,
                closedAt: profile.closedAt.toDate().toISOString()
            },
        };
        const res: any = await API.graphql(
            graphqlOperation(mutations.createCommunity, variables)
        )
        const community = res.data.createCommunity // createしたユーザー情報
        console.log("community: ", community)*/
        setSpinner(false)
        Actions.pop()
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        setProfile((preProfile) => ({ ...preProfile, closedAt: moment(date) }))
        hideDatePicker();
    };

    return (
        <ScrollView>
            <Spinner
                visible={spinner}
                textContent={spinnerText}
                textStyle={{ color: "white" }}
                overlayColor={"rgba(0,0,0,0.50)"}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <Avatar rounded source={{ uri: profile.avatar }} containerStyle={{ height: 100, width: 100 }} />
                <Button
                    title="コミュニティ写真を変更"
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
            <Text>説明</Text>
            <Input
                defaultValue={profile.description}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, description: value }))
                }}
            />
            <Text>コミュニティ半径</Text>
            <Input
                defaultValue={profile.radius.toString()}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, radius: parseInt(value, 10) }))
                }}
            />
            <Text>終了時間</Text>
            <Button type="clear" title="日付を指定する" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Input
                disabled
                disabledInputStyle={{ color: "black" }}
                defaultValue={profile.closedAt.format("YYYY/MM/DD kk:mm:ss")}
                value={profile.closedAt.format("YYYY/MM/DD kk:mm:ss")}
            />
            <Button
                title="保存する"
                containerStyle={{ marginLeft: 60, marginRight: 60 }}
                onPress={createCommunity}
            />
        </ScrollView>
    )
}

export default CommunityFormPage