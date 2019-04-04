import { NativeModules } from 'react-native';
export default NativeModules.NativeContent;




// import React, { Component } from 'react';
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     DeviceEventEmitter
// } from 'react-native';

// import NavigationBar from '../common/NavigationBar'

// import {
//     NativeModules,
//     NativeEventEmitter,  //导入NativeEventEmitter模块
//   } from 'react-native';
   
//   var nativeContent = NativeModules.nativeContent;
//   const myNativeEvt = new NativeEventEmitter(nativeContent);  //创建自定义事件接口
  


// export default class nativeContentPage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             word: '',
//         }
//     }

//     componentDidMount() {
//         //注册扫描监听
//         this.listener = myNativeEvt.addListener('EventReminder', this.iseCallback.bind(this));  //对应了原生端的名字

//     }


//     iseCallback(data) {//接受原生传过来的数据 data={code:,result:}       

//         this.setState({
//             word: data.content
//         })

//     } 
 
//     componentWillUnmount(){
//         this.listener && this.listener.remove();  //记得remove哦
//         this.listener = null;
        
//     }
    
//      /**
//      * android 发送事件
//      */
//     sendEvent(){
//         NativeContent.onHandleResult('fffffffff');
//     }

//     render() {

//         return (

//             <View style={styles.container}>

//                 <NavigationBar
//                     title={'testComponent'}
//                     titleColor={{
//                         color: 'white'
//                     }}
//                     style={{
//                         backgroundColor: 'red'
//                     }}
//                     statusBar={{
//                         backgroundColor: 'red',
//                         barStyle: 'light-content',
//                         hide: false,
//                     }}
//                 />

//                               <TouchableOpacity
//                     onPress={() => {
//                         this.sendEvent();
//                     }}
//                 >
//                     <Text>发送事件</Text>

//                 </TouchableOpacity>

//                 <Text style={styles.text}>{this.state.word}</Text>



//             </View>
//         )

//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
//     text: {
//         fontSize: 20,
//     }

// });