import React, { Component } from 'react'
import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import { Avatar, Image, ListItem } from 'react-native-elements'
import { Scene, Router, Tabs, Drawer, Actions, ActionConst } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import { Calendar, Statistic, Graph, History, EntryForm, SignIn, SignUp, Setting, Record } from './src/views'
//import theme from './src/styles/theme'
//import { Drawer as MainDrawer, BottomNavigation } from './src/components'
//import { MainLayout } from './src/layouts'
import { TimelinePage, MyPage, SignPage, SplashPage, CommunitiesPage, ThreadPage, ProfilePage, CommunityFormPage } from './views'
import FormPage from './views/form'
//import Auth from '@aws-amplify/auth';
//import Amplify from '@aws-amplify/core';
//const config = require('../aws-exports').config;
//Amplify.configure(config);

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
        <Icon
            name={props.name}
            color={props.focused ? 'blue' : 'grey'}
            style={styles.tabIconStyle}
        />
    </View>
)

const RouterComponent: React.FC = () => {

    return (
        <Router>
            <Scene
                key='root' // 親はcomponentを持たない
            //hideNavBar
            >
                <Scene
                    key="tabbar" tabs
                    hideNavBar
                //tabBarStyle={styles.tabBar}
                >
                    {/*<Drawer
                        key="drawer"
                        drawerIcon={() => (
                            <Avatar rounded source={{ uri: mockImageUrl }} />
                        )} // デフォルトのハンバーガーメニューを差し替える
                        drawerWidth={300}
                        contentComponent={() => <DrawerComponent />} // ドロワー部分のcomponentを渡している
                        >*/}
                    <Scene key="communities" component={CommunitiesPage} title="コミュニティ" name='history' icon={TabBarIcon} />
                    <Scene key="mypage" component={MyPage} title="マイページ" name='account-circle' icon={TabBarIcon} />
                    {/*</Drawer>*/}
                </Scene>
                <Scene key="timeline" component={TimelinePage} title="タイムライン" name='history' icon={TabBarIcon} />
                <Scene key="form" component={FormPage} title="投稿する" />
                <Scene key="communityForm" component={CommunityFormPage} title="コミュニティを作る" />
                <Scene key="sign" component={SignPage} title="ログイン" />
                <Scene key="thread" component={ThreadPage} title="スレッド" />
                <Scene key="profile" component={ProfilePage} title="プロフィールを編集" />
                <Scene initial key="splash" component={SplashPage} hideNavBar />
            </Scene>
        </Router >
    )
}

export default RouterComponent