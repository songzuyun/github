import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import {StackNavigator} from 'react-navigation';

import WelcomePage from './WelcomePage'

import CodePush from 'react-native-code-push'



// export default class setup extends Component{
    
//     render(){
//         return (
//             <Navigator
//                 initialRoute={{
//                     component:WelcomePage,
//                 }}
//                 renderScene={(route,navigator)=>{
//                     let Component = route.component;
//                     return <Component navigator={navigator} {...route.params}/>
//                 }}
//             />
//         )
//     }
// }


// 配置codepush写法
class App extends Component {
        render(){
        return (
            <Navigator
                initialRoute={{
                    component:WelcomePage,
                }}
                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component navigator={navigator} {...route.params}/>
                }}
            />
        )
    }
}
//必须配置以下代码否则重启app回到上一个版本
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
let codePushApp = CodePush(codePushOptions)(App);
export default codePushApp; 
