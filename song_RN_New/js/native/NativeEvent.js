

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeEventEmitter
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import NativeContent from './NativeContent'
import UShare from './UShare'


const myNativeEvt = new NativeEventEmitter(NativeContent);  //创建自定义事件接口

export default class NativeEventPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: '',
        }
    }

 
    componentDidMount() {
        //android
        DeviceEventEmitter.addListener('EventReminderAndroid',(data)=>this.isCallback(data));

        //ios
        this.listener = myNativeEvt.addListener('EventReminderIos', (data)=>this.isCallback(data));  //对应了原生端的名字



    }


    componentWillUnmount(){
        this.listener && this.listener.remove();  //记得remove哦
        this.listener = null;
        
    }
    /**
     * 方法名只需要oc方法的最前面部分即可
     * 入参从js传入，按顺序入参，若oc是需要入参，但js没入参会报错
     */
    // promise
    
    getNativeContent() {
        NativeContent.nativeStringToReact('dddddd', 'ggggggg')
            .then(result => {
                this.setState({
                    word: result
                })
            })
            .catch(e => {
                this.setState({
                    word: e.message
                })
            })


    }

    // callback

    // getNativeContent() {
    //     NativeContent.nativeStringToReact('dddddd', 'ggggggg', (success) => {
    //         console.log(success)
    //         this.setState({
    //             word: success
    //         })
    //     }, (error) => {
    //         console.log(error)
    //         this.setState({
    //             word: error
    //         })
    //     })
    // }


    share() {
        UShare.share('分享标题', '分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容', 'https://mobile.umeng.com/images/pic/home/social/img-1.png', 'https://www.baidu.com')
            .then(result => {
            })
            .catch(e => {

            })
    }

    sendEvent(){
        NativeContent.sendEventToReact('react 接收到了native事件');
    }

    /**
     *  事件接受方法
     */
    isCallback(data) {//接受原生传过来的数据 
        this.setState({
            word: data.content
        })
    }



    render() {

        return (

            <View style={styles.container}>

                <NavigationBar
                    title={'testComponent'}
                    titleColor={{
                        color: 'white'
                    }}
                    style={{
                        backgroundColor: 'red'
                    }}
                    statusBar={{
                        backgroundColor: 'red',
                        barStyle: 'light-content',
                        hide: false,
                    }}
                />


                <TouchableOpacity
                    onPress={() => {
                        this.share();
                    }}
                >
                    <Text>分享</Text>

                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        this.getNativeContent();
                    }}
                >
                    <Text>获取native内容</Text>

                </TouchableOpacity>




                <TouchableOpacity
                    onPress={() => {
                        this.sendEvent();
                    }}
                >
                    <Text>发送事件</Text>

                </TouchableOpacity>



                <Text style={styles.text}>{this.state.word}</Text>

    












            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
    }

});