import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils'
import NavigatorUtil from '../../utils/NavigatorUtil'

export var FLAG_ABOUT = {flag_about:'about',flag_about_me:'about_me'}

export default class AboutCommon {
  constructor(props,updateState,flag_about) {
        this.props = props;
        this.updateState = updateState;
        this.flag_about = flag_about;
  }


getParallaxRenderConfig(params){
    let config={};
    config.renderBackground=() => (
        <View key="background">
            <Image source={{uri: params.backggroundImg,
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT}}/>
            <View style={{position: 'absolute',
                        top: 0,
                        width: window.width,
                        backgroundColor: 'rgba(0,0,0,.4)',
                        height: PARALLAX_HEADER_HEIGHT}}/>
        </View>
        )
    
    config.renderForeground=() => (
        <View key="parallax-header" style={ styles.parallaxHeader }>
            <Image style={ styles.avatar } source={{
            uri: params.avatar,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE
            }}/>
            <Text style={ styles.sectionSpeakerText }>
                {params.name}
            </Text>
            <Text style={ styles.sectionTitleText }>
                {params.description}
            </Text>
        </View>
    )

    config.renderStickyHeader=() => (
        <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{params.name}</Text>
        </View>
    )

    config.renderFixedHeader = () => (
        <View key="fixed-header" style={styles.fixedSection}>
            {/* {ViewUtils.getLeftButton(()=>this.props.navigator.pop())} */}
            {ViewUtils.getLeftButton(()=>{
              NavigatorUtil.goBack(this.props.navigation)

            })}
        </View>
    )

    return config;

}

render(contentView,params){

    let renderConfig = this.getParallaxRenderConfig(params);

    return (
        <ParallaxScrollView
            headerBackgroundColor='red'
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            backgroundColor={this.props.theme.themeColor}
            // contentBackgroundColor="lightgray"
            {...renderConfig}
            
        > 
        {contentView}

        
        </ParallaxScrollView>

    )
}


}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:(Platform.OS==='ios')?20:0,

  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
