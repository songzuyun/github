
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';


export default class ViewUtils{

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getSettingItem(callBack, icon, text, tintStyle, expandableIcon) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        {icon ?
                            <Image source={icon} resizeMode='stretch'
                                   style={[{opacity: 1, width: 20, height: 20, marginRight: 10,}, tintStyle]}/> :
                            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
                        }
                        <Text>{text}</Text>
                    </View>
                    <Image source={expandableIcon ? expandableIcon : require('../../res/images/ic_tiaozhuan.png')}
                           style={[{
                               marginRight: 10,
                               height: 22,
                               width: 22,
                               alignSelf: 'center',
                               opacity: 1
                           }, tintStyle]}/>
                </View>
            </TouchableHighlight>
        )
    }

    static getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={callBack}>
            <Image
                style={{width: 26, height: 26,}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>
    }

    static getRightButton(title, callBack) {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight: 10}}>
                <Text style={{fontSize: 16, color: '#FFFFFF',}}>{title}</Text>
            </View>
        </TouchableOpacity>
    }
      /**
     * 获取更多按钮
     * @param callBack
     * @returns {XML}
     */
    static getMoreButton(callBack) {
        return <TouchableHighlight
            underlayColor={'transparent'}
            ref="moreMenuButton"
            style={{padding: 5}}
            onPress={callBack}
        >
            <View style={{paddingRight: 8}}>
                <Image
                    style={{width: 24, height: 24,}}
                    source={require('../../res/images/ic_more_vert_white_48pt.png')}
                />
            </View>
        </TouchableHighlight>
    }
}


const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})