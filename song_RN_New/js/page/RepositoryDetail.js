

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    TouchableOpacity
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../utils/ViewUtils'
const TRENDING_URL = 'https://github.com/'
import FavoriteDao from '../expand/dao/FavoriteDao'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'
import BackPressComponent from '../common/BackPressComponent'
import NavigatorUtil from '../utils/NavigatorUtil'

export default class ReposiboryDetail extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress:(e)=>this.onBackPress(e)});//Android点击返回按键处理
        this.state = {
            backButtonEnabled: false,
            url: this.params.projectModel.item.item.html_url ? this.params.projectModel.item.item.html_url : TRENDING_URL + this.params.projectModel.item.item.url,
            title: this.params.projectModel.item.item.full_name ? this.params.projectModel.item.item.full_name : this.params.projectModel.item.item.fullName,
            isFavorite: this.params.projectModel.item.isFavorite,
            favoriteIcon: this.params.projectModel.item.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png'),

        }
        this.favoriteDao = new FavoriteDao(this.params.flag)
    }
    onBackPress(e){
        this.onBack();
        return true;
    }
    componentDidMount() {
        this.backPress.componentDidMount();
    }
    componentWillUnmount(){
        this.backPress.componentWillUnmount();
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
        })
    }

    onBack() {
        if (this.state.backButtonEnabled) {
            this.webview.goBack();
        }
        else {

            /**
             * 返回跳转到指定的页面路由
             */
            // var componentArr = this.props.navigator.getCurrentRoutes();

            // let com = componentArr[0];

            // this.props.navigator.popToRoute(com
            // );

            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation);
        }

    }
    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        })
    }

    onRightButtonClick() {
        var projectModel = this.params.projectModel;
        this.setFavoriteState(projectModel.item.isFavorite = !projectModel.item.isFavorite);
        var key = projectModel.item.item.fullName ? projectModel.item.item.fullName : projectModel.item.item.id.toString();
        if (projectModel.item.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }
    renderRightButton() {
        return <TouchableOpacity
            onPress={() => { this.onRightButtonClick() }}
        >

            <Image
                style={{ width: 20, height: 20, marginRight: 10 }}
                source={this.state.favoriteIcon} />
        </TouchableOpacity>
    }

    render() {
        return (

            <View style={styles.container}>

                <NavigationBar
                    title={this.state.title}
                    style={this.params.theme.styles.navBar}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={this.renderRightButton()}

                />

                <WebView
                    ref={webview => this.webview = webview}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },


});