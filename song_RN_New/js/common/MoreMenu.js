/**
 * 更多菜单
 * @flow
 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
    ViewPropTypes


} from 'react-native';
import { Popover, PopoverController } from 'react-native-modal-popover';
import {PropTypes} from 'prop-types';

import CustomKeyPage from "../page/My/CustomKeyPage";
import SortKeyPage from "../page/My/SortKeyPage";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import AboutPage from '../page/About/AboutPage'
import AboutMePage from '../page/About/AboutMePage'
import UShare from '../native/UShare'
import share from '../../res/data/share.json'
import NavigatorUtil from '../utils/NavigatorUtil'

export const MORE_MENU = {
    Custom_Language: '自定义语言',
    Sort_Language: '语言排序',
    Custom_Theme: '自定义主题',
    Custom_Key: '自定义标签',
    Sort_Key: '标签排序',
    Remove_Key: '标签移除',
    About_Author: '关于作者',
    About: '关于',
    Website: 'Website',
    Feedback: '反馈',
    Share: '分享',
}


export default class PopView extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            showPopover: false,
            popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },

        }


    }

    static propTypes = {
        contentStyle: ViewPropTypes.style,
        menus: PropTypes.array.isRequired,
        // rootview: PropTypes.object.isRequired,
        rootview: PropTypes.object,
    }

    openPopover() {
        this.props.rootview.measure((x0, y0, width, height, x, y) => {
            this.setState({
                showPopover: true,
                popoverAnchor: { x, y, width, height }
            });
        });
    };

    closePopover() {
        this.setState({
            showPopover: false
        })
    }
    
    onMoreMenuSelect(tab) {
        this.closePopover();
        if(typeof(this.props.onMoreMenuSelect)=='function')this.props.onMoreMenuSelect(tab)
        let TargetComponent, params = {...this.props, menuType: tab};
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
                params.isRemoveKey=true;
                params.flag = FLAG_LANGUAGE.flag_key;
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

                break;
            case MORE_MENU.Share:

                //第三方分享
                //promise回调
                UShare.share(share.title, share.content,share.imgUrl, share.url)
                .then(result => {
                    DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_SHOW_TOAST,result)
                })
                .catch(e => {
                    DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_SHOW_TOAST,e.message)

                })

                //callback回调
                // var shareApp = share.share_app;
                // UShare.share(share.title, share.content,
                //     share.imgUrl, share.url, (success) => {
                //         DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_SHOW_TOAST,result)
                //     }, (error) => {
                //         DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_SHOW_TOAST,e.message)
                //     })




                //第三方登录
                // UShare.loginByWechat()



  

                
            break;
            case MORE_MENU.About_Author:
                TargetComponent = 'AboutMePage';
                params.theme = this.params.theme;
                break;
            case MORE_MENU.About:
                TargetComponent = 'AboutPage';
                params.theme = this.params.theme;
                break;
            case MORE_MENU.Feedback:
                var url='mailto://crazycodeboy@gmail.com';
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
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
    render() {

        let timeSpanView =
            <Popover
                visible={this.state.showPopover}
                fromRect={this.state.popoverAnchor}
                onClose={() => { this.closePopover() }}
                placement="bottom"
                contentStyle={{ opacity: 0.82, backgroundColor: '#343434' }}//若要使用箭头，到popover.js里修改为contentStyle的颜色,否则删除箭头代码
                backgroundStyle={{ backgroundColor: 'transparent' }}


            >
                <View style={{ alignItems: 'center' }}>
                    {this.props.menus.map((result, i, arr) => {
                    return <TouchableOpacity key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                             underlayColor='transparent'>
                        <Text
                            style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                            {arr[i]}
                        </Text>
                    </TouchableOpacity>
                })
                }

                </View>
            </Popover>
        return (
            <View>
                {timeSpanView}
            </View>
            
        )
    }
}