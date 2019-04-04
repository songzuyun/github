

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  WebView
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../utils/ViewUtils'

export default class WebViewPage extends Component{

    constructor(props){
        super(props);
        this.state={
            backButtonEnabled:false,
            title:''
        }
    }

    onShouldStartLoadWithRequest(event){
        // let url = event.url;
        // console.log(event,url);
        // if(url.indexOf('https://m.baidu.com')!=-1){return false}
        return true;
    }
    shouldOverrideUrlLoading(event){
        // let url = event.url;
        // console.log(event,url);
        // if(url.indexOf('https://m.baidu.com')!=-1){return false}
        return true;
    }

    onNavigationStateChange(navState){
          this.setState({
              backButtonEnabled:navState.canGoBack,
              title:navState.title
          })
    }

    onBack(){

        // if(this.state.backButtonEnabled){
        //     this.webview.goBack();
        // }
        // else{
        //     this.props.navigator.pop();
        // }

        this.props.navigator.pop();
        
    }

    render(){
        return(

            <View style={styles.container}>

                <NavigationBar
                    title={'webviewTest'}
                    style={{
                        backgroundColor:'red'
                    }}
                    leftButton={ViewUtils.getLeftButton(()=>onBack())}

                />

                <WebView
                    ref={webview=>this.webview=webview}
                    source={{uri:'https://www.baidu.com'}}
                    startInLoadingState={true}
                    onShouldStartLoadWithRequest={(e)=>this.onShouldStartLoadWithRequest(e)}//ios
                    shouldOverrideUrlLoading={(e)=>this.shouldOverrideUrlLoading(e)}//Android
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}

                />

            
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },

  
  });