import React, { Component, useContext } from 'react'
import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import { Avatar, Image, ListItem, Divider } from 'react-native-elements'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Scene, Router, Tabs, Drawer, Actions, ActionConst } from 'react-native-router-flux'
import { TimelinePage, MyPage, SignPage, SplashPage, CommunitiesPage, ThreadPage, ProfilePage, CommunityFormPage } from './views'
import FormPage from './views/form'
import { DialogContext } from './utils/dialog'
import { SnackbarContext } from './utils/snackbar'
import * as Linking from 'expo-linking';
import { ItemActionType, ItemStore } from './store/item'
import { UserActionType, UserStore } from './store/user'
import { newUser } from './types'
import SettingPage from './views/setting'
import SignIn from './views/sign'
import Home from './views/home'

const styles = {
    tabIconContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    tabIconStyle: {
        width: 24,
        height: 24,
        fontSize: 24,
    },
    menuIconStyle: {
        width: 24,
        height: 24,
        fontSize: 24,
        //color: theme.on_primary,
    },
}

const TabBarIcon = (props: any) => (
    <View style={styles.tabIconContainerStyle}>
        <MCIcon
            name={props.name}
            color={props.focused ? 'blue' : 'grey'}
            style={styles.tabIconStyle}
        />
    </View>
)

const DrawerComponent = (props: any) => {
    const { showDialog } = useContext(DialogContext);
    const { showSnackbar } = useContext(SnackbarContext);
    const { dispatch: transactionDispatch } = useContext(ItemStore);
    const { dispatch: userDispatch } = useContext(UserStore);
    const signout = () => {
        showDialog("サインアウトしますか？", "サインアウト", async () => {
            try {
                //await api.signOut()
                userDispatch({ type: UserActionType.UPDATE_USER, user: newUser() })
                transactionDispatch({ type: ItemActionType.UPDATE_ITEMS, items: [] })
                Actions.reset('sign')
                showSnackbar("SUCCESS", "サインアウトしました")
            } catch (err) {
                showSnackbar("ERROR", "エラーが発生しました")
            }
        })
    }
    return (
        <View>
            <View style={{ height: 50 }} />
            <Divider />
            <ListItem onPress={() => Actions.push('profile')}>
                <MCIcon name='account-circle' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"プロフィール"}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <Divider />
            <ListItem onPress={() => Actions.push('setting')}>
                <MCIcon name='cogs' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"設定"}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <Divider />
            <ListItem onPress={() => {
                Linking.openURL('https://google.com');
            }}>
                <MCIcon name='twitter' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"公式Twitter"}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <Divider />
            <ListItem onPress={() => {
                signout()
            }} >
                <MCIcon name='logout' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{"サインアウト"}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Divider />
        </View>
    )
}

const RouterComponent: React.FC = () => {

    return (
        <Router>
            <Scene
                key='root' // 親はcomponentを持たない
            //hideNavBar
            >
                <Drawer
                    key="main"
                    hideNavBar
                    drawerIcon={() => (<MCIcon name="menu" size={30} />)}
                    drawerWidth={300}
                    contentComponent={() => (<DrawerComponent />)} // ドロワー部分のcomponentを渡している
                >
                    <Scene
                        key="tabbar" tabs
                        hideNavBar
                    >
                        <Scene key="home" component={Home} title="ホーム" name='home' icon={TabBarIcon} />
                        <Scene key="communities" component={CommunitiesPage} title="コミュニティ" name='history' icon={TabBarIcon} />
                        <Scene key="mypage" component={MyPage} title="マイページ" name='account-circle' icon={TabBarIcon} />

                    </Scene>
                </Drawer>
                <Scene key="timeline" component={TimelinePage} title="タイムライン" name='history' icon={TabBarIcon} />
                <Scene key="form" component={FormPage} title="投稿する" />
                <Scene key="communityForm" component={CommunityFormPage} title="コミュニティを作る" />
                <Scene key="sign" component={SignIn} title="ログイン" hideNavBar />
                <Scene key="thread" component={ThreadPage} title="スレッド" />
                <Scene key="profile" component={ProfilePage} title="プロフィールを編集" />
                <Scene initial key="splash" component={SplashPage} hideNavBar />
                <Scene key="setting" component={SettingPage} title="設定" />
            </Scene>
        </Router >
    )
}

export default RouterComponent