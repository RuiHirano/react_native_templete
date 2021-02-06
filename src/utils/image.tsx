import React, { createContext, useContext, useEffect } from 'react';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Icon, Image as RNImage, Overlay } from 'react-native-elements';
import { Image } from '../types';
import { DialogContext } from './dialog';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuid } from 'uuid';
import { SnackbarContext } from './snackbar';
import AwsAPI from '../api'
import { UserStore } from '../store/user';

const api = new AwsAPI()


const SCREEN_WIDTH = Dimensions.get('window').width // Window width
const SCREEN_HEIGHT = Dimensions.get('window').height // Window width

type ImageType = "None" | "Create" | "Delete"
type ImageStatus = { type: ImageType, image: Image }

export const useImages = (defaultImages: Image[], readonly?: boolean) => {

    const { state, dispatch } = useContext(UserStore);
    const user = state.user
    const [visible, setVisible] = useState(false);
    const [overlayStatus, setOverlayStatus] = useState<{ image: undefined | Image, visible: boolean }>({ image: undefined, visible: false })
    const [imagesStatus, setImagesStatus] = useState<ImageStatus[]>([]);
    const { showDialog } = useContext(DialogContext);
    const { showSnackbar } = useContext(SnackbarContext);
    //console.log("image: ", overlayStatus.image)

    useEffect(() => {

        // 署名付きurlをgetする
        const prepareImagesStatus = async () => {
            const imagesStatus: ImageStatus[] = []
            for (let i = 0; i < defaultImages.length; i++) {
                const img = defaultImages[i]
                const url = await api.getImageUriFromStorage(img.id)
                img.uri = url ? url : img.uri
                imagesStatus.push({ type: "None", image: img })

            }
            setImagesStatus(imagesStatus)
        }
        prepareImagesStatus()

    }, [])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.cancelled) {
            const fileInfo = await FileSystem.getInfoAsync(result.uri);
            //console.log(fileInfo)
            const newImage = { id: uuid(), size: fileInfo.size ? fileInfo.size : 0, uri: result.uri }
            setImagesStatus([...imagesStatus, { type: "Create", image: newImage }])
        }
    }

    const getTotalSize = () => {
        let size = 0
        imagesStatus.forEach((imgSt) => size += imgSt.image.size)
        return size
    }

    const showOverlay = (tgtImage: Image) => {
        setOverlayStatus({ image: tgtImage, visible: true })
    }
    const hiddenOverlay = () => {
        setOverlayStatus({ image: undefined, visible: false })
    }

    const deleteImage = (tgtImage: Image) => {
        showDialog("削除しますか？", "削除", async () => {
            try {
                const newImagesStatus: ImageStatus[] = []
                imagesStatus.map((imgSt) => {
                    if (imgSt.image.id === tgtImage.id) {
                        if (imgSt.type === "None") {
                            // すでにawsにある場合はDeleteに変更
                            newImagesStatus.push({ ...imgSt, type: "Delete" })
                        }
                        // Createの場合は配列から削除
                    } else {
                        newImagesStatus.push(imgSt) //それ以外はそのまま代入
                    }

                })
                setImagesStatus(newImagesStatus)
            } catch (err) {
                showSnackbar("ERROR", "エラーが発生しました")
            }
        })
    }

    const uploadImages = async () => {
        const newImages: Image[] = []
        for (let i = 0; i < imagesStatus.length; i++) {
            const imgSt = imagesStatus[i]
            if (imgSt.type === "Delete") {
                // delete
                await api.deleteImageFromStorage(imgSt.image.id)
            } else if (imgSt.type === "Create") {
                // create
                const localUri = imgSt.image.uri
                const fileInfo = await FileSystem.getInfoAsync(localUri);
                const key = await api.createImageToStorage(user.id, localUri)
                const uri = await api.getImageUriFromStorage(key)
                if (typeof fileInfo.size === "number" && typeof uri === "string") {
                    //console.log("push new image")
                    newImages.push({ id: key, size: fileInfo.size, uri: uri })
                }

            } else {
                newImages.push(imgSt.image)
            }
        }
        //console.log("new image", newImages)
        return newImages
    }


    const renderImageView = useCallback(() => {

        const imagesView = imagesStatus.map((imgSt) => {
            if (imgSt.type !== "Delete") {
                return (
                    <Avatar key={imgSt.image.id} onPress={() => showOverlay(imgSt.image)} onLongPress={() => deleteImage(imgSt.image)} rounded source={{ uri: imgSt.image.uri }} containerStyle={{ height: 100, width: 100, margin: 5 }} />
                )
            }
        })
        return (
            <View>
                <View style={{ margin: 5 }}>
                    <Text style={styles.title}>{"画像"}</Text>
                    <Text style={styles.title}>{`合計サイズ: ${getTotalSize()} byte`}</Text>
                </View>
                <View style={{ height: 120 }}>
                    <ScrollView horizontal>
                        {imagesView}
                        {readonly ? <View /> : <Avatar onPress={addImage} rounded title="追加" containerStyle={{ backgroundColor: "gray", height: 100, width: 100, margin: 5 }} />}
                    </ScrollView>
                </View>
                <Overlay isVisible={overlayStatus.visible} onBackdropPress={hiddenOverlay}>
                    {overlayStatus.image ? <View ><RNImage source={{ uri: overlayStatus.image.uri }} containerStyle={{ height: SCREEN_WIDTH * 3 / 4, width: SCREEN_WIDTH, margin: 5 }} /></View> : <View />}
                </Overlay>
            </View>
        )
    }, [imagesStatus, overlayStatus])

    return { "renderImageView": renderImageView, "uploadImages": uploadImages }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center'
    },
})

