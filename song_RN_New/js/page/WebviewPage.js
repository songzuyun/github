

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../utils/ViewUtils'
import GlobalStyles from '../common/GlobalStyles'
import NavigatorUtil from '../utils/NavigatorUtil'

var WEBVIEW_REF = 'webview';

export default class WebViewPage extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            backButtonEnabled: false,
            title: this.params.title,
            url: this.params.url
        }

    }

    onShouldStartLoadWithRequest(event) {
        // let url = event.url;
        // console.log(event,url);
        // if(url.indexOf('https://m.baidu.com')!=-1){return false}
        return true;
    }
    shouldOverrideUrlLoading(event) {
        // let url = event.url;
        // console.log(event,url);
        // if(url.indexOf('https://m.baidu.com')!=-1){return false}
        return true;
    }

    onNavigationStateChange(navState) {

        this.setState({
            backButtonEnabled: navState.canGoBack,
            url: navState.url,
        })
    }


    onBackPress() {

        if (this.state.backButtonEnabled) {
            this.refs[WEBVIEW_REF].goBack();
        }
        else {
            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation)

        }


    }

    render() {
        return (

            <View style={GlobalStyles.root_container}>

                <NavigationBar
                    title={this.state.title}
                    style={this.params.theme.styles.navBar}
                    leftButton={ViewUtils.getLeftButton(() => { this.onBackPress() })}

                />

                <WebView
                    ref={WEBVIEW_REF}
                    source={{ uri: this.state.url }}
                    startInLoadingState={true}
                    onShouldStartLoadWithRequest={(e) => this.onShouldStartLoadWithRequest(e)}//ios
                    shouldOverrideUrlLoading={(e) => this.shouldOverrideUrlLoading(e)}//Android
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}

                />


            </View>
        )

    }
}

