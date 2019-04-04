import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Platform,
  Linking
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils'
import GlobalStyles from '../../common/GlobalStyles'
import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import WebviewPage from '../../page/WebviewPage'
import AboutMePage from './AboutMePage'
import NavigatorUtil from '../../utils/NavigatorUtil'

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon({...this.params,navigation:this.props.navigation},(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about)
  }
  updateState(dic){
      this.setState(dic);
  }

  onClick(tab) {
    let TargetComponent, params = {...this.props,menuType: tab};
    switch (tab) {
        case MORE_MENU.Website:
             TargetComponent='WebviewPage';
             params.url='http://www.devio.org/io/GitHubPopular/';
             params.title='GitHubPopular';
             params.theme = this.params.theme;
            break;
        case MORE_MENU.About_Author:
            TargetComponent='AboutMePage';
            params.theme = this.params.theme;
            break;
        case MORE_MENU.Feedback:
            let url = 'mailto://619624632@qq.com'
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
getItem(tag, icon, text) {
    return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text,this.params.theme.styles.tabBarSelectedIcon,null);
}

  render() {
      let contentview = <View>
            {/*Website*/}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Website, require('../../../res/images/ic_computer.png'), 'Website',this.params.theme.styles.tabBarSelectedIcon)}
            {/*About Author*/}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author, require('../../../res/images/ic_code.png'), 'About Author',this.params.theme.styles.tabBarSelectedIcon)}
            {/*Feedback*/}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback, require('../../../res/images/ic_contacts.png'), 'Feedback',this.params.theme.styles.tabBarSelectedIcon)}
        
      </View>
    return (
        this.aboutCommon.render(contentview,{
            'name':'GitHub Popular',
            'description':'这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
            'avatar':'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
            'backggroundImg':'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
        })
    )
    
        
  }
}
