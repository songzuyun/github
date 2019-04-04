
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native';

import BaseComponent from './BaseComponent'
import TabNavigator from 'react-native-tab-navigator'
import Toast,{DURATION} from 'react-native-easy-toast'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MyPage from './My/MyPage'
import FavoritePage from './FavoritePage'
import FlatListDemo from '../test/FlatListDemo'
import SectionListDemo from '../test/SectionListDemo'
import SwipeableFlatListDemo from '../test/SwipeableFlatListDemo'
import FetchTest from '../test/FetchTest'
import AsyncStorageTest  from '../test/AsyncStorageTest'
import WebviewTest from '../test/WebviewTest'
import testComponent from '../test/testComponent'
import NativeEvent from '../native/NativeEvent'
import NavigatorUtil from '../utils/NavigatorUtil'

export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
export const FLAG_TAB={
    flag_popularTab:'tb_popular',
    flag_trendingTab:'tb_trending',
    flag_favoriteTab:'tb_favorite',
    flag_my:'tb_my'
}


export default class HomePage extends BaseComponent {

  constructor(props){
    super(props);
    this.params = this.props.navigation.state.params;
    let selectedTab=this.params.selectedTab?this.params.selectedTab:FLAG_TAB.flag_popularTab;
    this.state={
      selectedTab:selectedTab,
      theme:this.params.theme,
    }

  }
  
 
  componentDidMount(){
    super.componentDidMount();
    //ACTION_HOME 是监听name，action,params分别是第二个和第三个入参 调用：  DeviceEventEmitter.emit('ACTION_HOME',action,params)
    this.listener = DeviceEventEmitter.addListener('ACTION_HOME',
    (action,params) => this.onAction(action,params));

  }
      /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onAction(action,params){
      if(ACTION_HOME.A_RESTART===action){
          this.onRestart(params)
      }else if(ACTION_HOME.A_SHOW_TOAST===action){
          this.toast.show(params.text?params.text:params,DURATION.LENGTH_LONG);
      }
  }
   /**
     * 重启首页
     * @param jumpToTab 默认显示的页面
     */
    onRestart(jumpToTab){

      // this.props.navigator.resetTo({
      //     component:HomePage,
      //     params:{
      //         ...this.props,
      //         selectedTab:jumpToTab
      //     }
      // })

      NavigatorUtil.resetToHomePage({...this.props,selectedTab:jumpToTab})
  }
  componentWillUnmount(){
    this.listener&&this.listener.remove();
  }
  //在这里进行判断点击当前标签要处理的事件
  componentDidUpdate(){
      let selectedTab = this.state.selectedTab
      // console.log(selectedTab)

  }
  _renderTab(Component,selectTab,title,renderIcon){
    return(
        <TabNavigator.Item
            selected={this.state.selectedTab === selectTab}
            selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
            title={title}
            renderIcon={() => <Image style={styles.image} source={renderIcon} />}
            renderSelectedIcon={() => <Image style={[styles.image,this.state.theme.styles.tabBarSelectedIcon]} source={renderIcon} />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: selectTab })}>
            <Component {...this.props} theme={this.state.theme}/>
        </TabNavigator.Item>
    )

  }
  render() {
    // let tabBarHeight = 0;
    return (
      <View style={styles.container}>
        <TabNavigator
        // tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}//隐藏tabbar
        // sceneStyle={{ paddingBottom: tabBarHeight }}
        >
          
          {this._renderTab(PopularPage,'tb_popular','最热',require('../../res/images/ic_polular.png'))}
          {this._renderTab(TrendingPage,'tb_trending','趋势',require('../../res/images/ic_trending.png'))}
          {this._renderTab(FavoritePage,'tb_favorite','收藏',require('../../res/images/ic_favorite.png'))}
          {this._renderTab(MyPage,'tb_my','我的',require('../../res/images/ic_my.png'))}
        </TabNavigator>

        <Toast ref={toast=>this.toast=toast}/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    
  },
  page1:{
    flex:1,
    backgroundColor:'red',
  },
  page2:{
    flex:1,
    backgroundColor:'yellow',
  
  },
  image:{
    height:22,
    width:22,
  }

});
