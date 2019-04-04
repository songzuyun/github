import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  YellowBox
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import ThemeDao from '../expand/dao/ThemeDao'

import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
import PopularPage from './PopularPage'

import SplashScreen from 'react-native-splash-screen'

import {StackActions,NavigationActions} from 'react-navigation'
import NavigatorUtil from '../utils/NavigatorUtil'

import NativeContent from '../native/NativeContent'

// import DeviceInfo from 'react-native-device-info';


export default class WelcomePage extends Component{
    constructor(props){
        super(props);
    }

    isFirstOpen(version)
    {
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(version,(error,result)=>{
                if(!error){
                    if(result=='alreadyOpen'){
                        resolve(false) 
                    }else{
                        resolve(true)
                    }
                }
     
    
            })
        })

    }

    setAlreadyOpen(version){
        AsyncStorage.setItem(version,'alreadyOpen',(error)=>{
        })
    }
    componentDidMount() {
        //yellow box取消所有Warning开头的警告
        YellowBox.ignoreWarnings(['Warning: ']);

        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        })



        // NativeContent.getVersionInfoFromNative()
        // .then(result => {
        //     this.version = result;
        //     this.isFirstOpen(this.version )
        //     .then(result=>{
        //         this.isFirst = result;
        //     })
        // })
        // .catch(e => {
        //     console.log(e)
        // })

    


        const {navigation}=this.props;
        this.timer=setTimeout(()=> {
            SplashScreen.hide();

            // this.props.navigator.resetTo({
            //     component: HomePage,
            //     params:{
            //         theme:this.theme,
            //     }
            // });

            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [NavigationActions.navigate({ routeName: 'HomePage',params:{theme:this.theme}} )],
            // });
            // this.props.navigation.dispatch(resetAction);

            //判断重置路由为引导页还在主页

            // if(this.isFirst){
            //     this.setAlreadyOpen(this.version);
            //     NavigatorUtil.resetToGuidePage({...this.props,theme:this.theme})
            // }else{
            //     NavigatorUtil.resetToHomePage({...this.props,theme:this.theme})
            // }

            NavigatorUtil.resetToHomePage({...this.props,theme:this.theme})

            

            

        }, 1000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render(){
        return null;
  
    }
}