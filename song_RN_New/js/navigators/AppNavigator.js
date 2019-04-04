import React from 'react'
import {StackNavigator} from 'react-navigation';
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import RepositoryDetail from '../page/RepositoryDetail'
import SearchPage from '../page/SearchPage'
import FavoritePage from '../page/FavoritePage'
import WebviewPage from '../page/WebviewPage'
import CustomKeyPage from '../page/My/CustomKeyPage'
import CustomTheme from '../page/My/CustomTheme'
import MyPage from '../page/My/MyPage'
import SortKeyPage from '../page/My/SortKeyPage'
import AboutMePage from '../page/About/AboutMePage'
import AboutPage from '../page/About/AboutPage'
import TabPage from './TabPage'
import GuidePage from '../page/GuidePage'
import testComponent from '../test/testComponent'
import MyView from '../native/MyView'

import CodePush from 'react-native-code-push'

const AppNavigator = StackNavigator({
    WelcomePage: WelcomePage,
    HomePage: HomePage,
    TabPage: TabPage,
    GuidePage:GuidePage,
    RepositoryDetail: RepositoryDetail,
    SearchPage: SearchPage,
    CustomKeyPage:CustomKeyPage,
    FavoritePage:FavoritePage,
    WebviewPage:WebviewPage,
    CustomTheme:CustomTheme,
    MyPage: MyPage,
    SortKeyPage:SortKeyPage,
    AboutMePage: AboutMePage,
    AboutPage: AboutPage,
    testComponent:testComponent,
    MyView:MyView
}, {
    navigationOptions: {
        // initialRouteName:TabNavigator,
        header: null
    }
})


//必须配置以下代码否则重启app回到上一个版本
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
let codePushApp = CodePush(codePushOptions)(AppNavigator);
export default codePushApp; 