import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { ListItem, Avatar, Button, Card, CheckBox } from 'react-native-elements'
import { Input } from 'react-native-elements';
import { Image, User } from '../../types';
import moment, { Moment, updateLocale } from "moment";
import { UserActionType, UserStore } from '../../store/user';
import { color } from 'react-native-reanimated';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SnackbarContext } from '../../utils/snackbar';
import { SpinnerContext } from '../../utils/spinner';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuid } from 'uuid';
import { useImages } from '../../utils/image';
import { DialogContext } from '../../utils/dialog';


const styles = StyleSheet.create({
    sectionText: {
        fontSize: 14,
        color: "#555555",
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10
    },
    save_button: {
        marginLeft: 60, marginRight: 60, paddingBottom: 30, marginTop: 20
    }
})

interface Profile {
    name: string
    description: string
    email: string
    avatar: Image
    birthday: Moment | undefined
    sex: "MALE" | "FEMALE" | "NONE"
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
    items: [],
    messages: [],
    createdAt: moment(),
    updatedAt: moment()
}

const ProfilePage: React.FC = () => {

    const { state, dispatch } = useContext(UserStore);
    const { showSnackbar } = useContext(SnackbarContext);
    const { showSpinner, dismissSpinner } = useContext(SpinnerContext);
    const { showDialog } = useContext(DialogContext);
    const user = mockUser
    const [profile, setProfile] = useState<Profile>({ name: user.name, description: user.description, email: user.email, avatar: user.avatar, birthday: user.birthday, sex: user.sex })
    const [newAvatar, setNewAvatar] = useState<Image>(profile.avatar);

    useEffect(() => {
        // 署名付きurlをgetする
        const getImageUrl = async () => {
            const newAvatar = { ...profile.avatar }
            //const url = await api.getImageUriFromStorage(profile.avatar.id)
            const url = undefined
            newAvatar.uri = url ? url : newAvatar.uri
            setNewAvatar(newAvatar)
        }
        getImageUrl()

    }, [])

    const updateProfile = async () => {
        setLoading(true)
        showSpinner("保存しています...")

        try {
            const newUser = user
            newUser.avatar = profile.avatar
            if (newAvatar.id !== profile.avatar.id) {
                newUser.avatar = await uploadImage(newAvatar)
            }
            newUser.name = profile.name
            newUser.description = profile.description
            newUser.email = profile.email
            newUser.birthday = profile.birthday
            newUser.sex = profile.sex
            //await api.updateUser(newUser)
            dispatch({ type: UserActionType.UPDATE_USER, user: newUser })
            showSnackbar("SUCCESS", "保存しました")
        } catch (error) {
            //console.log("error", error)
            showSnackbar("ERROR", "エラーが発生しました")

        }
        setLoading(false)
        dismissSpinner()
    }

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        //console.log(result);

        if (!result.cancelled) {
            // update new avatar
            const fileInfo = await FileSystem.getInfoAsync(result.uri);
            //console.log(fileInfo)
            setNewAvatar({ id: uuid(), size: fileInfo.size ? fileInfo.size : 0, uri: result.uri })
        }
    }

    const uploadImage = async (image: Image) => {
        // delete pre profile
        if (profile.avatar.uri !== "") {
            //await api.deleteImageFromStorage(profile.avatar.id)
        }
        // upload new image
        //const newImage: Image = { id: key, size: image.size, uri: uri ? uri : "" }
        const newImage: Image = { id: "0", uri: mockImageUrl, size: 1000 }
        return newImage
    }

    //console.log("user data: ", user)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <Avatar rounded source={{ uri: newAvatar.uri }} containerStyle={{ height: 100, width: 100 }} />
                <Button
                    title="プロフィール写真を変更"
                    type="clear"
                    onPress={pickAvatar}
                    containerStyle={{ marginLeft: 60, marginRight: 60 }}
                />
            </View>
            <Text style={styles.sectionText}>ユーザーID</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, padding: 8 }}>{user.id}</Text>

            <Text style={styles.sectionText}>メールアドレス</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, padding: 8 }}>{profile.email}</Text>
            <Text style={styles.sectionText}>名前</Text>
            <Input
                defaultValue={profile.name}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, name: value }))
                }}
            />
            <Text style={styles.sectionText}>自己紹介</Text>
            <Input
                defaultValue={profile.description}
                onChangeText={value => {
                    setProfile((preProfile) => ({ ...preProfile, description: value }))
                }}
            />
            <Text style={styles.sectionText}>生年月日</Text>
            <Button
                onPress={() => setVisible(true)}
                type="clear"
                title={profile.birthday?.isValid() ? profile.birthday.format("YYYY/MM/DD") : "未設定"}
            />
            <DateTimePicker

                isVisible={visible}
                onConfirm={(date) => {
                    //console.log("pick: ", date);
                    setProfile({ ...profile, birthday: moment(date) })
                }}
                onCancel={() => setVisible(false)}
                mode={'date'}
            />
            <Text style={styles.sectionText}>性別</Text>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox containerStyle={{ flex: 1, backgroundColor: 'white', borderColor: 'white' }} checked={profile.sex === "MALE"} title={"男性"} onPress={() => setProfile({ ...profile, sex: "MALE" })} />
                <CheckBox containerStyle={{ flex: 1, backgroundColor: 'white', borderColor: 'white' }} checked={profile.sex === "FEMALE"} title={"女性"} onPress={() => setProfile({ ...profile, sex: "FEMALE" })} />
            </View>

            <Button
                title="保存する"
                loading={loading}
                disabled={loading}
                containerStyle={styles.save_button}
                onPress={updateProfile}
            />
        </ScrollView>
    )
}

export default ProfilePage