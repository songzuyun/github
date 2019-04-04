

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import codePush from 'react-native-code-push'
import BaseComponent from '../BaseComponent'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
import GlobalStyles from '../../common/GlobalStyles'
import MoreMenu,{MORE_MENU} from '../../common/MoreMenu'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import AboutPage from '../About/AboutPage'
import AboutMePage from '../About/AboutMePage'
import CustomTheme from './CustomTheme'
import NavigatorUtil from '../../utils/NavigatorUtil'

import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../../redux/actions/loginAction';// 导入action方法



// export default class MyPage extends BaseComponent{
 class MyPage extends BaseComponent{
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.state={
            customThemeViewVisible:false,
        }
    }

    renderCustomThemeView(){
        return (<CustomTheme
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={()=>this.setState({customThemeViewVisible:false})}
        />)
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props,menuType: tab};
        switch (tab) {
            case MORE_MENU.Custom_Language:
                TargetComponent = 'CustomKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent = 'CustomKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent = 'CustomKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                params.isRemoveKey = true;
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Custom_Theme:
                this.setState({customThemeViewVisible:true})
                break;
            case MORE_MENU.About_Author:
                TargetComponent='AboutMePage';
                params.theme = this.params.theme;
                break;
            case MORE_MENU.About:
                TargetComponent='AboutPage';
                params.theme = this.params.theme;
                break;
            case '更新':
                this.update();
                break;
            case '登录':
                this.props.gotologin({
                    name: '宋族运',
                    age: 18,
                  });
                break;

        }
        if (TargetComponent) {
            // this.props.navigator.push({
            //     component: TargetComponent,
            //     params: params,
            // });
            NavigatorUtil.goToMenuPage({
                ...this.props,
                params:params
            },TargetComponent)
        }
    }


    /**
     * 向CodePush服务器检查更新
     */
    update(){
        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix:'更新内容',
                title:'更新',
                mandatoryUpdateMessage:'',
                mandatoryContinueButtonLabel:'更新',
            },
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,//IMMEDIATE  ON_NEXT_RESTART
        });
    }
    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text,this.props.navigation.state.params.theme.styles.tabBarSelectedIcon,null);
    }

    render(){
        var navigationBar =   
        <NavigationBar
            title={'我的'}
            style={this.props.navigation.state.params.theme.styles.navBar}
        />
        const userInfo = this.props;
        let status = userInfo.status;
        let userName = userInfo.user?userInfo.user.name:'';
        let userAge = userInfo.user?userInfo.user.age:'';

        return(
            <View style={GlobalStyles.root_container}>
            {navigationBar}
            <ScrollView >
                <TouchableHighlight
                    onPress={()=>this.onClick(MORE_MENU.About)}>
                    <View style={[styles.item, {height: 90}]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Image source={require('../../../res/images/ic_trending.png')}
                                   style={[{width: 40, height: 40, marginRight: 10},this.props.navigation.state.params.theme.styles.tabBarSelectedIcon]}/>
                            <Text>GitHub Popular</Text>
                        </View>

                        
                        <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                               style={[{
                                   opacity: 1,
                                   marginRight: 10,
                                   height: 22,
                                   width: 22,
                                   alignSelf: 'center',
                               },this.props.navigation.state.params.theme.styles.tabBarSelectedIcon]}/>
                               
                    </View>
                </TouchableHighlight>

                <View style={GlobalStyles.line}/>

                {/*趋势管理*/}
                <Text style={styles.groupTitle}>趋势管理</Text>
                {/*自定义语言*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Language, require('./img/ic_custom_language.png'), '自定义语言')}
                {/*语言排序*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Language, require('./img/ic_swap_vert.png'), '语言排序')}

                {/*最热管理*/}
                <Text style={styles.groupTitle}>最热管理</Text>
                {/*自定义标签*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Key, require('./img/ic_custom_language.png'), '自定义标签')}
                {/*标签排序*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Key, require('./img/ic_swap_vert.png'), '标签排序')}
                {/*标签移除*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Remove_Key, require('./img/ic_remove.png'), '标签移除')}

                {/*设置*/}
                <Text style={styles.groupTitle}>设置</Text>
                {/*自定义主题*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Theme, require('./img/ic_view_quilt.png'), '自定义主题')}
                {/*关于作者*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.About_Author, require('./img/ic_insert_emoticon.png'), '关于作者')}
                <View style={GlobalStyles.line}/>
                {this.getItem('更新', require('./img/ic_insert_emoticon.png'), '检查更新')}
                <View style={GlobalStyles.line}/>
                {this.getItem('登录', require('./img/ic_insert_emoticon.png'), status)}
                <View style={GlobalStyles.line}/>
                {this.getItem('', require('./img/ic_insert_emoticon.png'), '姓名：'+userName+'   '+'年龄：'+userAge)}
            </ScrollView>
                               
            {this.renderCustomThemeView()}
        </View>
        )

    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
})


export default connect(
    (state) => ({
      status: state.loginIn.status,
      isSuccess: state.loginIn.isSuccess,
      user: state.loginIn.user,
    }),
    (dispatch) => ({
        gotologin: (data) => dispatch(loginAction.login(data)),
    })
  )(MyPage)

