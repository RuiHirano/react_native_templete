import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
//import * as mutations from '../../graphql/mutations' // create, update, delete
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Location from 'expo-location';
import { Message } from '../../types';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import moment, { Moment } from "moment";
//import axios from "axios"
import { Location as LocationType } from "./../../types"
//import { API, graphqlOperation } from 'aws-amplify';
//import { CreateMessageMutationVariables } from '../../API';


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

/*const postMessage = async (message: Message) => {
    console.log("get message")
    const location = await getLocation()
    message.location = location
    const msgjson = message.toJson()
    console.log("msgjson: ", msgjson)
    return axios(
        {
            url: "/post-message",
            method: 'post',
            baseURL: baseURL,
            headers: { 'Content-Type': 'application/json' },
            data: { "message": msgjson },
            timeout: 0, // default is `0` (no timeout)
            maxContentLength: 2000, // default, bytes
        }
    );
}*/

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

interface Props {
    communityId: string
}
const FormPage: React.FC<Props> = (props) => {
    const { communityId } = props
    //const communityId = "9999"
    const userId = "0000"
    const [content, setContent] = useState<string>("");

    // spinner
    const [spinner, setSpinner] = useState(false)
    const [spinnerText, setSpinnerText] = useState("埋め込み中...")
    //const [text, setText] = useState<string>("")


    /*const onPressPostButton = async () => {
        console.log("post!")
        setSpinner(true)
        console.log("finished")
        const message: Message = new Message(uuid(), "hiranorui", 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg', text, moment(), { "latitude": 35.000, "longitude": 127.000 })
        const res = await postMessage(message)
        console.log("res: ", res)
        setTimeout(() => {
            console.log("got message2")
            setSpinner(false)
            Actions.pop()
        }, 1000);
    }*/

    const onSendMessage = async () => {
        setSpinner(true)
        /*const variables: CreateMessageMutationVariables = {
            input: {
                communityId: communityId,
                userId: userId,
                content: content
            },
        };
        const res: any = await API.graphql(
            graphqlOperation(mutations.createMessage, variables)
        )
        const message = res.data.createMessage // createしたユーザー情報
        console.log("userData: ", message)*/
        setSpinner(false)
        Actions.pop()
    }

    return (
        <ScrollView>
            <Spinner
                visible={spinner}
                textContent={spinnerText}
                textStyle={{ color: "white" }}
                overlayColor={"rgba(0,0,0,0.50)"}
            />
            <Input
                placeholder='いまどうしてる？'
                onChangeText={value => {
                    setContent(value)
                }}
            />
            <Button
                title="送信する"
                containerStyle={{ marginLeft: 60, marginRight: 60 }}
                onPress={onSendMessage}
            />
        </ScrollView>
    )
}

export default FormPage