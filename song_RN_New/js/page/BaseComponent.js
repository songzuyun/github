/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    NativeEventEmitter
} from 'react-native';
import {ACTION_HOME}from './HomePage'
import NativeContent from '../native/NativeContent'
import NavigatorUtil from '../utils/NavigatorUtil'

const myNativeEvt = new NativeEventEmitter(NativeContent);  //创建自定义事件接口-ios

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme,
            push:false
        }
    }
    componentDidMount(){
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE',
            (action,params) => this.onBaseAction(action,params));


        //android
        DeviceEventEmitter.addListener('EventReminderAndroid',(data)=>this.isCallback(data));

        //ios
        this.listener = myNativeEvt.addListener('EventReminderIos', (data)=>this.isCallback(data));  //对应了原生端的名字

    }


        /**
     *  事件接受方法
     */
    isCallback(data) {//接受原生传过来的数据 
        
        console.log(data)

        // this.props.navigator.push({
        //     component:AboutMePage,
        //     params:{
        //         ...this.props

        //     }
        // }

            
        // )
    }

    /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onBaseAction(action,params){
        if(ACTION_HOME.A_THEME===action){
            this.onThemeChange(params)
        }
    }
    componentWillUnmount(){
        if (this.baseListener) {
            this.baseListener.remove();
        }
    }

    /**
     * 当主题改变后更新主题
     * @param theme
     */
    onThemeChange(theme){
        if(!theme)return;
        // this.setState({
        //     theme:theme
        // })

        //只能直接重置路由
        NavigatorUtil.resetToHomePage({...this.props,theme:theme})
    }
}

