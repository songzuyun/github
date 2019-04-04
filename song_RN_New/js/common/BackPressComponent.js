/**
 * 更多菜单
 * @flow
 */


import React, { Component } from 'react';
import {
    BackAndroid,

} from 'react-native';

/**
 * 如果extends Component 需要 super（props），这里不是一个完整的类，用一个变量保存即可
 */
export default class BackPressComponent  {
    constructor(props) {
        this._hardwareBackPress = this.hardwareBackPress.bind(this);
        this.props = props;
    }
    componentDidMount(){
        if(this.props.backPress)BackAndroid.addEventListener('hardwareBackPress',this._hardwareBackPress);
    }
    componentWillUnmount(){
        if(this.props.backPress)BackAndroid.removeEventListener('hardwareBackPress',this._hardwareBackPress)
    }
    hardwareBackPress(e){
        return this.props.backPress(e);
    }

}